import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const KATAS_DIR = path.join(process.cwd(), "content", "katas");

function stripDraftingNotes(raw) {
  return raw.replace(/<!--[\s\S]*?-->/g, "").trim();
}

function stripLeadingHeading(markdown) {
  return markdown.replace(/^#\s+.+\n+/, "").trim();
}

function getKataSlugs() {
  return fs.readdirSync(KATAS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((slug) => fs.existsSync(path.join(KATAS_DIR, slug, "index.md")));
}

function loadKata(slug) {
  const raw = fs.readFileSync(path.join(KATAS_DIR, slug, "index.md"), "utf8");
  const { data, content } = matter(raw);
  const body = stripLeadingHeading(stripDraftingNotes(content));

  return {
    slug,
    title: data.title,
    beltStage: data.classification?.belt_stage,
    cardText: data.presentation?.card_text,
    html: marked.parse(body),
  };
}

export function getAllKatas() {
  return getKataSlugs().map(loadKata);
}

export function getKataBySlug(slug) {
  if (!fs.existsSync(path.join(KATAS_DIR, slug, "index.md"))) return null;
  return loadKata(slug);
}

export function getRandomKata() {
  const slugs = getKataSlugs();
  if (slugs.length === 0) return null;
  const slug = slugs[Math.floor(Math.random() * slugs.length)];
  return loadKata(slug);
}
