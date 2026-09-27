import type { Metadata } from "next";
import { MyPlanView } from "@/components/MyPlanView";

export const metadata: Metadata = {
  title: "My Plan",
  description:
    "Today's plan and your saved lifts — metrics, sorting and a five-lift cap.",
};

/** `/my-plan` — Today's Plan and Saved, backed by localStorage. */
export default function MyPlanPage() {
  return <MyPlanView />;
}
