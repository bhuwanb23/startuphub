import SolutionView from "@/components/solution/solution-view";
import { mentorsData } from "@/views/solutions/mentors/constants/mentors";

export function MentorsView() {
  return <SolutionView data={mentorsData} />;
}
