import { AdventStoryScreen } from "../components/advent/AdventStoryScreen";
import { DAY_5_BY_LANGUAGE } from "../data/day5";

export default function DayFiveScreen() {
  return (
    <AdventStoryScreen
      contentByLanguage={DAY_5_BY_LANGUAGE}
      images={{
        hero: require("../assets/images/day5-moriah-hero.jpg"),
        journey: require("../assets/images/day5-moriah-journey.jpg"),
        lamb: require("../assets/images/day5-lambs.jpg"),
      }}
    />
  );
}
