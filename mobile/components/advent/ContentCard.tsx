import { Ionicons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

type Accent = "gold" | "olive" | "navy";

type ContentCardProps = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  accent?: Accent;
  children: ReactNode;
};

const COLORS = {
  night: "#070E1B",
  navy: "#0F2040",
  gold: "#D4AF37",
  olive: "#6F7843",
  card: "#FFFCF6",
  border: "#E8DEC9",
};

const ACCENTS: Record<Accent, { color: string; background: string }> = {
  gold: {
    color: COLORS.gold,
    background: "rgba(212,175,55,0.13)",
  },
  olive: {
    color: COLORS.olive,
    background: "rgba(111,120,67,0.12)",
  },
  navy: {
    color: COLORS.navy,
    background: "rgba(15,32,64,0.09)",
  },
};

export function ContentCard({
  title,
  icon,
  accent = "gold",
  children,
}: ContentCardProps) {
  const accentColors = ACCENTS[accent];

  return (
    <View style={styles.card}>
      <View style={styles.heading}>
        <View
          style={[
            styles.iconTile,
            { backgroundColor: accentColors.background },
          ]}
        >
          <Ionicons name={icon} size={21} color={accentColors.color} />
        </View>

        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    shadowColor: COLORS.night,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconTile: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13,
  },
  title: {
    flex: 1,
    marginLeft: 12,
    color: COLORS.navy,
    fontFamily: "CrimsonPro_700Bold",
    fontSize: 21,
  },
  content: {
    marginTop: 15,
  },
});
