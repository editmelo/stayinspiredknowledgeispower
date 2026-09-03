/**
 * Single source of truth for site copy and data.
 * Miriam can hand this file to a developer to update the site without touching layout.
 */

export const org = {
  name: "Stay Inspired Knowledge Is Power LLC",
  shortName: "Stay Inspired Knowledge Is Power",
  founder: "Miriam D. Rivera",
  verse: "Happy is the man who finds wisdom, and the man who gains understanding.",
  verseRef: "Proverbs 3:13",
  email: "love.inspiresfaith@gmail.com",
  region: "Indiana",
  legacyStore: "https://www.stayinspiredknowledgeispower.com/shop",
  legacyDonate: "https://www.stayinspiredknowledgeispower.com",
  credit: { label: "Edit Me Lo", href: "https://www.editmelo.com" },
  socials: [
    {
      label: "Facebook",
      icon: "facebook",
      href: "https://www.facebook.com/StayInspiredKnowledgeIsPower",
    },
    {
      label: "Instagram",
      icon: "instagram",
      href: "https://www.instagram.com/getfitwmiriam/",
    },
    {
      label: "LinkedIn",
      icon: "linkedin",
      href: "https://www.linkedin.com/in/miriam-d-rivera-158a2b350/",
    },
  ] as const,
};

export const mission = {
  statement:
    "Stay Inspired Knowledge Is Power LLC promotes mental health, shares ways to break the stigma, and gives students and families real mental health and substance use resources — while inspiring people through art, fashion, design, inspirational quotes and motivational video.",
  pledge:
    "A portion of all proceeds goes into the William Rivera Memorial Scholarship Fund, helping high school, college and trade students pay for tuition and educational expenses.",
  vision:
    "My vision is fast-paced, forward-thinking, and fashion-centered at its core, and all of my products reflect these ideals.",
};

/** Ordered by the five service buckets, most important first. */
export const buckets = [
  {
    n: "Swag",
    title: "The collection",
    href: "/shop",
    blurb: "Shirts, aprons, tumblers and bracelets that start the conversation — and fund the scholarship.",
  },
  {
    n: "Speaking",
    title: "Miriam dr. Speaks",
    href: "/speaking",
    blurb: "Lived experience and a child welfare background, brought to schools and youth programs.",
  },
  {
    n: "Education",
    title: "Learn",
    href: "/learn",
    blurb: "How addiction happens, explained by a mother who lost her son to substance use.",
  },
  {
    n: "Scholarship",
    title: "William Rivera Memorial Fund",
    href: "/scholarship",
    blurb: "For students who grew up with a parent affected by mental illness or substance use.",
  },
  {
    n: "Resources",
    title: "Get help now",
    href: "/resources",
    blurb: "Crisis lines, provider search by ZIP code, and Indiana-specific support.",
  },
];

export type Product = {
  slug: string;
  name: string;
  price: number;
  category: "Shirts" | "Aprons" | "Drinkware" | "Bracelets";
  image: string;
  /** Second colourway, where a product has one. */
  altImage?: string;
  note: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: "music-is-my-therapy",
    name: "Music Is My Therapy",
    price: 30,
    category: "Shirts",
    image: "/products/music-is-my-therapy.jpg",
    note: "The flagship. Four words most people have never said out loud.",
    featured: true,
  },
  {
    slug: "rock-out-tshirt",
    name: "Rock Out for Mental Health T-shirt",
    price: 30,
    category: "Shirts",
    image: "/products/rock-out-tshirt.jpg",
    note: "Front and back. Mental health matters, printed where people read it.",
    featured: true,
  },
  {
    slug: "mental-health-apron",
    name: "Mental Health Apron",
    price: 25,
    category: "Aprons",
    image: "/products/mental-health-apron.jpg",
    note: "Red, black or blue. Built for people who feed a crowd.",
    featured: true,
  },
  {
    slug: "rock-out-tumbler",
    name: "Rock Out for Mental Health Tumbler",
    price: 25,
    category: "Drinkware",
    image: "/products/rock-out-tumbler.jpg",
    note: "Goes to work, to class, and to the conversation.",
    featured: true,
  },
  {
    slug: "mental-health-bracelet",
    name: "Mental Health Bracelet",
    price: 5,
    category: "Bracelets",
    image: "/products/mental-health-bracelet.jpg",
    note: "Hope. Courage. Fight. Five dollars, worn every day.",
    featured: true,
  },
  {
    slug: "piano-keys-tee",
    name: "Piano Keys Tee",
    /* TODO price unconfirmed — matched to the other full-front prints. */
    price: 30,
    category: "Shirts",
    image: "/products/piano-keys-tee-black.jpg",
    altImage: "/products/piano-keys-tee-white.jpg",
    note: "A keyboard mid-run, notes coming off it. In black or white.",
    featured: true,
  },
  {
    slug: "music-healing-tee",
    name: "Music Healing Tee",
    price: 25,
    category: "Shirts",
    image: "/products/music-healing-tee.jpg",
    note: "Healing through music, on white.",
  },
  {
    slug: "winged-guitar-tee",
    name: "Winged Guitar Tee",
    price: 25,
    category: "Shirts",
    image: "/products/winged-guitar-tee.jpg",
    note: "Roses, wings and a guitar — the design people stop to ask about.",
    featured: true,
  },
  {
    slug: "music-tee-black",
    name: "Music Tee Black",
    price: 25,
    category: "Shirts",
    image: "/products/music-tee-black.jpg",
    note: "One note, clean and loud.",
  },
  {
    slug: "music-tee-white",
    name: "Music Tee White",
    price: 25,
    category: "Shirts",
    image: "/products/music-tee-white.jpg",
    note: "The same note, inverted.",
  },
  {
    slug: "black-on-black-music-note",
    name: "Black on Black Music Note",
    price: 25,
    category: "Shirts",
    image: "/products/black-on-black-music-note.jpg",
    note: "Texture on texture. Reads up close.",
  },
];

export const categories = [
  { name: "Shirts", from: 25, count: 7, image: "/products/music-is-my-therapy.jpg" },
  { name: "Aprons", from: 25, count: 1, image: "/products/mental-health-apron.jpg" },
  { name: "Drinkware", from: 25, count: 1, image: "/products/rock-out-tumbler.jpg" },
  { name: "Bracelets", from: 5, count: 1, image: "/products/mental-health-bracelet.jpg" },
];

/**
 * The memorial section on /about.
 *
 * `copy` is PLACEHOLDER TEXT. Miriam is writing this herself — replace both
 * paragraphs before launch and delete this note. Nothing here invents
 * anything about William beyond what the photographs show.
 */
export const william = {
  name: "William Rivera",
  eyebrow: "In memory",
  heading: "Her father, and the reason there is a fund",
  copy: [
    "Miriam is writing this part herself — her father's story, in her words.",
    "This is a placeholder so the section can be built and reviewed. It is not finished copy.",
  ],
  photos: [
    { src: "/photos/william/william-at-work.jpg", alt: "William Rivera at work, seated in uniform", position: "center" },
    { src: "/photos/william/william-chef-clipping.jpg", alt: "William Rivera in chef's whites, in a newspaper clipping", position: "top" },
    { src: "/photos/william/william-kitchen.jpg", alt: "William Rivera in a kitchen with family", position: "center" },
    { src: "/photos/william/william-at-home.jpg", alt: "William Rivera at home", position: "center" },
    { src: "/photos/william/william-young.jpg", alt: "William Rivera as a young man", position: "center" },
    { src: "/photos/william/family-portrait.jpg", alt: "A Rivera family portrait", position: "center" },
    { src: "/photos/william/graveside.jpg", alt: "The Rivera family gathered at William's graveside", position: "center" },
  ],
};

export const speaking = {
  brand: "Miriam dr. Speaks",
  tagline: "Positivity in Practice. Mental Health in Focus.",
  /* Her own words, from the bookmark she hands out at engagements. */
  mission:
    "Empowering youth ages 12–18 by teaching mental health awareness and equipping them with evidence-informed tools to practice positivity, strengthen resilience, and improve overall well-being.",
  closing: "Let's work together to empower youth and create lasting impact.",
  entity: "Miriam dr. Speaks, LLC",
  email: "miriamdr.speaks@gmail.com",
  phone: "317-912-5815",
  phoneHref: "+13179125815",
  /* Miriam takes booking requests through this form rather than by email. */
  bookingForm:
    "https://docs.google.com/forms/d/e/1FAIpQLScBgxFBDrOHV3Htczq8dN1kD2Jyx5bAI9e624mGa8TJml2aiw/viewform?usp=header",
  lede:
    "Miriam talks to students about mental illness and substance use the way almost no one does — as the family member, not the textbook.",
  status: "Now booking first engagements for the 2026–27 school year.",
  credibility: [
    {
      label: "Lived experience",
      body: "Miriam speaks as a daughter, about what mental illness and addiction actually look like inside a home. Students recognize it immediately.",
    },
    {
      label: "Child welfare background",
      body: "Years of work in Indiana child welfare shape how she talks to young people, and to the adults responsible for them.",
    },
    {
      label: "She built something with it",
      body: "The talk is not where it ends. Miriam turned the same story into a company, a clothing line and a scholarship that has already paid a student's way — students can see the difference between advice and evidence.",
    },
  ],
  /* The four she names on the bookmark, in her order. */
  audiences: [
    "School visits",
    "After school programs",
    "Workshops",
    "Summer camps",
  ],
  topics: [
    {
      title: "How addiction happens",
      body: "What the brain is actually doing, why willpower is the wrong frame, and how a family ends up here.",
    },
    {
      title: "Breaking the stigma out loud",
      body: "The language that keeps people silent, and practical ways students and staff can change it this week.",
    },
    {
      title: "Growing up with a parent who is struggling",
      body: "For the students carrying something heavy at home, and the adults who want to help but don't know what to say.",
    },
    {
      title: "Turning grief into purpose",
      body: "How a memorial scholarship, a clothing line and a message came out of the worst thing that ever happened.",
    },
  ],
};

export const education = {
  videoId: "HDfSx_Q7_Yk",
  videoTitle: "How Addiction Happens",
  lede:
    "Start here. One video, made by a mother who lost her son to substance use, for families trying to understand what they are looking at.",
  points: [
    {
      label: "Addiction is not a character flaw",
      body: "It changes how the brain values reward, risk and relief. Understanding the mechanism is what makes it possible to respond instead of blame.",
    },
    {
      label: "Stigma is the reason people wait",
      body: "Most families lose time to shame before they lose it to the illness. Naming it plainly is the first intervention.",
    },
    {
      label: "Families need scripts, not slogans",
      body: "What to say, who to call, what to expect. That is the gap this material is built to close.",
    },
  ],
};

export const scholarship = {
  name: "William Rivera Memorial Scholarship Fund",
  award: 600,
  recipientsToDate: 1,
  lede:
    "The fund exists so that a student whose parent lives with mental illness or substance use disorder does not lose their education to it too.",
  eligibility: [
    "Currently enrolled or accepted at a high school, college, university or trade program",
    "Has a parent diagnosed with a mental illness or a substance use disorder",
    "Applying toward tuition or documented educational expenses",
  ],
  use: [
    "Tuition",
    "Books and course materials",
    "Tools, equipment and program fees",
    "Testing and certification costs",
  ],
};

export type ResourceGroup = {
  id: string;
  title: string;
  blurb: string;
  items: { name: string; detail: string; href?: string; tel?: string }[];
};

export const resourceGroups: ResourceGroup[] = [
  {
    id: "crisis",
    title: "If this is a crisis",
    blurb: "Free, confidential, 24 hours a day. You do not need a diagnosis to call.",
    items: [
      {
        name: "988 Suicide & Crisis Lifeline",
        detail: "Call or text 988. Chat at 988lifeline.org.",
        href: "https://988lifeline.org/",
        tel: "988",
      },
      {
        name: "Crisis Text Line",
        detail: "Text HOME to 741741 to reach a trained crisis counselor.",
        href: "https://www.crisistextline.org/",
        tel: "741741",
      },
      {
        name: "SAMHSA National Helpline",
        detail: "1-800-662-HELP (4357). Treatment referral and information, in English and Spanish.",
        href: "https://www.samhsa.gov/find-help/national-helpline",
        tel: "18006624357",
      },
      {
        name: "Veterans Crisis Line",
        detail: "Dial 988 then press 1, or text 838255.",
        href: "https://www.veteranscrisisline.net/",
      },
    ],
  },
  {
    id: "find-care",
    title: "Find treatment and providers",
    blurb: "Search by ZIP code for mental health and substance use care near you.",
    items: [
      {
        name: "FindTreatment.gov",
        detail: "SAMHSA's official locator for substance use and mental health treatment facilities.",
        href: "https://findtreatment.gov/",
      },
      {
        name: "FindSupport.gov",
        detail: "A guided walkthrough for people who are not sure what kind of help they need yet.",
        href: "https://www.findsupport.gov/",
      },
      {
        name: "NIMH Help for Mental Illnesses",
        detail: "How to find a provider, what to ask, and what to expect from treatment.",
        href: "https://www.nimh.nih.gov/health/find-help",
      },
      {
        name: "Mental Health America screening tools",
        detail: "Free, anonymous screenings for depression, anxiety, and more — a place to start before an appointment.",
        href: "https://screening.mhanational.org/screening-tools/",
      },
    ],
  },
  {
    id: "indiana",
    title: "Indiana support",
    blurb: "State and local help for Hoosier families.",
    items: [
      {
        name: "Indiana 211",
        detail: "Dial 211 for local help with treatment, food, housing, utilities and childcare.",
        href: "https://www.in.gov/211/",
        tel: "211",
      },
      {
        name: "Be Well Indiana",
        detail: "Indiana's mental wellness hub, including crisis resources and local services.",
        href: "https://bewellindiana.com/",
      },
      {
        name: "Indiana Division of Mental Health and Addiction",
        detail: "State-funded treatment programs, community mental health centers and recovery services.",
        href: "https://www.in.gov/fssa/dmha/",
      },
      {
        name: "NextLevel Recovery Indiana",
        detail: "Indiana's substance use response, including naloxone access and treatment locators.",
        href: "https://www.in.gov/recovery/",
      },
    ],
  },
  {
    id: "families",
    title: "For families and young people",
    blurb: "Support built specifically for the people around someone who is struggling.",
    items: [
      {
        name: "NAMI HelpLine",
        detail: "1-800-950-NAMI (6264), or text 62640. Peer support and navigation for families.",
        href: "https://www.nami.org/help",
        tel: "18009506264",
      },
      {
        name: "NACoA — National Association for Children of Addiction",
        detail: "Resources written for kids and teens with a parent affected by addiction.",
        href: "https://nacoa.org/",
      },
      {
        name: "Alateen and Al-Anon",
        detail: "Peer meetings for young people and family members affected by someone else's drinking.",
        href: "https://al-anon.org/newcomers/teen-corner-alateen/",
      },
      {
        name: "SAMHSA — Talking with your child",
        detail: "Age-by-age guidance for conversations about alcohol and other drugs.",
        href: "https://www.samhsa.gov/talk-they-hear-you",
      },
    ],
  },
];

/* Logo is used with permission and shown unaltered, on a light ground —
   the wordmark is near-black and would disappear on the site's dark sections. */
export const partners = {
  eyebrow: "Proud supporting partner",
  note: "Stay Inspired Knowledge Is Power is proud to count the Indianapolis Urban League among its supporting partners.",
  list: [
    {
      name: "Indianapolis Urban League",
      logo: "/partners/indianapolis-urban-league.png",
      width: 250,
      height: 88,
      href: "https://indplsul.org/",
    },
  ],
};

export const nav = [
  { label: "Shop", href: "/shop" },
  { label: "Speaking", href: "/speaking" },
  { label: "Learn", href: "/learn" },
  { label: "Scholarship", href: "/scholarship" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
];
