import { INITIAL_DEMO_STATE } from "@/lib/torneos-demo";

/** Team names of the demo league, by id. */
export const TEAM_NAMES: Record<string, string> = Object.fromEntries(
  INITIAL_DEMO_STATE.standings.map((row) => [row.teamId, row.name]),
);
