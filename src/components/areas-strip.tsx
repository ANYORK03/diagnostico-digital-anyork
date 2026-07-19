import { AREAS_STRIP } from "@/lib/questions";

export function AreasStrip() {
  return (
    <section className="border-y border-da-panel-border bg-da-bg-elevated">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-2 px-5 py-5 text-center sm:px-8">
        {AREAS_STRIP.map((area, i) => (
          <span key={area} className="flex items-center gap-3">
            <span className="text-[11px] font-semibold tracking-[0.16em] text-da-gray">
              {area.toUpperCase()}
            </span>
            {i < AREAS_STRIP.length - 1 && (
              <span aria-hidden className="h-1 w-1 rounded-full bg-da-green/50" />
            )}
          </span>
        ))}
      </div>
    </section>
  );
}
