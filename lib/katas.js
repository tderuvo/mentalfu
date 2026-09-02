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

export function getAllKatas() {
  const files = fs.readdirSync(KATAS_DIR).filter((f) => f.endsWith(".md"));

  return files.map((filename) => {
    const raw = fs.readFileSync(path.join(KATAS_DIR, filename), "utf8");
    const { data, content } = matter(raw);
    const body = stripLeadingHeading(stripDraftingNotes(content));

    return {
      slug: filename.replace(/\.md$/, ""),
      title: data.title,
      beltStage: data.belt_stage,
      cardText: data.card_text,
      html: marked.parse(body),
    };
  });
}
