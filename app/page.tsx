"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "9195c497-7c84-430e-94fe-c09c701f1bb6",
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `New message from ${form.name} via rhettmcbrayer.com`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setFormStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <>
      {/* ── NAV ───────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between px-6 py-4">
          <span className="text-lg font-bold tracking-widest uppercase text-amber-400">
            Rhett McBrayer
          </span>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium tracking-wide text-zinc-300">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#gallery" className="hover:text-white transition-colors">Gallery</a>
            <a href="#shows" className="hover:text-white transition-colors">Shows</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            <a
              href="https://www.instagram.com/rhettmcbrayer"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rhett McBrayer on Instagram"
              className="text-zinc-400 hover:text-amber-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
          </div>

          {/* Hamburger button — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center gap-1.5 p-2 -mr-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col px-6 pb-5 pt-1 gap-5 text-sm font-medium tracking-wide text-zinc-300 border-t border-white/10">
            <a href="#about"   onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">About</a>
            <a href="#gallery" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">Gallery</a>
            <a href="#shows"   onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">Shows</a>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">Contact</a>
            <a
              href="https://www.instagram.com/rhettmcbrayer"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-amber-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
              Instagram
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative h-screen w-full overflow-hidden">
        <Image
          src="/images/gig-4.jpg"
          alt="Rhett McBrayer performing live"
          fill
          className="object-cover object-top"
          priority
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-amber-400 text-sm font-semibold tracking-[0.3em] uppercase mb-4">
            Guitarist · Vocalist
          </p>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tight leading-none mb-6 drop-shadow-lg">
            Rhett<br />McBrayer
          </h1>
          <p className="text-zinc-300 text-lg md:text-xl max-w-md mb-10">
            Live music. Real energy.
          </p>
          <a
            href="#contact"
            className="px-8 py-3 bg-amber-400 text-black font-bold text-sm tracking-widest uppercase rounded-full hover:bg-amber-300 transition-colors"
          >
            Book a Show
          </a>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-400">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-zinc-400 to-transparent" />
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────── */}
      <section id="about" className="py-24 px-6 md:px-16 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-amber-400 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              About
            </p>
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 leading-tight">
              The Sound of<br />Something Real
            </h2>
            <div className="space-y-4 text-zinc-300 text-base leading-relaxed">
              <p>
                Rhett McBrayer is a guitarist and vocalist who brings raw energy and
                heart to every stage. Whether he's leading The Banqs through a packed
                outdoor set or performing solo, Rhett's sound is immediately his own —
                warm, live, and always in the moment.
              </p>
              <p>
                Based in the South, Rhett plays a mix of original music and
                crowd-favorites that keep dance floors moving and audiences coming back
                for more.
              </p>
              <p>
                Available for festivals, private events, venues, and more.
              </p>
            </div>
          </div>
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="/images/gig-2.jpg"
              alt="Rhett McBrayer singing on stage"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── GALLERY ──────────────────────────────────────────────── */}
      <section id="gallery" className="py-24 px-6 md:px-16 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <p className="text-amber-400 text-xs font-semibold tracking-[0.3em] uppercase mb-4 text-center">
            Gallery
          </p>
          <h2 className="text-4xl md:text-5xl font-black uppercase text-center mb-12 leading-tight">
            Live & In Person
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative h-72 sm:h-80 rounded-xl overflow-hidden">
              <Image src="/images/gig-1.jpg" alt="Rhett McBrayer live performance" fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="relative h-72 sm:h-80 rounded-xl overflow-hidden">
              <Image src="/images/gig-2.jpg" alt="Rhett McBrayer on stage" fill className="object-cover object-top hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="relative h-72 sm:h-80 rounded-xl overflow-hidden">
              <Image src="/images/gig-3.jpg" alt="Rhett McBrayer performing" fill className="object-cover object-[center_75%] hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="relative h-72 sm:h-80 rounded-xl overflow-hidden">
              <Image src="/images/gig-4.jpg" alt="Rhett McBrayer guitar close-up" fill className="object-cover object-[center_30%] hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="relative h-72 sm:h-96 rounded-xl overflow-hidden sm:col-span-2">
              <Image src="/images/gig-5.jpg" alt="The Banqs performing live" fill className="object-cover object-center hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* ── UPCOMING SHOWS ───────────────────────────────────────── */}
      <section id="shows" className="py-24 px-6 md:px-16 max-w-6xl mx-auto">
        <p className="text-amber-400 text-xs font-semibold tracking-[0.3em] uppercase mb-4 text-center">
          Live
        </p>
        <h2 className="text-4xl md:text-5xl font-black uppercase text-center mb-12 leading-tight">
          Upcoming Shows
        </h2>
        <div className="border border-white/10 rounded-2xl overflow-hidden">
          {/* Placeholder shows — update as gigs are confirmed */}
          <div className="p-8 text-center text-zinc-500">
            <p className="text-lg">More shows coming soon.</p>
            <p className="text-sm mt-2">
              Follow along or{" "}
              <a href="#contact" className="text-amber-400 hover:text-amber-300 underline underline-offset-2">
                reach out to book Rhett
              </a>{" "}
              for your event.
            </p>
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────── */}
      <section id="contact" className="py-24 px-6 md:px-16 bg-zinc-950">
        <div className="max-w-2xl mx-auto">
          <p className="text-amber-400 text-xs font-semibold tracking-[0.3em] uppercase mb-4 text-center">
            Contact
          </p>
          <h2 className="text-4xl md:text-5xl font-black uppercase text-center mb-4 leading-tight">
            Book Rhett
          </h2>
          <p className="text-zinc-400 text-center mb-12">
            Inquiries for gigs, events, and collaborations welcome.
          </p>

          {formStatus === "sent" ? (
            <div className="text-center py-12">
              <p className="text-2xl font-bold text-amber-400 mb-2">Message sent!</p>
              <p className="text-zinc-400">Rhett will be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                  placeholder="Tell Rhett about your event, venue, or collaboration idea..."
                />
              </div>
              {formStatus === "error" && (
                <p className="text-red-400 text-sm">
                  Something went wrong. Email Rhett directly at{" "}
                  <a href="mailto:rhett@rhettmcbrayer.com" className="underline">
                    rhett@rhettmcbrayer.com
                  </a>
                </p>
              )}
              <button
                type="submit"
                disabled={formStatus === "sending"}
                className="w-full py-4 bg-amber-400 text-black font-bold text-sm tracking-widest uppercase rounded-xl hover:bg-amber-300 disabled:opacity-50 transition-colors"
              >
                {formStatus === "sending" ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="py-10 text-center text-zinc-600 text-sm border-t border-white/5">
        <div className="flex justify-center mb-5">
          <a
            href="https://www.instagram.com/rhettmcbrayer"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Rhett McBrayer on Instagram"
            className="text-zinc-500 hover:text-amber-400 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
          </a>
        </div>
        <p>© {new Date().getFullYear()} Rhett McBrayer. All rights reserved.</p>
      </footer>
    </>
  );
}
