import { notFound } from "next/navigation";
import { getAllFormSlugs, getFormBySlug } from "@/lib/forms";
import FormPage from "@/components/FormPage";

export function generateStaticParams() {
  return getAllFormSlugs().map((slug) => ({ form: slug }));
}

export function generateMetadata({ params }) {
  const form = getFormBySlug(params.form);
  if (!form) return {};

  return {
    title: `${form.hero.title} — ${form.name} — MentalFu`,
    description: form.metaDescription,
  };
}

export default function TrainingFloorForm({ params }) {
  const form = getFormBySlug(params.form);
  if (!form) notFound();

  return <FormPage form={form} />;
}
