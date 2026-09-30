import { ArrowLink } from "@/components/ui/ArrowLink";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { profile } from "@/data/profile";

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "GitHub", value: "github.com/Kazxye", href: profile.links.github },
  { label: "LinkedIn", value: "in/kazystatarunas", href: profile.links.linkedin },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="px-gutter border-t border-line py-[clamp(7rem,14vw,12rem)]">
      <SectionLabel index="004">Contact</SectionLabel>
      <h2 id="contact-title" data-reveal="" className="text-display mt-10">
        <span className="block">Let&apos;s build</span>
        <span className="block">something.</span>
      </h2>

      <div data-reveal="" className="mt-20 grid grid-cols-1 lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-7">
          <dl className="border-t border-line">
            {channels.map((channel) => (
              <div key={channel.label} className="contact-channel grid grid-cols-1 gap-1 border-b border-line py-5 sm:grid-cols-[6.5rem_1fr] sm:items-baseline sm:gap-4">
                <dt className="text-label text-muted">{channel.label}</dt>
                <dd className="min-w-0 break-words text-lg tracking-tight sm:text-xl">
                  <ArrowLink href={channel.href}>{channel.value}</ArrowLink>
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-8">
            <CopyEmailButton email={profile.email} />
          </div>
        </div>
      </div>
    </section>
  );
}
