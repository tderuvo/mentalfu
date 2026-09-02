import { getAllKatas } from "@/lib/katas";
import WhyPage from "@/components/WhyPage";

export const metadata = {
  title: "Why MentalFu",
  description: "What MentalFu is, how it works, and who it's for.",
};

export default function Why() {
  const katas = getAllKatas();
  return <WhyPage katas={katas} />;
}
