import { AVA_KNOWLEDGE, type AvaKnowledgeEntry } from "@/data/ava-knowledge";

function norm(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/\s+/g, " ");
}

/** Display names that do not match knowledge keys one-to-one */
const DISPLAY_TO_KEY: Record<string, string> = {
  "sta rita hills": "santa rita hills",
};

/** Match display name or ava_id from GeoJSON to knowledge base keys. */
export function lookupAvaKnowledge(displayName: string, avaId: string): AvaKnowledgeEntry | null {
  const dn = norm(displayName);
  const keyAlias = DISPLAY_TO_KEY[dn];
  if (keyAlias && AVA_KNOWLEDGE[keyAlias]) return AVA_KNOWLEDGE[keyAlias];
  if (AVA_KNOWLEDGE[dn]) return AVA_KNOWLEDGE[dn];

  const fromId = norm(avaId.replace(/_+/g, " "));
  if (AVA_KNOWLEDGE[fromId]) return AVA_KNOWLEDGE[fromId];

  for (const entry of Object.values(AVA_KNOWLEDGE)) {
    if (norm(entry.name) === dn) return entry;
  }

  const compact = dn.replace(/\s+/g, "");
  for (const [k, v] of Object.entries(AVA_KNOWLEDGE)) {
    if (k.replace(/\s+/g, "") === compact) return v;
  }

  return null;
}
