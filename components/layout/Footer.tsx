import { profile } from "@/data/profile";
import { LocalTime } from "./LocalTime";

export function Footer() {
  return (
    <footer className="px-gutter border-t border-line py-10">
      <div className="text-label grid grid-cols-2 gap-x-8 gap-y-8 text-muted lg:grid-cols-4">
        <div>
          <p className="text-fg">{profile.name}</p>
          <p>{profile.role}</p>
        </div>
        <div>
          <p>
            {profile.location.city} / {profile.location.country}
          </p>
        </div>
        <div>
          <p>Current local time</p>
          <p className="text-fg tabular-nums">
            <LocalTime />
          </p>
        </div>
        <div className="lg:text-right">
          <p>Built with Next.js</p>
          <p>{new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
