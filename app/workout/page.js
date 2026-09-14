import { getAllKatas } from "@/lib/katas";
import WorkoutRedirect from "@/components/WorkoutRedirect";

export const metadata = {
  title: "Today's Workout — MentalFu",
  description: "Your daily mental workout.",
};

export default function Workout() {
  const slugs = getAllKatas().map((kata) => kata.slug);
  return <WorkoutRedirect slugs={slugs} />;
}
