import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  cancelReminder,
  scheduleDailyReminder,
  scheduleTestNotification,
} from "../services/notifications";
import { useAdvent } from "../state/AdventContext";

const ENABLED_KEY = "@advent/reminder-enabled";
const IDENTIFIER_KEY = "@advent/reminder-identifier";
const TIME_KEY = "@advent/reminder-time";

const DEFAULT_TIME = new Date();
DEFAULT_TIME.setHours(8, 0, 0, 0);

const LANGUAGE_NAMES = {
  en: "English",
  uk: "Українська",
  ru: "Русский",
};

export default function SettingsScreen() {
  const { selectedLanguage, resetProgress } = useAdvent();
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderIdentifier, setReminderIdentifier] = useState<string | null>(
    null,
  );
  const [reminderTime, setReminderTime] = useState(DEFAULT_TIME);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      const [savedEnabled, savedIdentifier, savedTime] = await Promise.all([
        AsyncStorage.getItem(ENABLED_KEY),
        AsyncStorage.getItem(IDENTIFIER_KEY),
        AsyncStorage.getItem(TIME_KEY),
      ]);

      if (savedTime) {
        setReminderTime(new Date(savedTime));
      }

      setReminderEnabled(savedEnabled === "true");
      setReminderIdentifier(savedIdentifier);
      setIsLoading(false);
    }

    void loadSettings();
  }, []);

  const toggleReminder = async (enabled: boolean) => {
    if (!enabled) {
      if (reminderIdentifier) {
        await cancelReminder(reminderIdentifier);
      }

      setReminderEnabled(false);
      setReminderIdentifier(null);

      await Promise.all([
        AsyncStorage.setItem(ENABLED_KEY, "false"),
        AsyncStorage.removeItem(IDENTIFIER_KEY),
      ]);

      return;
    }

    const identifier = await scheduleDailyReminder(
      reminderTime.getHours(),
      reminderTime.getMinutes(),
    );

    if (!identifier) {
      Alert.alert(
        "Notifications are disabled",
        "Please allow notifications in your iPhone settings.",
      );
      return;
    }

    setReminderEnabled(true);
    setReminderIdentifier(identifier);

    await Promise.all([
      AsyncStorage.setItem(ENABLED_KEY, "true"),
      AsyncStorage.setItem(IDENTIFIER_KEY, identifier),
      AsyncStorage.setItem(TIME_KEY, reminderTime.toISOString()),
    ]);
  };

  const changeReminderTime = async (selectedTime?: Date) => {
    if (!selectedTime) {
      return;
    }

    setReminderTime(selectedTime);
    await AsyncStorage.setItem(TIME_KEY, selectedTime.toISOString());

    if (!reminderEnabled) {
      return;
    }

    if (reminderIdentifier) {
      await cancelReminder(reminderIdentifier);
    }

    const newIdentifier = await scheduleDailyReminder(
      selectedTime.getHours(),
      selectedTime.getMinutes(),
    );

    if (newIdentifier) {
      setReminderIdentifier(newIdentifier);
      await AsyncStorage.setItem(IDENTIFIER_KEY, newIdentifier);
    }
  };

  const sendTestNotification = async () => {
    const scheduled = await scheduleTestNotification();

    if (!scheduled) {
      Alert.alert(
        "Notifications are disabled",
        "Please allow notifications in your iPhone settings.",
      );
      return;
    }

    Alert.alert(
      "Notification scheduled",
      "Close or minimize the app. The notification will appear in 5 seconds.",
    );
  };

  const confirmResetProgress = () => {
    Alert.alert(
      "Reset Advent journey?",
      "Your completed days will return to the beginning. Your language and reminder settings will remain unchanged.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => {
            void resetProgress();
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={26} color="#0F2040" />
        </Pressable>

        <Text style={styles.title}>Settings</Text>

        <View style={styles.placeholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>DAILY JOURNEY</Text>

        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.icon}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#D4AF37"
              />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>Daily reminder</Text>
              <Text style={styles.cardSubtitle}>
                Receive a reminder for your Advent journey
              </Text>
            </View>

            <Switch
              value={reminderEnabled}
              disabled={isLoading}
              onValueChange={(value) => void toggleReminder(value)}
              trackColor={{
                false: "#D8D2C7",
                true: "#E7CF76",
              }}
              thumbColor={reminderEnabled ? "#D4AF37" : "#FFFFFF"}
            />
          </View>

          {reminderEnabled && (
            <View style={styles.timeSection}>
              <Text style={styles.timeLabel}>REMINDER TIME</Text>

              <DateTimePicker
                value={reminderTime}
                mode="time"
                display="spinner"
                themeVariant="light"
                onChange={(_, selectedTime) =>
                  void changeReminderTime(selectedTime)
                }
              />
            </View>
          )}
        </View>

        <Pressable
          onPress={() => void sendTestNotification()}
          style={styles.testButton}
        >
          <Ionicons name="paper-plane-outline" size={19} color="#FFFFFF" />

          <Text style={styles.testButtonText}>Send test notification</Text>
        </Pressable>

        <Text style={[styles.sectionTitle, styles.preferencesTitle]}>
          PREFERENCES
        </Text>

        <Pressable
          onPress={() => router.push("./language")}
          style={styles.languageCard}
        >
          <View style={styles.icon}>
            <Ionicons name="language-outline" size={24} color="#D4AF37" />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Language</Text>
            <Text style={styles.cardSubtitle}>
              {LANGUAGE_NAMES[selectedLanguage]}
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={22} color="#817D75" />
        </Pressable>

        <Pressable
          onPress={confirmResetProgress}
          style={styles.resetButton}
        >
          <Ionicons
            name="refresh-outline"
            size={20}
            color="#A4473E"
          />

          <Text style={styles.resetButtonText}>
            Reset Advent journey
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F3E9",
  },
  header: {
    height: 64,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E8DEC9",
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  title: {
    color: "#0F2040",
    fontFamily: "CrimsonPro_700Bold",
    fontSize: 28,
  },
  placeholder: {
    width: 42,
  },
  content: {
    padding: 24,
    paddingBottom: 48,
  },
  sectionTitle: {
    marginBottom: 12,
    color: "#6F7843",
    fontFamily: "CrimsonPro_600SemiBold",
    fontSize: 14,
    letterSpacing: 2,
  },
  card: {
    padding: 18,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8DEC9",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 48,
    height: 48,
    marginRight: 14,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF8DF",
  },
  textContainer: {
    flex: 1,
    paddingRight: 8,
  },
  cardTitle: {
    color: "#0F2040",
    fontFamily: "CrimsonPro_600SemiBold",
    fontSize: 20,
  },
  cardSubtitle: {
    marginTop: 3,
    color: "#817D75",
    fontFamily: "CrimsonPro_400Regular",
    fontSize: 15,
    lineHeight: 20,
  },
  timeSection: {
    marginTop: 18,
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: "#E8DEC9",
  },
  timeLabel: {
    color: "#6F7843",
    fontFamily: "CrimsonPro_600SemiBold",
    fontSize: 13,
    letterSpacing: 1.5,
  },
  testButton: {
    minHeight: 54,
    marginTop: 18,
    borderRadius: 27,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    backgroundColor: "#0F2040",
  },
  testButtonText: {
    color: "#FFFFFF",
    fontFamily: "CrimsonPro_600SemiBold",
    fontSize: 18,
  },
  preferencesTitle: {
    marginTop: 32,
  },
  languageCard: {
    minHeight: 84,
    padding: 18,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8DEC9",
  },
  resetButton: {
    minHeight: 54,
    marginTop: 18,
    borderRadius: 27,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    backgroundColor: "#FFF7F4",
    borderWidth: 1,
    borderColor: "#E8C9C3",
  },
  resetButtonText: {
    color: "#A4473E",
    fontFamily: "CrimsonPro_600SemiBold",
    fontSize: 18,
  },
});
