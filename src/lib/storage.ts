import { PortfolioData } from "@/types";
import { defaultData } from "./data";

export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    const res = await fetch("/api/portfolio", { cache: "no-store" });
    if (!res.ok) return defaultData;
    return res.json();
  } catch {
    return defaultData;
  }
}

export async function savePortfolioData(data: PortfolioData): Promise<boolean> {
  try {
    const res = await fetch("/api/portfolio/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function updateSection<K extends keyof PortfolioData>(
  section: K,
  value: PortfolioData[K]
): Promise<boolean> {
  const data = await getPortfolioData();
  data[section] = value;
  return savePortfolioData(data);
}

