import { notFound } from "next/navigation";
import { getAllKatas, getKataBySlug } from "@/lib/katas";
import KataDisplay from "@/components/KataDisplay";

export function generateStaticParams() {
  return getAllKatas().map((kata) => ({ slug: kata.slug }));
}

export function generateMetadata({ params }) {
  const kata = getKataBySlug(params.slug);
  if (!kata) return {};

  return {
    title: `${kata.title} — MentalFu Workout`,
    description: kata.cardText || "Your daily mental workout.",
  };
}

export default function WorkoutKata({ params }) {
  const kata = getKataBySlug(params.slug);
  if (!kata) notFound();

  return <KataDisplay kata={kata} />;
}
