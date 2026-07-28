import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, View } from "react-native";

export type DoorState = "completed" | "today" | "locked";

type AdventDoorProps = {
  day: number;
  state: DoorState;
  onPress?: () => void;
};

const COLORS = {
  night: "#070E1B",
  navy: "#172D55",
  navyLight: "#294574",
  gold: "#D4AF37",
  lightGold: "#F5CE36",
  cream: "#F2E8D6",
  creamLight: "#FFF9ED",
  muted: "#9D998F",
};

export function AdventDoor({ day, state, onPress }: AdventDoorProps) {
  const isCompleted = state === "completed";
  const isToday = state === "today";
  const isLocked = state === "locked";

  const gradientColors: [string, string] = isCompleted
    ? [COLORS.navyLight, COLORS.navy]
    : isToday
      ? [COLORS.lightGold, COLORS.gold]
      : [COLORS.creamLight, COLORS.cream];

  return (
    <Pressable
      disabled={isLocked}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={
        isCompleted
          ? `Day ${day}, completed`
          : isToday
            ? `Day ${day}, today`
            : `Day ${day}, locked`
      }
      accessibilityState={{ disabled: isLocked }}
      style={({ pressed }) => [
        styles.wrapper,
        isToday && styles.todayWrapper,
        pressed && !isLocked && styles.pressed,
      ]}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={[
          styles.door,
          isCompleted && styles.completedDoor,
          isToday && styles.todayDoor,
          isLocked && styles.lockedDoor,
        ]}
      >
        <View style={styles.hinges}>
          <View
            style={[
              styles.hinge,
              isCompleted && styles.completedHinge,
              isToday && styles.todayHinge,
            ]}
          />
          <View
            style={[
              styles.hinge,
              isCompleted && styles.completedHinge,
              isToday && styles.todayHinge,
            ]}
          />
        </View>

        {isCompleted ? (
          <>
            <Text style={styles.completedDay}>
              {String(day).padStart(2, "0")}
            </Text>

            <View style={styles.completedGlow}>
              <Ionicons name="star" size={23} color={COLORS.lightGold} />
            </View>
          </>
        ) : null}

        {isToday ? (
          <>
            <View style={styles.todayPill}>
              <Text style={styles.todayLabel}>TODAY</Text>
            </View>

            <Text style={styles.todayDay}>{day}</Text>
          </>
        ) : null}

        {isLocked ? (
          <>
            <Text style={styles.lockedDay}>{String(day).padStart(2, "0")}</Text>

            <View style={styles.lockedPanel}>
              <Ionicons
                name="lock-closed-outline"
                size={16}
                color="rgba(23,45,85,0.28)"
              />

              <View style={styles.doorKnob} />
            </View>
          </>
        ) : null}
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    minWidth: 0,
    height: 112,
    borderTopLeftRadius: 42,
    borderTopRightRadius: 42,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  todayWrapper: {
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.65,
    shadowRadius: 12,
    elevation: 8,
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.97 }],
  },
  door: {
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
    borderTopLeftRadius: 42,
    borderTopRightRadius: 42,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  completedDoor: {
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.24)",
    shadowColor: COLORS.night,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.24,
    shadowRadius: 8,
    elevation: 5,
  },
  todayDoor: {
    borderWidth: 2.5,
    borderColor: "#F8D85D",
  },
  lockedDoor: {
    borderWidth: 1,
    borderColor: "rgba(23,45,85,0.10)",
  },
  hinges: {
    position: "absolute",
    top: 39,
    bottom: 16,
    left: 7,
    justifyContent: "space-between",
  },
  hinge: {
    width: 4,
    height: 11,
    borderRadius: 2,
    backgroundColor: "rgba(23,45,85,0.10)",
  },
  completedHinge: {
    backgroundColor: "rgba(212,175,55,0.58)",
  },
  todayHinge: {
    backgroundColor: "rgba(23,45,85,0.22)",
  },
  completedDay: {
    marginTop: 13,
    color: "rgba(255,255,255,0.58)",
    fontFamily: "CrimsonPro_400Regular",
    fontSize: 12,
    letterSpacing: 1.3,
  },
  completedGlow: {
    width: 48,
    height: 48,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    backgroundColor: "rgba(212,175,55,0.11)",
    shadowColor: COLORS.lightGold,
    shadowOpacity: 0.65,
    shadowRadius: 15,
  },
  todayPill: {
    marginTop: 23,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.30)",
  },
  todayLabel: {
    color: COLORS.navy,
    fontFamily: "CrimsonPro_700Bold",
    fontSize: 8,
    letterSpacing: 1.1,
  },
  todayDay: {
    marginTop: 10,
    color: COLORS.navy,
    fontFamily: "CrimsonPro_700Bold",
    fontSize: 32,
    lineHeight: 35,
  },
  lockedDay: {
    marginTop: 13,
    color: "rgba(23,45,85,0.38)",
    fontFamily: "CrimsonPro_400Regular",
    fontSize: 12,
    letterSpacing: 1.3,
  },
  lockedPanel: {
    position: "relative",
    width: "72%",
    height: 49,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(23,45,85,0.08)",
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.22)",
  },
  doorKnob: {
    position: "absolute",
    right: 5,
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "rgba(23,45,85,0.23)",
  },
});
