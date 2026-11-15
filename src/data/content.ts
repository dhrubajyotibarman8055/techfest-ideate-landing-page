// All facts below are drawn from Techfest's official channels (techfest.org, @Techfest_IITB,
// official YouTube channel) and public coverage of the 29th/30th editions.

export const SITE = "https://techfest.org";

export const FEST = {
  edition: "30th",
  theme: "An Aetherial Renaissance",
  dates: "16–18 December 2026",
  start: "2026-12-16T09:00:00+05:30",
  end: "2026-12-18T23:59:00+05:30",
  venue: "IIT Bombay, Powai, Mumbai",
};

export const NAV = [
  { id: "about", label: "The Idea", n: "01" },
  { id: "events", label: "Competitions", n: "02" },
  { id: "domains", label: "Domains", n: "03" },
  { id: "numbers", label: "Numbers", n: "04" },
  { id: "gallery", label: "Atmosphere", n: "05" },
  { id: "join", label: "Join", n: "06" },
];

export const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/techfest_iitbombay/" },
  { label: "X / Twitter", href: "https://x.com/Techfest_IITB" },
  { label: "YouTube", href: "https://www.youtube.com/c/techfestiitbombay_youtube" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/techfest" },
];

export const TICKER = [
  "Robotics",
  "Artificial Intelligence",
  "Engineering",
  "Innovation",
  "Workshops",
  "Exhibitions",
  "Lectures",
  "Technoholix",
  "Aeromodelling",
  "Coding",
];

export const TIMELINE = [
  { year: "1998", title: "A festival is initiated", text: "Students of IIT Bombay start Techfest — a student-run, non-profit science and technology festival." },
  { year: "1999–00", title: "Technoholix is born", text: "The techno-cultural night segment launches, blending performance with stage technology." },
  { year: "2023", title: "India's first 360° EDM concert", text: "Techfest hosts India's first 360-degree EDM concert on the IIT Bombay campus." },
  { year: "2025", title: "The 29th edition", text: "“A Simulated Paradigm”: 35,000+ competition participants from 20+ countries, 22–24 December." },
  { year: "2026", title: "The 30th edition", text: "“An Aetherial Renaissance” — heritage meets futuristic technology. 16–18 December at IIT Bombay." },
];

export const VOICES = [
  "Dr. A. P. J. Abdul Kalam",
  "Jimmy Wales",
  "Amartya Sen",
  "Dr. Rakesh Sharma",
  "Sophia the Humanoid",
  "Akash Ambani",
  "S. Somnath",
];

export type EventItem = {
  key: string;
  numeral: string;
  title: string;
  tag: string;
  text: string;
  href: string;
};

export const EVENTS: EventItem[] = [
  { key: "robowars", numeral: "I", title: "International Robowars", tag: "Robotics", text: "Student-built combat machines clash in the arena. 2025 saw teams from Russia, Nepal and Sri Lanka, with a first-ever zonal in Iran.", href: `${SITE}/competitions` },
  { key: "coding", numeral: "II", title: "International Coding Challenge & World Programming Championship", tag: "Coding", text: "Competitive programming at global scale — alongside Game of Codes, the game-development contest.", href: `${SITE}/competitions` },
  { key: "aero", numeral: "III", title: "Drone Challenge & Boeing Aeromodelling", tag: "Aerospace", text: "Airframes, flight controllers and nerve. The festival's aerospace track takes to the open skies of campus.", href: `${SITE}/competitions` },
  { key: "auv", numeral: "IV", title: "Autonomous Underwater Vehicle Challenge", tag: "Aquatics", text: "Vehicles that navigate beneath the surface on their own, solving tasks without a human hand.", href: `${SITE}/competitions` },
  { key: "micromouse", numeral: "V", title: "International Micromouse Challenge", tag: "Robotics", text: "Tiny autonomous robots race through an unknown maze — a Techfest classic of speed and algorithms.", href: `${SITE}/competitions` },
  { key: "throttle", numeral: "VI", title: "International Full Throttle", tag: "RC Nitro", text: "Nitro-powered RC buggies, engineered for punishing tracks and split-second tuning.", href: `${SITE}/competitions` },
  { key: "technoholix", numeral: "VII", title: "Technoholix", tag: "Techno-cultural", text: "Three nights of music and spectacle where stage technology — lasers, mapping, robotics — meets live performance.", href: SITE },
  { key: "workshops", numeral: "VIII", title: "Flagship Workshops", tag: "Learn", text: "Hands-on, certified training across 25+ domains — from agentic AI and cybersecurity to electric vehicles.", href: `${SITE}/workshops` },
  { key: "lectures", numeral: "IX", title: "Lectures & Exhibitions", tag: "Discover", text: "Voices that shape the world on stage, and ideas you can touch on the exhibition floor — plus Ozone, the street-art carnival.", href: SITE },
];

export const DOMAINS = [
  { key: "robotics", n: "01", title: "Robotics", line: "Machines with intent", text: "Robowars, Micromouse, Roboracer, the Blixathon challenge — robots designed, built and battle-tested by students.", tags: ["Robowars", "Micromouse", "Roboracer"] },
  { key: "ai", n: "02", title: "Artificial Intelligence", line: "Minds, made", text: "From machine learning fundamentals to agentic AI — taught hands-on by industry practitioners and certified by IIT Bombay.", tags: ["Agentic AI", "Machine Learning", "Workshops"] },
  { key: "tech", n: "03", title: "Technology", line: "Signal and circuit", text: "Competitive coding, game development, IoT, cybersecurity and ethical hacking — the logic layer of the festival.", tags: ["Coding", "IoT", "Cybersecurity"] },
  { key: "eng", n: "04", title: "Engineering", line: "Force, form, flight", text: "Aeromodelling, drones, underwater vehicles and nitro RC buggies — mechanical craft pushed to its limit.", tags: ["Aeromodelling", "AUV", "Full Throttle"] },
  { key: "innovation", n: "05", title: "Innovation", line: "The new proportion", text: "Hackathons, case competitions and exhibitions where bold student ideas meet an audience of thousands.", tags: ["Hackathons", "Case Competitions", "Ideas"] },
  { key: "learn", n: "06", title: "Workshops & Exhibitions", line: "Learn it. Show it.", text: "Workshops across 25+ domains, certificates from IIT Bombay, and a campus-wide floor of live exhibits.", tags: ["25+ Domains", "Certified", "Exhibitions"] },
];

export const GALLERY = [
  { src: "https://images.pexels.com/photos/9242852/pexels-photo-9242852.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700", label: "The Workbench", sub: "Where machines are born", alt: "Two engineers working on robotic equipment" },
  { src: "https://images.pexels.com/photos/3212449/pexels-photo-3212449.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800", label: "The Heritage", sub: "Proportion, perfected", alt: "Renaissance marble statue" },
  { src: "https://images.pexels.com/photos/38780318/pexels-photo-38780318.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=900&w=700", label: "The Night", sub: "Technoholix energy", alt: "Night concert with stage lights and a crowd" },
  { src: "https://images.pexels.com/photos/5555813/pexels-photo-5555813.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=900&w=800", label: "The Skies", sub: "Drones & aeromodelling", alt: "White drone flying under a blue sky" },
  { src: "https://images.pexels.com/photos/6424590/pexels-photo-6424590.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=900&w=700", label: "The Code", sub: "Thirty-six hours, no sleep", alt: "Code on a laptop screen" },
  { src: "https://images.pexels.com/photos/31129059/pexels-photo-31129059.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=900&w=700", label: "The Stage", sub: "Lectures that move people", alt: "Speaker on stage facing a large audience" },
  { src: "https://images.pexels.com/photos/36169774/pexels-photo-36169774.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=900&w=700", label: "The Circuit", sub: "Engineering, up close", alt: "Microchips on a circuit board" },
];
