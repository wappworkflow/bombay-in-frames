export const BRAND = {
  name: "Bombay In Frames",
  tagline: "We don't just shoot. We build legacies.",
  phone: "7021358565",
  phoneDisplay: "+91 70213 58565",
  whatsapp: "https://wa.me/917021358565",
  instagram: "https://www.instagram.com/bombayinframes",
  instagramHandle: "@bombayinframes",
  email: "hello@bombayinframes.studio",
  location: "Mumbai, India — shooting everywhere",
};

export type Service = {
  n: string;
  title: string;
  strap: string;
  copy: string;
  points: string[];
  image: string;
};

export const SERVICES: Service[] = [
  {
    n: "01",
    title: "Production House",
    strap: "Vision, shot and cut.",
    copy: "End-to-end film production for brands — concept, direction, shoot and post. Ad films, brand documentaries and product stories, made to be watched, not skipped.",
    points: ["Brand films & TVCs", "Product & fashion shoots", "Direction & cinematography", "Colour grading & post"],
    image: "https://picsum.photos/seed/bif-production-house/1400/1750",
  },
  {
    n: "02",
    title: "Marketing & Social",
    strap: "A voice, kept consistent.",
    copy: "Full social media handling and management — from content calendars to community replies — so your brand shows up the same way, every single day.",
    points: ["Content calendars", "Social media handling", "Community management", "Platform strategy"],
    image: "https://picsum.photos/seed/bif-social-media/1400/1750",
  },
  {
    n: "03",
    title: "Performance Marketing",
    strap: "Paid, and accountable.",
    copy: "Paid advertising run like a discipline, not a guess — media planning, audience targeting and creative built around what actually converts.",
    points: ["Paid social & search", "Performance-led creative", "Targeting & retargeting", "Reporting & iteration"],
    image: "https://picsum.photos/seed/bif-performance-ads/1400/1750",
  },
  {
    n: "04",
    title: "Web & App Development",
    strap: "A home for the story.",
    copy: "Fast, cinematic websites and apps that hold everything the production made — built to feel like the brand, not a template of it.",
    points: ["Marketing websites", "Web apps", "3D & scroll experiences", "Ongoing builds & support"],
    image: "https://picsum.photos/seed/bif-web-development/1400/1750",
  },
];

export const VALUES = [
  { title: "Vision", copy: "Every project starts with a point of view worth pointing a camera at." },
  { title: "Story", copy: "We plan the arc before the shot list — a brand film is still a film." },
  { title: "Emotion", copy: "Numbers move budgets; feeling moves people. We build for both." },
];

export const TIMELINE = [
  { n: "01", year: "Reel One", title: "The production house", copy: "Bombay In Frames opens as a lean crew for brand films and ad shoots across Mumbai." },
  { n: "02", year: "Reel Two", title: "The studio grows up", copy: "Social media handling and performance marketing join the roster — one brief, one team." },
  { n: "03", year: "Reel Three", title: "Building the web", copy: "A development arm launches to give every campaign a home that matches its craft." },
  { n: "04", year: "Reel Four", title: "One roof, four reels", copy: "Today: production, marketing, performance and web, run as a single studio." },
];

export const PROCESS = [
  { n: "01", title: "Frame it", copy: "We learn the brand — audience, tone, goal — before a single shot or line of code." },
  { n: "02", title: "Shoot / Build", copy: "Production and development run in parallel, checked against the same brief throughout." },
  { n: "03", title: "Cut / Ship", copy: "Edit, grade and launch — every asset arrives ready to run across channels." },
  { n: "04", title: "Track it", copy: "We watch performance after launch and keep tuning what the numbers ask for." },
];

export type WorkItem = {
  title: string;
  tag: string;
  image: string;
};

export const WORK: WorkItem[] = [
  { title: "Kaveri Living", tag: "Brand Film · Real Estate", image: "https://picsum.photos/seed/bif-work-kaveri/1200/1500" },
  { title: "Noor Jewels", tag: "Campaign · Retail", image: "https://picsum.photos/seed/bif-work-noor/1200/1500" },
  { title: "Verve Athletics", tag: "Social + Performance", image: "https://picsum.photos/seed/bif-work-verve/1200/1500" },
  { title: "Standard & Co.", tag: "Web Development", image: "https://picsum.photos/seed/bif-work-standard/1200/1500" },
  { title: "Saffron Table", tag: "Brand Film · F&B", image: "https://picsum.photos/seed/bif-work-saffron/1200/1500" },
  { title: "Aura Skincare", tag: "Product Shoot · Beauty", image: "https://picsum.photos/seed/bif-work-aura/1200/1500" },
  { title: "Harbourline", tag: "Documentary · Hospitality", image: "https://picsum.photos/seed/bif-work-harbour/1200/1500" },
];

export const STATS = [
  { n: "80+", label: "Films & campaigns produced" },
  { n: "40+", label: "Brands under management" },
  { n: "12", label: "Cities we've shot in" },
  { n: "3.5x", label: "Average lift in paid results" },
];

export const FAQ: { keys: string[]; answer: string }[] = [
  {
    keys: ["service", "services", "offer", "do you"],
    answer:
      "We run four reels under one roof — Production House, Marketing & Social, Performance Marketing, and Web & App Development. Want details on any one of them?",
  },
  {
    keys: ["price", "cost", "budget", "quote", "charge"],
    answer:
      "Every brief is scoped separately — send us a line on the project via the contact form or WhatsApp and we'll get back with a quote within a working day.",
  },
  {
    keys: ["contact", "phone", "number", "call", "reach"],
    answer: `You can call or WhatsApp us at ${BRAND.phoneDisplay}, or use the contact form on this site.`,
  },
  {
    keys: ["instagram", "insta", "social handle", "reel", "follow"],
    answer: `We're @bombayinframes on Instagram — ${BRAND.instagram}. Come say hi.`,
  },
  {
    keys: ["location", "mumbai", "where", "based", "city"],
    answer: "We're based in Mumbai and shoot anywhere the brief takes us.",
  },
  {
    keys: ["hello", "hi", "hey"],
    answer: "Hey there! I'm Frame, the studio's assistant. Ask me about our services, pricing, or how to reach the team.",
  },
];

export const FAQ_FALLBACK =
  "Good question — for anything specific, the fastest answer comes from the team directly. Drop us a line on the contact page or WhatsApp us and we'll roll camera on it.";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Bombay In Frames didn't just shoot our launch film — they understood the brand faster than most people on our own team. The final cut felt like us, only sharper.",
    name: "Rhea Kapoor",
    role: "Founder, Kaveri Living",
  },
  {
    quote:
      "We handed them production and social together and finally stopped seeing two different brands depending on the channel. One roof, one voice, real results.",
    name: "Arjun Mehta",
    role: "Marketing Lead, Verve Athletics",
  },
  {
    quote:
      "The performance team treats every rupee like it's their own. Cost-per-lead dropped within the first month and the creative never felt like an afterthought.",
    name: "Simran Oberoi",
    role: "Growth, Noor Jewels",
  },
  {
    quote:
      "Our new site loads like a film, not a template. Clients comment on it unprompted, which is not something anyone has ever said about our old website.",
    name: "Devansh Rao",
    role: "Director, Standard & Co.",
  },
];

export type FaqItem = { q: string; a: string };

export const SITE_FAQ: FaqItem[] = [
  {
    q: "What does Bombay In Frames actually do?",
    a: "Four things, under one roof: film production, marketing & social handling, performance marketing, and web & app development. Most clients start with one reel and expand once they see how the others connect.",
  },
  {
    q: "Do you work with brands outside Mumbai?",
    a: "Yes — we're based in Mumbai but shoot and run campaigns wherever the brief takes us, across India and occasionally beyond.",
  },
  {
    q: "How is pricing structured?",
    a: "Every brief is scoped on its own — production day rates, retained monthly marketing, or performance budgets with a management fee. Send us the details and we'll return a clear quote within a working day.",
  },
  {
    q: "How long does a typical brand film take?",
    a: "From first call to final cut, most brand films take 3–5 weeks: a week for concept and pre-production, 1–2 shoot days, and 1–2 weeks of post and revisions.",
  },
  {
    q: "Can you take over an existing social or ad account mid-flight?",
    a: "Regularly. We start with a short audit of what's working before touching anything, so nothing that's already performing gets disrupted.",
  },
];

