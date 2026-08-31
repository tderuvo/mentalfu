import { getAllKatas } from "@/lib/katas";
import KataDisplay from "@/components/KataDisplay";

export default function Home() {
  const katas = getAllKatas();
  return <KataDisplay katas={katas} />;
}
