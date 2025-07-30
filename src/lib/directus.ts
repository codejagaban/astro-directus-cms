/// <reference types="vite/client" />
import { createDirectus, readItems, rest } from "@directus/sdk";


const DIRECTUS_URL = import.meta.env.DIRECTUS_URL;
const client = createDirectus(DIRECTUS_URL).with(rest());

export async function getPageData(slug: string) {
  try {
    const pages = await client.request(
      readItems("pages", {
        fields: ["*",
        "blocks.*",
        "blocks.item.*.*.*.*",],
        filter: {
          permalink: {
            _eq: slug,
          },
        },
        limit: 1, // Fetch only one page
      })
    );

    if (pages.length === 0) {
      throw new Error(`Page with slug "${slug}" not found.`);
    }

    return {
      data: pages[0], // Return the first (and only) page
      error: null,
    };
  } catch (error) {
    console.error(`Failed to fetch page with slug "${slug}":`, error);
    return {
      data: null,
      error: `Failed to fetch page with slug "${slug}". Please try again later.`,
    };
  }
}

interface NavigationItem {
  id: string;
  sort: number;
  title: string;
  type: "page" | "url" | "group";
  url?: string | null;
  page?: {
    id: string;
    sort: number;
    title: string;
    permalink: string;
  } | null;
  children?: Array<NavigationItem>;
}

interface NavigationResponse {
  id: string;
  title: string;
  is_active: boolean;
  items: Array<NavigationItem>;
}

interface NavigationData {
  data: Array<NavigationResponse>;
  error?: string;
}
export async function getNavigation(): Promise<NavigationData> {
  try {
    const navigation = await client.request(
      readItems("navigation", {
        fields: ["*.*.*"],
      })
    );

    return {
      data: navigation as Array<NavigationResponse>,
    };
  } catch (error) {
    console.error("Failed to fetch navigation:", error);
    return {
      data: [],
      error: "Failed to fetch navigation. Please try again later.",
    };
  }
}


export default client;