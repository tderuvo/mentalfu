"use client";

import { useEffect, useState } from "react";

// Standard UTM parameters carried through the /start funnel.
export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
];

const STORAGE_KEY = "mentalfu_utms";

function readFromSearch(search) {
  const params = new URLSearchParams(search);
  const utms = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) utms[key] = value;
  }
  return utms;
}

function readStored() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function store(utms) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utms));
  } catch {
    // Private mode / blocked storage — the URL still carries the values.
  }
}

// Returns [utms, ready]. UTMs in the current URL win and are saved for the
// rest of the browser session; with none in the URL, the session's saved
// values are used, so attribution survives a visitor wandering off and
// coming back to /start. `ready` is false until the browser has been read
// (static export has no request-time query string).
export function useUtms() {
  const [state, setState] = useState([{}, false]);

  useEffect(() => {
    const fromUrl = readFromSearch(window.location.search);
    if (Object.keys(fromUrl).length > 0) {
      store(fromUrl);
      setState([fromUrl, true]);
    } else {
      setState([readStored(), true]);
    }
  }, []);

  return state;
}

// Appends UTMs to an internal href, keeping any #hash at the end.
export function withUtms(href, utms) {
  if (!utms || Object.keys(utms).length === 0) return href;
  const [path, hash] = href.split("#");
  const [base, query] = path.split("?");
  const params = new URLSearchParams(query);
  for (const [key, value] of Object.entries(utms)) params.set(key, value);
  return `${base}?${params.toString()}${hash ? `#${hash}` : ""}`;
}
