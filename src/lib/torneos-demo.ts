/**
 * Example data for the "una carga, todo actualizado" demo on the Torneos
 * portal. Made-up teams and numbers; the tie-break order is the demo's own.
 */

export interface StandingRow {
  teamId: string;
  name: string;
  pj: number;
  pg: number;
  pe: number;
  pp: number;
  gf: number;
  gc: number;
  pts: number;
}

export interface ScorerRow {
  player: string;
  teamId: string;
  goals: number;
}

export interface MatchResult {
  homeId: string;
  awayId: string;
  homeGoals: number;
  awayGoals: number;
  scorers: { player: string; teamId: string }[];
}

export interface DemoState {
  standings: StandingRow[];
  scorers: ScorerRow[];
}

/** After round 6: Los Galácticos one point behind the leader. */
export const INITIAL_DEMO_STATE: DemoState = {
  standings: [
    { teamId: "dt", name: "Deportivo Tapita", pj: 6, pg: 4, pe: 1, pp: 1, gf: 14, gc: 8, pts: 13 },
    { teamId: "lg", name: "Los Galácticos", pj: 6, pg: 4, pe: 0, pp: 2, gf: 15, gc: 9, pts: 12 },
    { teamId: "tt", name: "Tiki-Taka", pj: 6, pg: 2, pe: 1, pp: 3, gf: 9, gc: 11, pts: 7 },
    { teamId: "et", name: "El Tanque", pj: 6, pg: 1, pe: 0, pp: 5, gf: 6, gc: 16, pts: 3 },
  ],
  scorers: [
    { player: "Fran", teamId: "dt", goals: 5 },
    { player: "Nico", teamId: "lg", goals: 5 },
    { player: "Juani", teamId: "tt", goals: 4 },
    { player: "Santi", teamId: "dt", goals: 3 },
    { player: "Mati", teamId: "et", goals: 3 },
  ],
};

/** Round 7: Los Galácticos 3–1 Tiki-Taka. */
export const DEMO_RESULT: MatchResult = {
  homeId: "lg",
  awayId: "tt",
  homeGoals: 3,
  awayGoals: 1,
  scorers: [
    { player: "Nico", teamId: "lg" },
    { player: "Rodri", teamId: "lg" },
    { player: "Nico", teamId: "lg" },
    { player: "Juani", teamId: "tt" },
  ],
};

export function sortStandings(rows: readonly StandingRow[]): StandingRow[] {
  return [...rows].sort(
    (a, b) =>
      b.pts - a.pts ||
      b.gf - b.gc - (a.gf - a.gc) ||
      b.gf - a.gf ||
      a.name.localeCompare(b.name, "es"),
  );
}

function applyToTeam(row: StandingRow, scored: number, conceded: number): StandingRow {
  const won = scored > conceded;
  const drawn = scored === conceded;
  return {
    ...row,
    pj: row.pj + 1,
    pg: row.pg + (won ? 1 : 0),
    pe: row.pe + (drawn ? 1 : 0),
    pp: row.pp + (!won && !drawn ? 1 : 0),
    gf: row.gf + scored,
    gc: row.gc + conceded,
    pts: row.pts + (won ? 3 : drawn ? 1 : 0),
  };
}

export function applyResult(state: DemoState, result: MatchResult): DemoState {
  const standings = state.standings.map((row) => {
    if (row.teamId === result.homeId) return applyToTeam(row, result.homeGoals, result.awayGoals);
    if (row.teamId === result.awayId) return applyToTeam(row, result.awayGoals, result.homeGoals);
    return { ...row };
  });

  const goals = new Map<string, ScorerRow>();
  for (const scorer of state.scorers) {
    goals.set(`${scorer.teamId}:${scorer.player}`, { ...scorer });
  }
  for (const { player, teamId } of result.scorers) {
    const key = `${teamId}:${player}`;
    const current = goals.get(key);
    goals.set(key, { player, teamId, goals: (current?.goals ?? 0) + 1 });
  }

  const scorers = [...goals.values()].sort((a, b) => b.goals - a.goals || a.player.localeCompare(b.player, "es"));

  return { standings: sortStandings(standings), scorers };
}
