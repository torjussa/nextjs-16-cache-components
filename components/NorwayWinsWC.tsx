import { Trophy } from "lucide-react";
import { getFifaWCWinPercentage } from "@/data-access/getFifaRank";
import { cacheLife, cacheTag } from "next/cache";

export default async function NorwayWinsWCPercentage() {
  "use cache";
  cacheTag("fifa-wc-win-percentage");

  const winPercentage = await getFifaWCWinPercentage();

  return (
    <div className="mt-8 max-w-md min-w-[300px] justify-self-center group relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
      {/* Background gradient accent */}
      <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 via-red-500/5 to-blue-500/5 opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative flex flex-col items-center gap-4">
        {/* Header with flag and title */}
        <div className="flex items-center gap-3">
          <span className="text-4xl">🇳🇴</span>
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-muted-foreground">
              VM 2026
            </h3>
          </div>
        </div>

        {/* Main percentage display */}
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-bold tracking-tight text-foreground">
            {winPercentage}
          </span>
          <span className="text-2xl font-medium text-muted-foreground">%</span>
        </div>

        {/* Trophy icon */}
        <div className="mt-2 flex items-center gap-2 rounded-full bg-muted/50 px-4 py-2">
          <Trophy className="size-4 text-yellow-500" />
          <span className="text-xs font-medium text-muted-foreground">
            Vinnersjanse
          </span>
        </div>
      </div>
    </div>
  );
}
