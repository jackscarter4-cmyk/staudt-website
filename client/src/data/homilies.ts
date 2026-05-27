// Import the full homilies data from the spreadsheet
import homilyData from './homilies_full.json';

export interface Homily {
  id?: string;
  title: string;
  date: string | null;
  season: string;
  audio_url?: string;
  duration?: string;
  readings?: {
    first: string;
    second: string;
    gospel: string;
  };
}

// Transform the imported data to include IDs
export const homilies: Homily[] = homilyData.map((h: any, index: number) => ({
  id: h.title.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, ''),
  title: h.title,
  date: h.date,
  season: h.season,
  audio_url: h.audio_url,
  duration: h.duration,
  readings: h.readings
}));

export const seasons = [
  { name: "Advent", color: "#8B4513" },
  { name: "Christmas", color: "#DC143C" },
  { name: "Ordinary Time", color: "#2C3E50" },
  { name: "Lent", color: "#6B4423" },
  { name: "Easter", color: "#FFD700" }
];

export function getSeasonColor(season: string): string {
  const s = seasons.find(s => s.name === season);
  return s?.color || "#2C3E50";
}

export function formatDate(dateString: string | null): string {
  if (!dateString) return "Date TBD";
  const date = new Date(dateString + "T00:00:00Z");
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

export function formatDuration(durationString: string | undefined): string {
  if (!durationString) return "";
  return durationString;
}
