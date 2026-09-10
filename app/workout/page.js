import { getAllKatas } from "@/lib/katas";
import KataDisplay from "@/components/KataDisplay";

export const metadata = {
  title: "Today's Workout — MentalFu",
  description: "Your daily mental workout.",
};

export default function Workout() {
  const katas = getAllKatas();
  return <KataDisplay katas={katas} />;
}
