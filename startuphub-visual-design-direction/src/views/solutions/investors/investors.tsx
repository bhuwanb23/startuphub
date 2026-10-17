import SolutionView from "@/components/solution/solution-view";
import { investorsData } from "@/views/solutions/investors/constants/investors";

export function InvestorsView() {
  return <SolutionView data={investorsData} />;
}
