import { PortfolioData } from "@/types";
import { defaultData } from "./data";

const STORAGE_KEY = "portfolio_data";

export function getPortfolioData(): PortfolioData {
  if (typeof window === "undefined") return defaultData;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultData;
    return { ...defaultData, ...JSON.parse(stored) };
  } catch {
    return defaultData;
  }
}

export function savePortfolioData(data: PortfolioData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function updateSection<K extends keyof PortfolioData>(
  section: K,
  value: PortfolioData[K]
): void {
  const data = getPortfolioData();
  data[section] = value;
  savePortfolioData(data);
}

export function exportData(): string {
  return JSON.stringify(getPortfolioData(), null, 2);
}

export function importData(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    savePortfolioData(parsed);
    return true;
  } catch {
    return false;
  }
}
