"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WorkoutRedirect({ slugs }) {
  const router = useRouter();

  useEffect(() => {
    const slug = slugs[Math.floor(Math.random() * slugs.length)];
    // Keep any query string (e.g. UTMs from /start) through the redirect.
    router.replace(`/workout/${slug}${window.location.search}`);
  }, [slugs, router]);

  return null;
}
