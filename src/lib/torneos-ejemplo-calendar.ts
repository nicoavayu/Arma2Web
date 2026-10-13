import type { Locale } from "@/lib/i18n";

/**
 * Calendar of the example tournament (what's left to play) and its date
 * formatting. Kept light so the Torneos home can show the rescheduled match
 * without loading the example's standings.
 */

export interface Kickoff {
  /** YYYY-MM-DD, read as a calendar day (no time zone). */
  date: string;
  /** HH:MM, 24 h. */
  time: string;
  pitch: number;
}

export interface ScheduledMatch {
  round: number;
  homeId: string;
  awayId: string;
  kickoff: Kickoff;
  /** Set when the match was rescheduled: where it was before. */
  rescheduledFrom?: Kickoff;
}

/** What's left to play, in round order. */
export const EJEMPLO_FIXTURE: ScheduledMatch[] = [
  {
    round: 7,
    homeId: "dt",
    awayId: "et",
    kickoff: { date: "2026-10-21", time: "21:00", pitch: 1 },
    rescheduledFrom: { date: "2026-10-10", time: "18:00", pitch: 1 },
  },
  { round: 8, homeId: "lg", awayId: "et", kickoff: { date: "2026-10-17", time: "18:00", pitch: 1 } },
  { round: 8, homeId: "tt", awayId: "dt", kickoff: { date: "2026-10-17", time: "19:00", pitch: 2 } },
  { round: 9, homeId: "dt", awayId: "lg", kickoff: { date: "2026-10-24", time: "18:00", pitch: 1 } },
  { round: 9, homeId: "et", awayId: "tt", kickoff: { date: "2026-10-24", time: "19:00", pitch: 2 } },
];

const WEEKDAYS: Record<Locale, string[]> = {
  es: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};
const MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "Sáb 10/10" / "Sat Oct 10". */
export function formatDay(date: string, locale: Locale): string {
  const [year, month, day] = date.split("-").map(Number);
  const weekday = WEEKDAYS[locale][new Date(Date.UTC(year, month - 1, day)).getUTCDay()];
  return locale === "es" ? `${weekday} ${day}/${month}` : `${weekday} ${MONTHS_EN[month - 1]} ${day}`;
}

function formatTime(time: string, locale: Locale): string {
  if (locale === "es") return time;
  const [hours, minutes] = time.split(":").map(Number);
  return `${hours % 12 || 12}:${String(minutes).padStart(2, "0")} ${hours < 12 ? "am" : "pm"}`;
}

/** "Mié 21/10 · 21:00" / "Wed Oct 21 · 9:00 pm". */
export function formatKickoff(kickoff: Kickoff, locale: Locale): string {
  return `${formatDay(kickoff.date, locale)} · ${formatTime(kickoff.time, locale)}`;
}
