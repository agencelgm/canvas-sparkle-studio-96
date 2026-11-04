import { assertEquals } from "jsr:@std/assert@1";
import { decideWinner } from "../_shared/abRule.ts";

Deno.test("attend 100 visites par version", () => {
  assertEquals(decideWinner({ views: 99, conversions: 50 }, { views: 200, conversions: 1 }).status, "waiting");
});

Deno.test("moins de +20 % : le test continue", () => {
  // 12 % contre 13,2 % = +10 %
  assertEquals(decideWinner({ views: 100, conversions: 12 }, { views: 1000, conversions: 132 }).status, "continue");
});

Deno.test("+20 % ou plus : gagnant", () => {
  const d = decideWinner({ views: 100, conversions: 10 }, { views: 100, conversions: 12 });
  assertEquals(d.status, "winner");
  if (d.status === "winner") assertEquals(d.winner, "b");
});

Deno.test("A gagne si A est meilleur", () => {
  const d = decideWinner({ views: 100, conversions: 18 }, { views: 100, conversions: 12 });
  assertEquals(d.status === "winner" && d.winner, "a");
});
