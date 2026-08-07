import Link from "next/link";
import { Aperture, Phone, Mail, ArrowUpRight } from "lucide-react";
import InstagramIcon from "./icons/InstagramIcon";
import { BRAND } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper pt-20 md:pt-28 pb-10">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid md:grid-cols-[1.3fr_0.7fr_0.7fr_1fr] gap-12 md:gap-8 pb-16 border-b border-paper/10">
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <Aperture className="w-7 h-7 text-brass-light" strokeWidth={1.4} />
              <span className="font-display text-xl">{BRAND.name}</span>
            </Link>
            <p className="text-paper/60 max-w-xs leading-relaxed">{BRAND.tagline}</p>
          </div>

          <div>
            <p className="reel-eyebrow text-brass-light mb-4">Studio</p>
            <ul className="space-y-2 text-paper/70">
              <li><Link href="/about" className="hover:text-paper transition-colors">About</Link></li>
              <li><Link href="/services" className="hover:text-paper transition-colors">Services</Link></li>
              <li><Link href="/work" className="hover:text-paper transition-colors">Work</Link></li>
              <li><Link href="/contact" className="hover:text-paper transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="reel-eyebrow text-brass-light mb-4">Follow</p>
            <ul className="space-y-2 text-paper/70">
              <li>
                <a
                  href={BRAND.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-paper transition-colors"
                >
                  <InstagramIcon className="w-4 h-4" /> {BRAND.instagramHandle}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="reel-eyebrow text-brass-light mb-4">Get in touch</p>
            <ul className="space-y-3 text-paper/70">
              <li>
                <a href={`tel:+91${BRAND.phone}`} className="flex items-center gap-2 hover:text-paper transition-colors">
                  <Phone className="w-4 h-4" /> {BRAND.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2 hover:text-paper transition-colors">
                  <Mail className="w-4 h-4" /> {BRAND.email}
                </a>
              </li>
            </ul>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brass text-ink px-5 py-2.5 text-sm font-medium hover:bg-brass-light transition-colors"
            >
              Start a project <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-paper/40">
          <p>&copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <p>{BRAND.location}</p>
        </div>
      </div>
    </footer>
  );
}
