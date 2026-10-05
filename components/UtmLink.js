"use client";

import { useUtms, withUtms } from "@/lib/utm";

// An internal link that carries the visitor's UTM parameters with it, so
// attribution isn't lost when someone leaves /start for a workout or a
// Training Floor page.
export default function UtmLink({ href, children, ...props }) {
  const [utms] = useUtms();
  return (
    <a href={withUtms(href, utms)} {...props}>
      {children}
    </a>
  );
}
