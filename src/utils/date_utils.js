import { DateTime } from "luxon";

export function getPreviousWeek(dateStr) {
    const dateTime = DateTime.fromISO(dateStr);
    return dateTime.minus({ days: 7 }).toISODate();
}

export function getNextWeek(dateStr) {
    const dateTime = DateTime.fromISO(dateStr);
    return dateTime.plus({ days: 7 }).toISODate();
}

export function getPreviousWednesday(dateStr) {
    const dateTime = DateTime.fromISO(dateStr);
    return dateTime.minus({ days: (dateTime.weekday + 4) % 7 }).toISODate();
}

export function getNextTuesday(dateStr) {
    const dateTime = DateTime.fromISO(dateStr);
    return dateTime.plus({ days: (7 - dateTime.weekday + 2) % 7 }).toISODate();
}
