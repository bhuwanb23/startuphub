import { DashboardHeader, KpiGrid, ProgressCard, StatusRow } from "@/users/startup/components/dashboard/overview";
import CopilotPanel from "@/users/startup/components/dashboard/copilot";
import { MilestonesCard, OpportunitiesCard, RightRail, RisksCard, TasksCard } from "@/users/startup/components/dashboard/lists";

export function Dashboard() {
  return (
    <div className="space-y-4">
      <DashboardHeader />
      <KpiGrid />
      <CopilotPanel />
      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <ProgressCard />
          <StatusRow />
          <div className="grid gap-4 md:grid-cols-2">
            <MilestonesCard />
            <TasksCard />
            <RisksCard />
            <OpportunitiesCard />
          </div>
        </div>
        <RightRail />
      </div>
    </div>
  );
}
