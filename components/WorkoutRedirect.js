"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WorkoutRedirect({ slugs }) {
  const router = useRouter();

  useEffect(() => {
    const slug = slugs[Math.floor(Math.random() * slugs.length)];
    router.replace(`/workout/${slug}`);
  }, [slugs, router]);

  return null;
}
