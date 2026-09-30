import { SectionLabel } from "@/components/ui/SectionLabel";
import { stack } from "@/data/stack";

export function Stack() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="px-gutter border-t border-line py-[clamp(6rem,12vw,10rem)]">
      <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-8">
        <SectionLabel className="lg:col-span-12">Stack</SectionLabel>
        <h2 id="stack-title" data-reveal="" className="text-heading lg:col-span-8">
          Tools I use in real projects
        </h2>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3 lg:grid-cols-5">
        {stack.map((group) => (
          <div key={group.label} data-reveal="" className="stack-group border-t border-line pt-5">
            <p className="text-label text-muted">{group.index}</p>
            <h3 className="text-label mt-1">{group.label}</h3>
            <ul className="mt-6 space-y-2 text-lg tracking-tight">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
