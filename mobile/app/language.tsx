import {
  CrimsonPro_400Regular,
  CrimsonPro_600SemiBold,
  CrimsonPro_700Bold,
} from "@expo-google-fonts/crimson-pro";
import { Lora_400Regular_Italic } from "@expo-google-fonts/lora";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { type LanguageId, useAdvent } from "../state/AdventContext";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getTranslations } from "../i18n/translations";

const COLORS = {
  night: "#070E1B",
  navy: "#0F2040",
  cream: "#F8F3E9",
  card: "#FFFCF6",
  gold: "#D4AF37",
  lightGold: "#F5CE36",
  muted: "#817D75",
  border: "#E8DEC9",
};

type Language = {
  id: LanguageId;
  flag: string;
  name: string;
  subtitle?: string;
};

const LANGUAGES: Language[] = [
  {
    id: "en",
    flag: "🇺🇸",
    name: "English",
  },
  {
    id: "uk",
    flag: "🇺🇦",
    name: "Українська",
    subtitle: "Ukrainian",
  },
  {
    id: "ru",
    flag: "🇷🇺",
    name: "Русский",
    subtitle: "Russian",
  },
];

export default function LanguageScreen() {
  const {
    selectedLanguage,
    setLanguage,
    isHydrated,
  } = useAdvent();
  const t = getTranslations(selectedLanguage);

  const [fontsLoaded] = useFonts({
    CrimsonPro_400Regular,
    CrimsonPro_600SemiBold,
    CrimsonPro_700Bold,
    Lora_400Regular_Italic,
  });

  if (!fontsLoaded || !isHydrated) {
    return <View style={styles.loadingScreen} />;
  }

  const handleContinue = () => {
    router.replace("/home");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar style="light" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={require("../assets/images/language-reading.jpg")}
          style={styles.hero}
          imageStyle={styles.heroImage}
        >
          <LinearGradient
            colors={[
              "rgba(7,14,27,0.78)",
              "rgba(7,14,27,0.12)",
              "rgba(248,243,233,0.10)",
              COLORS.cream,
            ]}
            locations={[0, 0.42, 0.72, 1]}
            style={StyleSheet.absoluteFill}
          />

          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
            accessibilityLabel={t.goBack}
          >
            <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
          </Pressable>

          <View style={styles.appPill}>
            <Text style={styles.appPillCross}>✦</Text>
            <Text style={styles.appPillText}>THE PROMISED SAVIOR</Text>
          </View>

          <View style={styles.bethlehemStar}>
            <View style={styles.verticalRay} />
            <View style={styles.horizontalRay} />
            <View style={styles.starCore} />
          </View>
        </ImageBackground>

        <View style={styles.content}>
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerCross}>✦</Text>
            <View style={styles.dividerLine} />
          </View>

          <Text style={styles.title}>
            {t.chooseYour}{"\n"}
            <Text style={styles.titleStrong}>{t.languageTitle}</Text>
          </Text>

          <Text style={styles.subtitle}>{t.languageSubtitle}</Text>

          <View style={styles.languageList} accessibilityRole="radiogroup">
            {LANGUAGES.map((language) => {
              const selected = selectedLanguage === language.id;

              return (
                <Pressable
                  key={language.id}
                  onPress={() => {
                    void setLanguage(language.id);
                  }}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: selected }}
                  style={({ pressed }) => [
                    styles.languageCard,
                    selected && styles.languageCardSelected,
                    pressed && styles.cardPressed,
                  ]}
                >
                  <View style={styles.flagTile}>
                    <Text style={styles.flag}>{language.flag}</Text>
                  </View>

                  <View style={styles.languageText}>
                    <Text style={styles.languageName}>{language.name}</Text>

                    {language.subtitle ? (
                      <Text style={styles.languageSubtitle}>
                        {language.subtitle}
                      </Text>
                    ) : null}
                  </View>

                  <View
                    style={[
                      styles.selectionCircle,
                      selected && styles.selectionCircleSelected,
                    ]}
                  >
                    {selected ? (
                      <Ionicons
                        name="checkmark"
                        size={17}
                        color={COLORS.night}
                      />
                    ) : null}
                  </View>
                </Pressable>
              );
            })}
          </View>

          <Pressable
            onPress={handleContinue}
            style={({ pressed }) => [
              styles.continueButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <LinearGradient
              colors={[COLORS.lightGold, COLORS.gold]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.continueGradient}
            >
              <Text style={styles.continueText}>{t.continue}</Text>

              <Ionicons name="chevron-forward" size={19} color={COLORS.night} />
            </LinearGradient>
          </Pressable>

          <Text style={styles.journeyText}>{t.journeyBegins}</Text>

          <Text style={styles.footer}>{t.footer}</Text>
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
    paddingBottom: 32,
  },
  hero: {
    height: 285,
    justifyContent: "flex-start",
  },
  heroImage: {
    resizeMode: "cover",
  },
  backButton: {
    position: "absolute",
    top: 17,
    left: 18,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "rgba(7,14,27,0.40)",
  },
  appPill: {
    position: "absolute",
    top: 22,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: "rgba(245,206,54,0.52)",
    borderRadius: 999,
    backgroundColor: "rgba(7,14,27,0.62)",
  },
  appPillCross: {
    color: COLORS.gold,
    fontSize: 14,
  },
  appPillText: {
    color: "#F0D876",
    fontFamily: "CrimsonPro_600SemiBold",
    fontSize: 10,
    letterSpacing: 1.4,
  },
  bethlehemStar: {
    position: "absolute",
    top: 80,
    right: 40,
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  verticalRay: {
    position: "absolute",
    width: 2,
    height: 48,
    backgroundColor: "rgba(255,226,122,0.78)",
  },
  horizontalRay: {
    position: "absolute",
    width: 48,
    height: 2,
    backgroundColor: "rgba(255,226,122,0.78)",
  },
  starCore: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFF9D7",
    shadowColor: COLORS.lightGold,
    shadowOpacity: 1,
    shadowRadius: 12,
  },
  content: {
    marginTop: -32,
    paddingHorizontal: 20,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dividerLine: {
    width: 66,
    height: 1,
    backgroundColor: "rgba(212,175,55,0.35)",
  },
  dividerCross: {
    marginHorizontal: 12,
    color: COLORS.gold,
    fontSize: 18,
  },
  title: {
    marginTop: 13,
    textAlign: "center",
    color: COLORS.navy,
    fontFamily: "CrimsonPro_400Regular",
    fontSize: 32,
    lineHeight: 35,
  },
  titleStrong: {
    fontFamily: "CrimsonPro_700Bold",
  },
  subtitle: {
    marginTop: 9,
    textAlign: "center",
    color: COLORS.muted,
    fontFamily: "Lora_400Regular_Italic",
    fontSize: 13,
  },
  languageList: {
    gap: 12,
    marginTop: 24,
  },
  languageCard: {
    minHeight: 88,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    backgroundColor: COLORS.card,
    shadowColor: COLORS.night,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  languageCardSelected: {
    borderWidth: 1.5,
    borderColor: COLORS.gold,
    backgroundColor: "#FCF7E7",
  },
  cardPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },
  flagTile: {
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "rgba(31,54,92,0.05)",
  },
  flag: {
    fontSize: 27,
  },
  languageText: {
    flex: 1,
    marginLeft: 15,
  },
  languageName: {
    color: COLORS.navy,
    fontFamily: "CrimsonPro_600SemiBold",
    fontSize: 21,
  },
  languageSubtitle: {
    marginTop: 2,
    color: COLORS.muted,
    fontFamily: "Lora_400Regular_Italic",
    fontSize: 12,
  },
  selectionCircle: {
    width: 27,
    height: 27,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#D8D2C8",
    borderRadius: 14,
  },
  selectionCircleSelected: {
    borderColor: COLORS.gold,
    backgroundColor: COLORS.gold,
  },
  continueButton: {
    marginTop: 28,
    overflow: "hidden",
    borderRadius: 18,
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.32,
    shadowRadius: 12,
    elevation: 5,
  },
  continueGradient: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 20,
  },
  continueText: {
    color: COLORS.night,
    fontFamily: "CrimsonPro_700Bold",
    fontSize: 19,
  },
  buttonPressed: {
    opacity: 0.84,
    transform: [{ scale: 0.99 }],
  },
  journeyText: {
    marginTop: 14,
    textAlign: "center",
    color: "rgba(15,32,64,0.45)",
    fontFamily: "CrimsonPro_400Regular",
    fontSize: 11,
    letterSpacing: 0.4,
  },
  footer: {
    marginTop: 28,
    textAlign: "center",
    color: "rgba(15,32,64,0.42)",
    fontFamily: "CrimsonPro_400Regular",
    fontSize: 12,
    letterSpacing: 0.5,
  },
});
