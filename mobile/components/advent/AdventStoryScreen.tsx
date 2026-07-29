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
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { type AdventStoryContent } from "../../data/storyTypes";
import { getTranslations } from "../../i18n/translations";
import {
  type LanguageId,
  useAdvent,
} from "../../state/AdventContext";
import { ContentCard } from "./ContentCard";

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

type StoryImageProps = {
  source: ImageSourcePropType;
  caption: string;
};

type AdventStoryScreenProps = {
  contentByLanguage: Record<LanguageId, AdventStoryContent>;
  images: {
    hero: ImageSourcePropType;
    journey: ImageSourcePropType;
    lamb: ImageSourcePropType;
  };
};

function StoryImage({ source, caption }: StoryImageProps) {
  return (
    <View style={styles.storyImageBlock}>
      <Image source={source} style={styles.storyImage} />
      <Text style={styles.imageCaption}>{caption}</Text>
    </View>
  );
}

export function AdventStoryScreen({
  contentByLanguage,
  images,
}: AdventStoryScreenProps) {
  const {
    completeDay,
    isDayCompleted,
    selectedLanguage,
    isHydrated,
  } = useAdvent();
  const t = getTranslations(selectedLanguage);
  const dayContent = contentByLanguage[selectedLanguage];
  const completed = isDayCompleted(dayContent.day);

  const [fontsLoaded] = useFonts({
    CrimsonPro_400Regular,
    CrimsonPro_600SemiBold,
    CrimsonPro_700Bold,
    Lora_400Regular_Italic,
  });

  if (!fontsLoaded || !isHydrated) {
    return <View style={styles.loadingScreen} />;
  }

  const handleComplete = async () => {
    if (completed) {
      router.replace("/home");
      return;
    }

    await completeDay(dayContent.day);

    setTimeout(() => {
      router.replace("/home");
    }, 750);
  };

  const buttonColors: [string, string] = completed
    ? [COLORS.blue, COLORS.navy]
    : [COLORS.lightGold, COLORS.gold];

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar style="light" />

      <View style={styles.navigation}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={20} color={COLORS.gold} />
          <Text style={styles.backText}>{t.december}</Text>
        </Pressable>

        <Text style={styles.navigationTitle}>The Promised Savior</Text>

        <View style={styles.navigationSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={images.hero}
          style={styles.hero}
          imageStyle={styles.heroImage}
        >
          <LinearGradient
            colors={[
              "rgba(7,14,27,0.25)",
              "rgba(7,14,27,0.15)",
              "rgba(7,14,27,0.92)",
            ]}
            style={StyleSheet.absoluteFill}
          />

          <View style={styles.dayPill}>
            <Text style={styles.dayPillText}>
              {t.dayOfTwentyFour(dayContent.day)}
            </Text>
          </View>

          <View style={styles.heroContent}>
            <Text style={styles.book}>{dayContent.book}</Text>
            <Text style={styles.theme}>{dayContent.theme}</Text>

            <Text style={styles.heroTitle}>{dayContent.title}</Text>
          </View>
        </ImageBackground>

        <View style={styles.content}>
          <ContentCard
            title={t.todaysScripture}
            icon="book-outline"
            accent="gold"
          >
            <Text style={styles.scriptureReference}>
              {dayContent.reference}
            </Text>

            <Text style={styles.keyVerse}>{dayContent.keyVerse}</Text>
          </ContentCard>

          <View style={styles.sectionHeading}>
            <View style={styles.sectionLine} />
            <Text style={styles.sectionCross}>✦</Text>
            <View style={styles.sectionLine} />
          </View>

          <Text style={styles.storyHeading}>{t.theStory}</Text>

          <Text style={styles.paragraph}>{dayContent.story[0]}</Text>

          <Text style={styles.paragraph}>{dayContent.story[1]}</Text>

          <StoryImage
            source={images.journey}
            caption={dayContent.captions.journey}
          />

          <Text style={styles.paragraph}>{dayContent.story[2]}</Text>

          <Text style={styles.paragraph}>{dayContent.story[3]}</Text>

          <StoryImage
            source={images.lamb}
            caption={dayContent.captions.lamb}
          />

          <Text style={styles.paragraph}>{dayContent.story[4]}</Text>

          <LinearGradient
            colors={[COLORS.navy, COLORS.night]}
            style={styles.christCard}
          >
            <View style={styles.christLabel}>
              <Ionicons
                name="star-outline"
                size={17}
                color={COLORS.lightGold}
              />
              <Text style={styles.christLabelText}>
                {t.christConnection}
              </Text>
            </View>

            <Text style={styles.christTitle}>
              {dayContent.christConnection.title}
            </Text>

            {dayContent.christConnection.paragraphs.map((paragraph) => (
              <Text key={paragraph} style={styles.christParagraph}>
                {paragraph}
              </Text>
            ))}

            <Text style={styles.christReferences}>
              {dayContent.christConnection.references}
            </Text>
          </LinearGradient>

          <ContentCard
            title={t.thinkTogether}
            icon="chatbubbles-outline"
            accent="olive"
          >
            <View style={styles.questions}>
              {dayContent.questions.map((question, index) => (
                <View key={question} style={styles.question}>
                  <View style={styles.questionNumber}>
                    <Text style={styles.questionNumberText}>{index + 1}</Text>
                  </View>

                  <Text style={styles.questionText}>{question}</Text>
                </View>
              ))}
            </View>
          </ContentCard>

          <ContentCard
            title={t.prayerTogether}
            icon="heart-outline"
            accent="gold"
          >
            {dayContent.prayer.map((paragraph) => (
              <Text key={paragraph} style={styles.cardParagraph}>
                {paragraph}
              </Text>
            ))}
          </ContentCard>

          <ContentCard
            title={t.familyChallenge}
            icon="people-outline"
            accent="navy"
          >
            {dayContent.familyChallenge.map((paragraph) => (
              <Text key={paragraph} style={styles.cardParagraph}>
                {paragraph}
              </Text>
            ))}
          </ContentCard>

          <Pressable
            onPress={handleComplete}
            style={({ pressed }) => [
              styles.completeButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <LinearGradient
              colors={buttonColors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.completeGradient}
            >
              <Ionicons
                name={completed ? "star" : "checkmark-circle-outline"}
                size={22}
                color={completed ? COLORS.lightGold : COLORS.night}
              />

              <Text
                style={[
                  styles.completeText,
                  completed && styles.completeTextDone,
                ]}
              >
                {completed
                  ? t.dayComplete(dayContent.day)
                  : t.completeDay(dayContent.day)}
              </Text>
            </LinearGradient>
          </Pressable>

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
  navigation: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: COLORS.night,
  },
  backButton: {
    width: 98,
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    marginLeft: 2,
    color: COLORS.gold,
    fontFamily: "CrimsonPro_600SemiBold",
    fontSize: 15,
  },
  navigationTitle: {
    flex: 1,
    textAlign: "center",
    color: "#FFFFFF",
    fontFamily: "CrimsonPro_600SemiBold",
    fontSize: 16,
  },
  navigationSpacer: {
    width: 98,
  },
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  scrollContent: {
    paddingBottom: 36,
  },
  hero: {
    height: 330,
    justifyContent: "space-between",
    padding: 18,
  },
  heroImage: {
    resizeMode: "cover",
  },
  dayPill: {
    alignSelf: "flex-end",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: "rgba(245,206,54,0.55)",
    borderRadius: 999,
    backgroundColor: "rgba(7,14,27,0.58)",
  },
  dayPillText: {
    color: COLORS.lightGold,
    fontFamily: "CrimsonPro_600SemiBold",
    fontSize: 10,
    letterSpacing: 1.3,
  },
  heroContent: {
    paddingBottom: 8,
  },
  book: {
    color: COLORS.lightGold,
    fontFamily: "CrimsonPro_600SemiBold",
    fontSize: 12,
    letterSpacing: 1.6,
  },
  theme: {
    marginTop: 5,
    color: "rgba(255,255,255,0.68)",
    fontFamily: "Lora_400Regular_Italic",
    fontSize: 12,
  },
  heroTitle: {
    marginTop: 10,
    color: "#FFFFFF",
    fontFamily: "CrimsonPro_700Bold",
    fontSize: 38,
    lineHeight: 39,
  },
  content: {
    paddingHorizontal: 18,
  },
  scriptureReference: {
    color: COLORS.olive,
    fontFamily: "CrimsonPro_600SemiBold",
    fontSize: 13,
    letterSpacing: 0.8,
  },
  keyVerse: {
    marginTop: 12,
    color: COLORS.navy,
    fontFamily: "Lora_400Regular_Italic",
    fontSize: 17,
    lineHeight: 27,
  },
  sectionHeading: {
    marginTop: 29,
    flexDirection: "row",
    alignItems: "center",
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(212,175,55,0.30)",
  },
  sectionCross: {
    marginHorizontal: 13,
    color: COLORS.gold,
    fontSize: 18,
  },
  storyHeading: {
    marginTop: 18,
    color: COLORS.navy,
    fontFamily: "CrimsonPro_700Bold",
    fontSize: 29,
  },
  paragraph: {
    marginTop: 16,
    color: "#34425A",
    fontFamily: "CrimsonPro_400Regular",
    fontSize: 17,
    lineHeight: 27,
  },
  storyImageBlock: {
    marginTop: 21,
    overflow: "hidden",
    borderRadius: 20,
    backgroundColor: COLORS.card,
  },
  storyImage: {
    width: "100%",
    height: 215,
    resizeMode: "cover",
  },
  imageCaption: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: COLORS.muted,
    fontFamily: "Lora_400Regular_Italic",
    fontSize: 11,
    lineHeight: 17,
  },
  christCard: {
    marginTop: 25,
    padding: 20,
    borderRadius: 22,
  },
  christLabel: {
    flexDirection: "row",
    alignItems: "center",
  },
  christLabelText: {
    marginLeft: 8,
    color: COLORS.lightGold,
    fontFamily: "CrimsonPro_600SemiBold",
    fontSize: 11,
    letterSpacing: 1.5,
  },
  christTitle: {
    marginTop: 17,
    color: "#FFFFFF",
    fontFamily: "CrimsonPro_700Bold",
    fontSize: 25,
    lineHeight: 31,
  },
  christParagraph: {
    marginTop: 15,
    color: "rgba(255,255,255,0.78)",
    fontFamily: "CrimsonPro_400Regular",
    fontSize: 16,
    lineHeight: 25,
  },
  christReferences: {
    marginTop: 18,
    color: "#DCC45E",
    fontFamily: "CrimsonPro_600SemiBold",
    fontSize: 10,
    letterSpacing: 0.8,
  },
  questions: {
    gap: 16,
  },
  question: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  questionNumber: {
    width: 29,
    height: 29,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: COLORS.olive,
  },
  questionNumberText: {
    color: "#FFFFFF",
    fontFamily: "CrimsonPro_700Bold",
    fontSize: 14,
  },
  questionText: {
    flex: 1,
    marginLeft: 12,
    color: "#34425A",
    fontFamily: "CrimsonPro_400Regular",
    fontSize: 16,
    lineHeight: 24,
  },
  cardParagraph: {
    marginBottom: 13,
    color: "#34425A",
    fontFamily: "CrimsonPro_400Regular",
    fontSize: 16,
    lineHeight: 25,
  },
  completeButton: {
    marginTop: 24,
    overflow: "hidden",
    borderRadius: 18,
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.34,
    shadowRadius: 12,
    elevation: 5,
  },
  completeGradient: {
    minHeight: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 20,
  },
  completeText: {
    color: COLORS.night,
    fontFamily: "CrimsonPro_700Bold",
    fontSize: 19,
  },
  completeTextDone: {
    color: "#FFFFFF",
  },
  buttonPressed: {
    opacity: 0.84,
    transform: [{ scale: 0.99 }],
  },
  footer: {
    marginTop: 28,
    textAlign: "center",
    color: "rgba(15,32,64,0.42)",
    fontFamily: "CrimsonPro_400Regular",
    fontSize: 12,
  },
});
