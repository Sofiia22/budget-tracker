import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

type ProgressCardProps = {
  currentDay?: number;
  completedDays?: number;
  totalDays?: number;
};

const COLORS = {
  night: "#070E1B",
  navy: "#0F2040",
  gold: "#D4AF37",
  lightGold: "#F5CE36",
  cream: "#F8F3E9",
  card: "#FFFCF6",
  olive: "#6F7843",
  muted: "#817D75",
  border: "#E8DEC9",
};

const RING_SIZE = 94;
const STROKE_WIDTH = 7;
const RADIUS = (RING_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function ProgressCard({
  currentDay = 5,
  completedDays = 4,
  totalDays = 24,
}: ProgressCardProps) {
  const progress = currentDay / totalDays;
  const strokeOffset = CIRCUMFERENCE * (1 - progress);
  const remainingDays = totalDays - currentDay;

  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>YOUR ADVENT JOURNEY</Text>

      <View style={styles.progressSection}>
        <View style={styles.ringContainer}>
          <Svg
            width={RING_SIZE}
            height={RING_SIZE}
            viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
          >
            <Circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="rgba(15,32,64,0.08)"
              strokeWidth={STROKE_WIDTH}
            />

            <Circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="rgba(212,175,55,0.16)"
              strokeWidth={13}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeOffset}
              rotation="-90"
              origin={`${RING_SIZE / 2}, ${RING_SIZE / 2}`}
            />

            <Circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke={COLORS.gold}
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeOffset}
              rotation="-90"
              origin={`${RING_SIZE / 2}, ${RING_SIZE / 2}`}
            />
          </Svg>

          <View style={styles.ringText}>
            <Text style={styles.currentDay}>{currentDay}</Text>
            <Text style={styles.totalDays}>/ {totalDays}</Text>
          </View>
        </View>

        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>
            Day {currentDay} of {totalDays}
          </Text>

          <View style={styles.statRow}>
            <View style={[styles.statDot, styles.completedDot]} />
            <Text style={styles.statText}>
              {completedDays} stories completed
            </Text>
          </View>

          <View style={styles.statRow}>
            <View style={[styles.statDot, styles.remainingDot]} />
            <Text style={styles.statText}>{remainingDays} days remaining</Text>
          </View>
        </View>
      </View>

      <View style={styles.dayTrack}>
        {Array.from({ length: totalDays }, (_, index) => {
          const day = index + 1;
          const isCompleted = day <= completedDays;
          const isToday = day === currentDay;

          return (
            <View
              key={day}
              style={[
                styles.trackDot,
                isCompleted && styles.trackCompleted,
                isToday && styles.trackToday,
              ]}
            />
          );
        })}
      </View>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerCross}>✦</Text>
        <View style={styles.dividerLine} />
      </View>

      <Text style={styles.quote}>
        “The people walking in darkness have seen a great light.”
      </Text>

      <Text style={styles.reference}>ISAIAH 9:2</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 24,
    padding: 19,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 22,
    backgroundColor: COLORS.card,
    shadowColor: COLORS.night,
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.07,
    shadowRadius: 14,
    elevation: 3,
  },
  eyebrow: {
    color: COLORS.olive,
    fontFamily: "CrimsonPro_600SemiBold",
    fontSize: 11,
    letterSpacing: 1.7,
  },
  progressSection: {
    marginTop: 17,
    flexDirection: "row",
    alignItems: "center",
  },
  ringContainer: {
    width: RING_SIZE,
    height: RING_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  ringText: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "baseline",
  },
  currentDay: {
    color: COLORS.navy,
    fontFamily: "CrimsonPro_700Bold",
    fontSize: 29,
  },
  totalDays: {
    marginLeft: 2,
    color: COLORS.muted,
    fontFamily: "CrimsonPro_400Regular",
    fontSize: 13,
  },
  summary: {
    flex: 1,
    marginLeft: 20,
  },
  summaryTitle: {
    marginBottom: 9,
    color: COLORS.navy,
    fontFamily: "CrimsonPro_600SemiBold",
    fontSize: 20,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  statDot: {
    width: 8,
    height: 8,
    marginRight: 8,
    borderRadius: 4,
  },
  completedDot: {
    backgroundColor: COLORS.navy,
  },
  remainingDot: {
    borderWidth: 1,
    borderColor: "rgba(15,32,64,0.18)",
    backgroundColor: COLORS.cream,
  },
  statText: {
    color: COLORS.muted,
    fontFamily: "CrimsonPro_400Regular",
    fontSize: 13,
  },
  dayTrack: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  trackDot: {
    width: 7,
    height: 7,
    borderWidth: 1,
    borderColor: "rgba(15,32,64,0.14)",
    borderRadius: 4,
    backgroundColor: COLORS.cream,
  },
  trackCompleted: {
    borderColor: COLORS.navy,
    backgroundColor: COLORS.navy,
  },
  trackToday: {
    width: 9,
    height: 9,
    marginTop: -1,
    borderColor: COLORS.lightGold,
    backgroundColor: COLORS.gold,
    shadowColor: COLORS.gold,
    shadowOpacity: 0.65,
    shadowRadius: 5,
  },
  divider: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(212,175,55,0.24)",
  },
  dividerCross: {
    marginHorizontal: 11,
    color: COLORS.gold,
    fontSize: 16,
  },
  quote: {
    marginTop: 16,
    textAlign: "center",
    color: COLORS.navy,
    fontFamily: "Lora_400Regular_Italic",
    fontSize: 14,
    lineHeight: 21,
  },
  reference: {
    marginTop: 8,
    textAlign: "center",
    color: COLORS.olive,
    fontFamily: "CrimsonPro_600SemiBold",
    fontSize: 10,
    letterSpacing: 1.5,
  },
});
