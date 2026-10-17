import SolutionView from "@/components/solution/solution-view";
import { corporatesData } from "@/views/solutions/corporates/constants/corporates";

export function CorporatesView() {
  return <SolutionView data={corporatesData} />;
}
