/**
 * Southern California buyer content (client-supplied, "Yala Realty website Updates Rev1").
 */
import type { County } from "@/lib/newHomeSearch";

export interface IntroSection {
  icon: "sun" | "wave" | "briefcase" | "masks" | "home";
  title: string;
  body: string;
  /** Rendered with the lead-in bolded, e.g. "Coastal Living: Miles of…" */
  points?: Array<[string, string]>;
}

export const SOCAL_INTRO: IntroSection[] = [
  {
    icon: "sun",
    title: "The Ultimate Weather and Wellness Lifestyle",
    body:
      "Moving to Southern California means trading winters for nearly 300 days of sunshine a year. SoCal's legendary Mediterranean climate features low humidity, warm summers, and exceptionally mild winters. This flawless weather fosters an active, outdoor-centric lifestyle where healthy living happens naturally. Whether your passion is morning beach walks, weekend hiking, golfing, or dining al fresco under the stars, SoCal allows you to live life outside year-round.",
  },
  {
    icon: "wave",
    title: "From the Ocean to the Mountains in One Day",
    body:
      "SoCal offers one of the most geographically diverse landscapes in the world. It is one of the few places on earth where you can surf in the morning and snowboard in the afternoon.",
    points: [
      ["Coastal Living", "Miles of pristine, world-famous beaches along the Pacific Coast."],
      ["Mountain Escapes", "Snow-capped peaks, pine forests, and alpine lakes just a short drive inland."],
      ["Desert Retreats", "Stunning, sun-drenched resort oases like the Coachella Valley."],
    ],
  },
  {
    icon: "briefcase",
    title: "A Dynamic and Diverse Global Economy",
    body:
      "Beyond the vacation vibe, Southern California is an economic powerhouse offering boundless career opportunities. It is a massive hub for global innovation, featuring robust job markets across a wide variety of industries:",
    points: [
      ["Innovation & Tech", "Rapidly growing tech ecosystems like “Silicon Beach” and Irvine."],
      ["Biomedical & Science", "World-class biotech and medical research hubs in San Diego."],
      ["Aerospace & Trade", "Major defense, aerospace manufacturing, and the busiest ports in North America."],
      ["Entertainment & Media", "The undisputed global capital for film, television, music, and digital media."],
    ],
  },
  {
    icon: "masks",
    title: "A Rich Cultural and Culinary Melting Pot",
    body:
      "SoCal is a vibrant cultural mosaic, which directly translates into world-class amenities for its residents. Neighborhoods are filled with rich history, stunning Spanish and mid-century architecture, and premier arts institutions like the Getty Center or the San Diego Museum of Art. The region's immense diversity has also created one of the most celebrated, innovative, and authentic culinary scenes on the planet, ranging from casual beachside taco stands to Michelin-starred dining.",
  },
  {
    icon: "home",
    title: "Diverse Neighborhoods for Every Dream",
    body:
      "Whether you're looking for a sleek high-rise condo in a bustling downtown, a pristine master-planned community with top-tier schools, a spacious inland estate with room to grow, or a luxurious historic property, Southern California has a community that feels like it was custom-made for you.",
  },
];

export interface CountyGuide {
  county: County;
  name: string;
  tagline: string;
  body: string;
  /** Places named in the guide, used as quick new-home searches. */
  places: string[];
}

export const COUNTY_GUIDES: CountyGuide[] = [
  {
    county: "Los Angeles",
    name: "Los Angeles County",
    tagline: "Culture, entertainment & opportunity",
    body:
      "As the most populous county in the nation, Los Angeles County offers unparalleled cultural diversity, world-class entertainment, and a dynamic economy. From the iconic coastal luxury of Malibu and Santa Monica to the historic charm of Pasadena and the booming tech hubs of “Silicon Beach,” LA County provides a vast array of lifestyle options. Buyers are drawn here for its robust job market, endless dining and arts scenes, and neighborhoods that cater to every taste, whether they seek vibrant urban living or quiet suburban retreats.",
    places: ["Pasadena", "Santa Clarita", "Lancaster"],
  },
  {
    county: "Orange",
    name: "Orange County",
    tagline: "Coastline & master-planned living",
    body:
      "Renowned for its pristine coastlines and master-planned communities, Orange County is a premier destination for buyers seeking an exceptional quality of life. Balancing a thriving business environment with a relaxed “surf and sun” culture, OC features top-tier public schools, low crime rates, and beautiful master-planned cities like Irvine and Mission Viejo. From the luxury waterfront estates of Newport Beach to the family-friendly suburbs of North and South County, it represents premium Southern California living at its finest.",
    places: ["Irvine", "Rancho Mission Viejo", "Tustin"],
  },
  {
    county: "San Diego",
    name: "San Diego County",
    tagline: "Big-city amenities, coastal ease",
    body:
      "Offering a perfect blend of big-city amenities and a laid-back coastal vibe, San Diego County is highly desired for its ideal year-round climate and stunning natural beauty. The region boasts a diverse economy driven by biotechnology, defense, and tourism. Buyers can explore a wide variety of markets, including the historic Gaslamp urban condos of downtown, the upscale coastal estates of La Jolla and Del Mar, and the spacious, family-centric inland valleys of Chula Vista and Escondido.",
    places: ["Carlsbad", "Chula Vista", "Escondido"],
  },
  {
    county: "Riverside",
    name: "Riverside County",
    tagline: "Value, space & growth",
    body:
      "As a major anchor of the Inland Empire, Riverside County is one of the fastest-growing regions in California, offering buyers incredible value, space, and economic opportunity. The county features diverse landscapes, ranging from the historic, bustling city centers of Riverside and Corona to the luxurious resort lifestyle of the Coachella Valley (Palm Springs). It is an ideal market for growing families, first-time homebuyers, and retirees looking for larger properties, newer construction, and a vibrant community atmosphere.",
    places: ["Corona", "Temecula", "Menifee"],
  },
  {
    county: "San Bernardino",
    name: "San Bernardino County",
    tagline: "More square footage for your investment",
    body:
      "Holding the title of the largest county in the United States by area, San Bernardino County offers remarkable geographic diversity and some of the most affordable housing options in Southern California. The region spans thriving suburban logistical hubs like Ontario and Rancho Cucamonga to the scenic mountain escapes of Big Bear and Lake Arrowhead. Buyers are highly attracted to this area for its logistical connectivity, outdoor recreational opportunities, and the ability to get significantly more square footage for their investment.",
    places: ["Ontario", "Rancho Cucamonga", "Fontana"],
  },
];
