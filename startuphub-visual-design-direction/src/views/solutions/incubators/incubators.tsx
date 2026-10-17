import SolutionView from "@/components/solution/solution-view";
import { incubatorsData } from "@/views/solutions/incubators/constants/incubators";

export function IncubatorsView() {
  return <SolutionView data={incubatorsData} />;
}
