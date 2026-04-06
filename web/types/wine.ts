export interface ParsedLabel {
  winery: string | null;
  wine_name: string | null;
  vintage: number | null;
  grape_variety: string | null;
  appellation: string | null;
  alcohol_pct: number | null;
  estate_bottled: boolean | null;
  reserve: boolean | null;
  raw_label_text: string | null;
}

export interface RegionProfile {
  name: string;
  parent_ava: string | null;
  climate_type: string;
  soil_types: string[];
  key_grapes: string[];
  climate_summary: string;
  known_for: string;
}

export interface VintageNote {
  year: number;
  region: string;
  rating: string;
  weather_summary: string;
  aging_potential: string;
}

export interface GrapeProfile {
  variety: string;
  skin_color: string;
  california_character: string;
  flavor_profile: string[];
  structure: string;
  food_pairings: string[];
  peak_drinking_window: string;
}

export interface ProducerProfile {
  name: string;
  founded: number | null;
  region: string;
  philosophy: string;
  tier: string;
  known_wines: string[];
}

export interface WineAnalysis {
  parsed_label: ParsedLabel;
  region_profile: RegionProfile | null;
  producer_profile: ProducerProfile | null;
  vintage_note: VintageNote | null;
  grape_profile: GrapeProfile | null;
  terroir_narrative: string;
  buying_guidance: string;
  geek_notes: string;
  confidence: string;
}
