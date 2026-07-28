import {
  CrimsonPro_400Regular,
  CrimsonPro_600SemiBold,
  CrimsonPro_700Bold,
} from "@expo-google-fonts/crimson-pro";
import { Lora_400Regular_Italic } from "@expo-google-fonts/lora";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AdventDoor, DoorState } from "../components/advent/AdventDoor";
import { ProgressCard } from "../components/advent/ProgressCard";
import { router } from "expo-router";

const COLORS = {
  night: "#070E1B",
  navy: "#0F2040",
  blue: "#1F365C",
  cream: "#F8F3E9",
  card: "#FFFCF6",
  gold: "#D4AF37",
  lightGold: "#F5CE36",
  olive: "#6F7843",
  muted: "#817D75",
  border: "#E8DEC9",
};

const DAYS = Array.from({ length: 24 }, (_, index) => index + 1);

const DAY_ROWS = Array.from({ length: 6 }, (_, rowIndex) =>
  DAYS.slice(rowIndex * 4, rowIndex * 4 + 4),
);

const STARS = [
  { top: 18, left: "7%", size: 2, opacity: 0.7 },
  { top: 44, left: "16%", size: 3, opacity: 0.5 },
  { top: 24, left: "29%", size: 2, opacity: 0.8 },
  { top: 58, left: "42%", size: 3, opacity: 0.6 },
  { top: 17, left: "56%", size: 4, opacity: 0.7 },
  { top: 43, left: "68%", size: 2, opacity: 0.8 },
  { top: 27, left: "81%", size: 3, opacity: 0.6 },
  { top: 69, left: "91%", size: 2, opacity: 0.7 },
] as const;

function getDoorState(day: number): DoorState {
  if (day <= 4) {
    return "completed";
  }

  if (day === 5) {
    return "today";
  }

  return "locked";
}

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    CrimsonPro_400Regular,
    CrimsonPro_600SemiBold,
    CrimsonPro_700Bold,
    Lora_400Regular_Italic,
  });

  if (!fontsLoaded) {
    return <View style={styles.loadingScreen} />;
  }

  const openDay = (day: number) => {
    if (day === 5) {
      router.push("/day-5");
      return;
    }

    Alert.alert(`Day ${day}`, "Ця історія буде додана на наступному етапі.");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar style="light" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={[COLORS.night, "#0A1630", COLORS.navy]}
          style={styles.header}
        >
          {STARS.map((star, index) => (
            <View
              key={index}
              style={[
                styles.star,
                {
                  top: star.top,
                  left: star.left,
                  width: star.size,
                  height: star.size,
                  opacity: star.opacity,
                },
              ]}
            />
          ))}

          <Pressable
            onPress={() =>
              Alert.alert(
                "Settings",
                "Екран налаштувань створимо після біблійної історії.",
              )
            }
            style={styles.settingsButton}
          >
            <Ionicons name="settings-outline" size={22} color="#FFFFFF" />
          </Pressable>

          <Text style={styles.headerCross}>✦</Text>

          <Text style={styles.headerTitle}>The Promised Savior</Text>

          <Text style={styles.headerSubtitle}>
            A 24-Day Christmas Scripture Journey
          </Text>

          <View style={styles.todayJourney}>
            <Text style={styles.todayJourneyText}>
              TODAY&apos;S JOURNEY · DAY 5 OF 24
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          <ImageBackground
            source={require("../assets/images/bethlehem-night.jpg")}
            style={styles.hero}
            imageStyle={styles.heroImage}
          >
            <LinearGradient
              colors={[
                "rgba(7,14,27,0.30)",
                "rgba(7,14,27,0.08)",
                "rgba(7,14,27,0.90)",
              ]}
              style={StyleSheet.absoluteFill}
            />

            <View style={styles.warmHorizon} />

            <View style={styles.bethlehemStar}>
              <View style={styles.verticalRay} />
              <View style={styles.horizontalRay} />
              <View style={styles.starCore} />
            </View>

            <View style={styles.heroText}>
              <View style={styles.heroCopy}>
                <Text style={styles.heroTitle}>
                  Bethlehem, the City of David
                </Text>

                <Text style={styles.heroReference}>LUKE 2:4 · MICAH 5:2</Text>
              </View>
              <Pressable onPress={() => openDay(5)} style={styles.dayChip}>
                <Text style={styles.dayChipText}>Day 5</Text>
                <Ionicons
                  name="chevron-forward"
                  size={15}
                  color={COLORS.night}
                />
              </Pressable>
            </View>
          </ImageBackground>

          <View style={styles.calendarHeading}>
            <View>
              <Text style={styles.sectionEyebrow}>ADVENT CALENDAR</Text>

              <Text style={styles.sectionTitle}>December 2026</Text>
            </View>

            <View style={styles.legend}>
              <View style={styles.legendRow}>
                <View style={[styles.legendDoor, styles.legendCompleted]} />
                <Text style={styles.legendText}>Done</Text>
              </View>

              <View style={styles.legendRow}>
                <View style={[styles.legendDoor, styles.legendToday]} />
                <Text style={styles.legendText}>Today</Text>
              </View>

              <View style={styles.legendRow}>
                <View style={[styles.legendDoor, styles.legendLocked]} />
                <Text style={styles.legendText}>Locked</Text>
              </View>
            </View>
          </View>

          <View style={styles.calendarBoard}>
            {DAY_ROWS.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.calendarRow}>
                {row.map((day) => {
                  const state = getDoorState(day);

                  return (
                    <AdventDoor
                      key={day}
                      day={day}
                      state={state}
                      onPress={() => openDay(day)}
                    />
                  );
                })}
              </View>
            ))}
          </View>

          <ProgressCard />

          <Pressable
            onPress={() => openDay(5)}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <LinearGradient
              colors={[COLORS.lightGold, COLORS.gold]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.primaryGradient}
            >
              <Ionicons name="book-outline" size={21} color={COLORS.night} />

              <Text style={styles.primaryText}>Open Today&apos;s Story</Text>

              <Ionicons name="arrow-forward" size={20} color={COLORS.night} />
            </LinearGradient>
          </Pressable>

          <Text style={styles.footer}>The Promised Savior · Advent App</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.night,
  },
  loadingScreen: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  scrollContent: {
    paddingBottom: 34,
  },
  header: {
    height: 244,
    alignItems: "center",
    paddingTop: 21,
    overflow: "hidden",
  },
  star: {
    position: "absolute",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  settingsButton: {
    position: "absolute",
    top: 17,
    right: 18,
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  headerCross: {
    color: COLORS.gold,
    fontSize: 27,
  },
  headerTitle: {
    marginTop: 7,
    color: "#FFFFFF",
    fontFamily: "CrimsonPro_700Bold",
    fontSize: 34,
    textAlign: "center",
  },
  headerSubtitle: {
    marginTop: 5,
    color: "rgba(255,255,255,0.64)",
    fontFamily: "Lora_400Regular_Italic",
    fontSize: 12,
  },
  todayJourney: {
    marginTop: 19,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(245,206,54,0.52)",
    borderRadius: 999,
    backgroundColor: "rgba(7,14,27,0.42)",
  },
  todayJourneyText: {
    color: "#EAD36F",
    fontFamily: "CrimsonPro_600SemiBold",
    fontSize: 10,
    letterSpacing: 1.3,
  },
  content: {
    paddingHorizontal: 16,
  },
  hero: {
    height: 225,
    marginTop: -48,
    overflow: "hidden",
    borderRadius: 25,
    justifyContent: "flex-end",
    shadowColor: COLORS.night,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 18,
    elevation: 8,
  },
  heroImage: {
    borderRadius: 25,
  },
  warmHorizon: {
    position: "absolute",
    left: 80,
    right: 20,
    bottom: -65,
    height: 150,
    borderRadius: 100,
    backgroundColor: "rgba(227,157,46,0.25)",
  },
  bethlehemStar: {
    position: "absolute",
    top: 24,
    right: 34,
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  verticalRay: {
    position: "absolute",
    width: 2,
    height: 52,
    backgroundColor: "rgba(255,225,117,0.82)",
  },
  horizontalRay: {
    position: "absolute",
    width: 52,
    height: 2,
    backgroundColor: "rgba(255,225,117,0.82)",
  },
  starCore: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#FFF9D8",
    shadowColor: COLORS.lightGold,
    shadowOpacity: 1,
    shadowRadius: 14,
  },
  heroText: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 16,
  },
  heroCopy: {
    flex: 1,
    paddingRight: 10,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontFamily: "CrimsonPro_600SemiBold",
    fontSize: 19,
  },
  heroReference: {
    marginTop: 4,
    color: "#D8BD57",
    fontFamily: "CrimsonPro_600SemiBold",
    fontSize: 10,
    letterSpacing: 1.2,
  },
  dayChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: COLORS.gold,
  },
  dayChipText: {
    color: COLORS.night,
    fontFamily: "CrimsonPro_700Bold",
    fontSize: 13,
  },
  calendarHeading: {
    marginTop: 29,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  sectionEyebrow: {
    color: COLORS.olive,
    fontFamily: "CrimsonPro_600SemiBold",
    fontSize: 11,
    letterSpacing: 1.7,
  },
  sectionTitle: {
    marginTop: 5,
    color: COLORS.navy,
    fontFamily: "CrimsonPro_600SemiBold",
    fontSize: 22,
  },
  legend: {
    gap: 5,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 6,
  },
  legendDoor: {
    width: 14,
    height: 18,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  legendCompleted: {
    backgroundColor: COLORS.navy,
  },
  legendToday: {
    backgroundColor: COLORS.gold,
  },
  legendLocked: {
    borderWidth: 1,
    borderColor: "rgba(15,32,64,0.12)",
    backgroundColor: "#F1E8D8",
  },
  legendText: {
    color: COLORS.muted,
    fontFamily: "CrimsonPro_400Regular",
    fontSize: 11,
  },
  calendarBoard: {
    gap: 10,
    marginTop: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: "rgba(31,54,92,0.06)",
    borderRadius: 20,
    backgroundColor: "rgba(31,54,92,0.025)",
  },
  calendarRow: {
    flexDirection: "row",
    gap: 8,
  },
  primaryButton: {
    marginTop: 24,
    overflow: "hidden",
    borderRadius: 18,
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.34,
    shadowRadius: 12,
    elevation: 5,
  },
  primaryGradient: {
    minHeight: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 20,
  },
  primaryText: {
    color: COLORS.night,
    fontFamily: "CrimsonPro_700Bold",
    fontSize: 19,
  },
  buttonPressed: {
    opacity: 0.84,
    transform: [{ scale: 0.99 }],
  },
  footer: {
    marginTop: 28,
    textAlign: "center",
    color: "rgba(15,32,64,0.40)",
    fontFamily: "CrimsonPro_400Regular",
    fontSize: 12,
  },
});
