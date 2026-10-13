/**
 * Team balancing for the website demo. It is the site's own algorithm, made to
 * illustrate the idea (split the group's scores into two even teams); it does
 * not reproduce the product's balancer.
 */

export interface DemoPlayer {
  id: string;
  name: string;
  /** Group average on the 1–10 voting scale, one decimal. */
  score: number;
  goalkeeper?: boolean;
}

export interface BalanceResult {
  teamA: DemoPlayer[];
  teamB: DemoPlayer[];
  totalA: number;
  totalB: number;
  diff: number;
}

/** Fictional group used by the demo (same names as the product captures). */
export const DEMO_PLAYERS: readonly DemoPlayer[] = [
  { id: "nico", name: "Nico", score: 7.8 },
  { id: "santi", name: "Santi", score: 8.4 },
  { id: "fran", name: "Fran", score: 6.2 },
  { id: "agus", name: "Agus", score: 7.1, goalkeeper: true },
  { id: "lucho", name: "Lucho", score: 5.4 },
  { id: "emi", name: "Emi", score: 6.0 },
  { id: "fede", name: "Fede", score: 6.6, goalkeeper: true },
  { id: "tomi", name: "Tomi", score: 5.9 },
  { id: "juani", name: "Juani", score: 8.9 },
  { id: "pipe", name: "Pipe", score: 4.8 },
];

/** Scores in tenths, so sums stay exact. */
const tenths = (player: DemoPlayer) => Math.round(player.score * 10);
const sumTenths = (team: readonly DemoPlayer[]) => team.reduce((total, player) => total + tenths(player), 0);

function toResult(teamA: DemoPlayer[], teamB: DemoPlayer[]): BalanceResult {
  const a = sumTenths(teamA);
  const b = sumTenths(teamB);
  return { teamA, teamB, totalA: a / 10, totalB: b / 10, diff: Math.abs(a - b) / 10 };
}

/** Baseline: sort by score and pick A, B, A, B… */
export function alternatingSplit(players: readonly DemoPlayer[]): BalanceResult {
  const sorted = [...players].sort((x, y) => y.score - x.score);
  return toResult(
    sorted.filter((_, index) => index % 2 === 0),
    sorted.filter((_, index) => index % 2 === 1),
  );
}

/** Small deterministic PRNG (mulberry32) so "Otra combinación" is reproducible. */
function mulberry32(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled<T>(items: readonly T[], seed: number): T[] {
  const random = mulberry32(seed);
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function balanceTeams(
  players: readonly DemoPlayer[],
  options: { fixGoalkeepers?: boolean; seed?: number } = {},
): BalanceResult {
  const { fixGoalkeepers = false, seed } = options;
  const ordered = seed === undefined ? [...players].sort((x, y) => y.score - x.score) : shuffled(players, seed);

  const teamA: DemoPlayer[] = [];
  const teamB: DemoPlayer[] = [];
  const locked = new Set<string>();

  if (fixGoalkeepers) {
    const keepers = ordered.filter((player) => player.goalkeeper).slice(0, 2);
    keepers.forEach((keeper, index) => {
      (index === 0 ? teamA : teamB).push(keeper);
      locked.add(keeper.id);
    });
  }

  for (const player of ordered) {
    if (locked.has(player.id)) continue;
    (teamA.length <= teamB.length ? teamA : teamB).push(player);
  }

  // Hill climbing: apply the best improving swap until none is left.
  for (;;) {
    const gap = sumTenths(teamA) - sumTenths(teamB);
    let best: { i: number; j: number; gap: number } | null = null;
    for (let i = 0; i < teamA.length; i += 1) {
      if (locked.has(teamA[i].id)) continue;
      for (let j = 0; j < teamB.length; j += 1) {
        if (locked.has(teamB[j].id)) continue;
        const delta = tenths(teamA[i]) - tenths(teamB[j]);
        const next = Math.abs(gap - 2 * delta);
        if (next < Math.abs(gap) && (!best || next < best.gap)) {
          best = { i, j, gap: next };
        }
      }
    }
    if (!best) break;
    [teamA[best.i], teamB[best.j]] = [teamB[best.j], teamA[best.i]];
  }

  return toResult(teamA, teamB);
}
