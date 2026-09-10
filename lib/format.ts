export const money = (n: number) => "$" + n.toLocaleString("en-US");
export const num = (n: number) => n.toLocaleString("en-US");

/** Short price used on map pins: $1.295M, $989K. */
export function shortPrice(price: number): string {
  if (price >= 1e6) {
    const m = price / 1e6;
    const s = m.toFixed(m % 1 ? 2 : 0).replace(/0$/, "").replace(/\.$/, "");
    return "$" + s + "M";
  }
  return "$" + Math.round(price / 1e3) + "K";
}

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export interface DayOption {
  iso: string;
  dow: string;
  num: number;
  month: string;
}

/** Upcoming days starting the day after `fromISO`, optionally skipping Sundays. */
export function upcomingDays(fromISO: string, count: number, skipSunday = false): DayOption[] {
  const out: DayOption[] = [];
  const d = new Date(fromISO + "T12:00:00");
  while (out.length < count) {
    d.setDate(d.getDate() + 1);
    if (skipSunday && d.getDay() === 0) continue;
    out.push({
      iso: d.toISOString().slice(0, 10),
      dow: DOW[d.getDay()],
      num: d.getDate(),
      month: MON[d.getMonth()],
    });
  }
  return out;
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}
