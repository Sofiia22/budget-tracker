import { Ionicons } from "@expo/vector-icons";
import {
  CrimsonPro_400Regular,
  CrimsonPro_600SemiBold,
  CrimsonPro_700Bold,
} from "@expo-google-fonts/crimson-pro";
import { Lora_400Regular_Italic } from "@expo-google-fonts/lora";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
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

const COLORS = {
  night: "#070E1B",
  navy: "#0F2040",
  blue: "#1F365C",
  cream: "#F8F3E9",
  card: "#FFFCF6",
  gold: "#D4AF37",
  lightGold: "#F5CE36",
  olive: "#6F7843",
  text: "#172A4A",
  muted: "#7C7A76",
  border: "#E8DEC9",
};

const STARS = [
  { top: 14, left: "8%", size: 3, opacity: 0.7 },
  { top: 28, left: "20%", size: 2, opacity: 0.5 },
  { top: 18, left: "35%", size: 4, opacity: 0.8 },
  { top: 42, left: "49%", size: 2, opacity: 0.6 },
  { top: 16, left: "62%", size: 3, opacity: 0.7 },
  { top: 38, left: "75%", size: 4, opacity: 0.9 },
  { top: 22, left: "89%", size: 2, opacity: 0.6 },
  { top: 66, left: "13%", size: 2, opacity: 0.7 },
  { top: 78, left: "29%", size: 3, opacity: 0.5 },
  { top: 62, left: "56%", size: 2, opacity: 0.8 },
  { top: 74, left: "84%", size: 3, opacity: 0.6 },
] as const;

type FeatureRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBackground: string;
  title: string;
  description: string;
};

function FeatureRow({
  icon,
  iconColor,
  iconBackground,
  title,
  description,
}: FeatureRowProps) {
  return (
    <View style={styles.featureCard}>
      <View style={[styles.featureIcon, { backgroundColor: iconBackground }]}>
        <Ionicons name={icon} size={23} color={iconColor} />
      </View>

      <View style={styles.featureText}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
  );
}

export default function WelcomeScreen() {
  const [fontsLoaded] = useFonts({
    CrimsonPro_400Regular,
    CrimsonPro_600SemiBold,
    CrimsonPro_700Bold,
    Lora_400Regular_Italic,
  });

  if (!fontsLoaded) {
    return <View style={styles.loadingScreen} />;
  }

  const handleBegin = () => {
    router.push("/language");
  };

  const handleSkip = () => {
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
        <LinearGradient
          colors={[COLORS.night, "#0A1630", COLORS.navy]}
          style={styles.nightHeader}
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

          <Text style={styles.headerCross}>✦</Text>
          <Text style={styles.headerLabel}>ADVENT · 2026</Text>
        </LinearGradient>

        <View style={styles.content}>
          <ImageBackground
            source={require("../assets/images/family-advent.jpg")}
            style={styles.hero}
            imageStyle={styles.heroImage}
          >
            <LinearGradient
              colors={[
                "rgba(7,14,27,0.52)",
                "rgba(7,14,27,0.05)",
                "rgba(7,14,27,0.72)",
              ]}
              style={StyleSheet.absoluteFill}
            />

            <View style={styles.warmGlow} />

            <View style={styles.bethlehemStar}>
              <View style={styles.starVerticalRay} />
              <View style={styles.starHorizontalRay} />
              <View style={styles.starCore} />
            </View>

            <View style={styles.heroLabel}>
              <Text style={styles.heroLabelText}>
                24 DAYS · GENESIS TO REVELATION
              </Text>
            </View>
          </ImageBackground>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerCross}>✦</Text>
            <View style={styles.dividerLine} />
          </View>

          <Text style={styles.eyebrow}>A FAMILY ADVENT EXPERIENCE</Text>

          <Text style={styles.title}>
            Welcome to{"\n"}
            <Text style={styles.titleStrong}>The Promised Savior</Text>
          </Text>

          <Text style={styles.subtitle}>
            Take a 24-day journey through God&apos;s promises that lead to Jesus
            Christ.
          </Text>

          <View style={styles.features}>
            <FeatureRow
              icon="book-outline"
              iconColor={COLORS.olive}
              iconBackground="rgba(111,120,67,0.12)"
              title="Daily Bible Story"
              description="One story per day, told for ages 5–12"
            />

            <FeatureRow
              icon="heart-outline"
              iconColor={COLORS.gold}
              iconBackground="rgba(212,175,55,0.14)"
              title="See Jesus in Every Story"
              description="Every passage points forward to Christ"
            />

            <FeatureRow
              icon="people-outline"
              iconColor={COLORS.blue}
              iconBackground="rgba(31,54,92,0.11)"
              title="Read Together as a Family"
              description="Questions, prayers, and activities included"
            />
          </View>

          <Pressable
            onPress={handleBegin}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <LinearGradient
              colors={[COLORS.lightGold, COLORS.gold]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.primaryButtonGradient}
            >
              <Text style={styles.primaryButtonText}>Begin Your Journey</Text>
              <Ionicons name="arrow-forward" size={20} color={COLORS.night} />
            </LinearGradient>
          </Pressable>

          <Pressable onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip for now</Text>
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
  nightHeader: {
    height: 148,
    alignItems: "center",
    paddingTop: 24,
    overflow: "hidden",
  },
  star: {
    position: "absolute",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  headerCross: {
    color: COLORS.gold,
    fontSize: 30,
    lineHeight: 34,
  },
  headerLabel: {
    marginTop: 4,
    color: "#DCCB83",
    fontFamily: "CrimsonPro_600SemiBold",
    fontSize: 13,
    letterSpacing: 3,
  },
  content: {
    paddingHorizontal: 20,
  },
  hero: {
    height: 238,
    marginTop: -42,
    overflow: "hidden",
    borderRadius: 26,
    justifyContent: "flex-end",
    shadowColor: COLORS.night,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.28,
    shadowRadius: 18,
    elevation: 8,
  },
  heroImage: {
    borderRadius: 26,
  },
  warmGlow: {
    position: "absolute",
    left: -35,
    bottom: -75,
    width: 240,
    height: 190,
    borderRadius: 120,
    backgroundColor: "rgba(238,177,57,0.25)",
  },
  bethlehemStar: {
    position: "absolute",
    top: 25,
    right: 34,
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  starVerticalRay: {
    position: "absolute",
    width: 2,
    height: 46,
    backgroundColor: "rgba(255,226,122,0.75)",
  },
  starHorizontalRay: {
    position: "absolute",
    width: 46,
    height: 2,
    backgroundColor: "rgba(255,226,122,0.75)",
  },
  starCore: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFF8CF",
    shadowColor: COLORS.lightGold,
    shadowOpacity: 1,
    shadowRadius: 12,
  },
  heroLabel: {
    margin: 15,
    alignSelf: "flex-start",
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(245,206,54,0.55)",
    borderRadius: 999,
    backgroundColor: "rgba(7,14,27,0.72)",
  },
  heroLabelText: {
    color: "#F0D876",
    fontFamily: "CrimsonPro_600SemiBold",
    fontSize: 11,
    letterSpacing: 1.4,
  },
  divider: {
    marginTop: 27,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dividerLine: {
    width: 66,
    height: 1,
    backgroundColor: "rgba(212,175,55,0.34)",
  },
  dividerCross: {
    marginHorizontal: 12,
    color: COLORS.gold,
    fontSize: 18,
  },
  eyebrow: {
    marginTop: 13,
    textAlign: "center",
    color: COLORS.olive,
    fontFamily: "CrimsonPro_600SemiBold",
    fontSize: 12,
    letterSpacing: 2.1,
  },
  title: {
    marginTop: 12,
    textAlign: "center",
    color: COLORS.text,
    fontFamily: "CrimsonPro_400Regular",
    fontSize: 33,
    lineHeight: 38,
  },
  titleStrong: {
    fontFamily: "CrimsonPro_700Bold",
  },
  subtitle: {
    maxWidth: 330,
    alignSelf: "center",
    marginTop: 13,
    textAlign: "center",
    color: COLORS.muted,
    fontFamily: "Lora_400Regular_Italic",
    fontSize: 14,
    lineHeight: 22,
  },
  features: {
    gap: 11,
    marginTop: 25,
  },
  featureCard: {
    minHeight: 78,
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    backgroundColor: COLORS.card,
  },
  featureIcon: {
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
  },
  featureText: {
    flex: 1,
    marginLeft: 13,
  },
  featureTitle: {
    color: COLORS.text,
    fontFamily: "CrimsonPro_600SemiBold",
    fontSize: 18,
  },
  featureDescription: {
    marginTop: 2,
    color: COLORS.muted,
    fontFamily: "Lora_400Regular_Italic",
    fontSize: 12,
    lineHeight: 17,
  },
  primaryButton: {
    marginTop: 22,
    overflow: "hidden",
    borderRadius: 18,
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.33,
    shadowRadius: 12,
    elevation: 5,
  },
  primaryButtonGradient: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    paddingHorizontal: 20,
  },
  primaryButtonText: {
    color: COLORS.night,
    fontFamily: "CrimsonPro_700Bold",
    fontSize: 19,
  },
  buttonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },
  skipButton: {
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  skipText: {
    color: COLORS.muted,
    fontFamily: "Lora_400Regular_Italic",
    fontSize: 13,
    textDecorationLine: "underline",
  },
  footer: {
    marginTop: 5,
    textAlign: "center",
    color: "rgba(23,42,74,0.45)",
    fontFamily: "CrimsonPro_400Regular",
    fontSize: 12,
    letterSpacing: 0.5,
  },
});
