import { isRecord } from "./record";

export type Guest = {
    readonly name: string;
    readonly family: boolean;
    readonly diet: string;
    readonly side: boolean;
    readonly plusOne?: boolean;
    readonly extraName?: string
    readonly extraDiet?: string
}

/**
 * Provides the number of Guess in an array that is on a selected side's family
 * @param host indicates branch of family. true if James's side, false if Molly's
 * @param guests array of Guests
 * @param count indicates number of guests on selected side's family so far
 * @returns number of Guess in an array that is on a selected side's family
 */
export const countGuest = (host: boolean, guests: Guest[], count: {min: number, max: number}): [number, number]=> {
    if (guests.length === 0) {
        return [count.min, count.max];
    } else {
        const curr = guests[0];
        if (curr.side === host) {
            if (curr.plusOne === undefined) {
                return countGuest(host, guests.slice(1), {min: count.min + 1, max: count.max + 2});
            } else if (curr.plusOne) {
                return countGuest(host, guests.slice(1), {min: count.min + 2, max: count.max + 2})
            } else {
                return countGuest(host, guests.slice(1), {min: count.min + 1, max: count.max + 1});
            }
        } else {
            return countGuest(host, guests.slice(1), {min: count.min, max: count.max});
        }
    }
}

/**
 * Counts the number of guests in an array that are a member of the given host's family
 * @param host host: true for james, false for molly
 * @param guests array of guests being searched
 * @param count current count of guests being tracked
 * @returns number of guests in an array that are a member of the given host's family
 */
export const countFam = (host: boolean, guests: Guest[], count: number): number => {
    if (guests.length === 0) {
        return count;
    } else {
        const curr = guests[0];
        if (curr.side === host && curr.family) {
            return countFam(host, guests.slice(1), count + 1);
        } else {
            return countFam(host, guests.slice(1), count);  
        }
    }
}

/**
 * Finds the guest details from a given array of guests given the name of the guest
 * @param name name of guest
 * @param guests array of guests being searched
 * @returns guest details from a given array of guests given the name of the guest, undefined if DNE
 */
export const findGuest = (name: string, guests: Guest[]): Guest | undefined => {
    for (const Guest of guests) {
        if (Guest.name === name) {
            return Guest;
        }
    }
    return undefined
}

/**
 * Determines whether given details are of a guest type
 * @param val details
 * @returns guest details, undefined if details do not match guest type
 */
export const parseGuest = (val: unknown): Guest | undefined => {
    if (!isRecord(val)) {
        return undefined;
    }
    
    if (typeof val.name !== 'string') {
        return undefined;
    }

    if (typeof val.family !== 'boolean') {
        return undefined
    }

    if (typeof val.diet !== 'string') {
        return undefined;
    }

    if (typeof val.side !== 'boolean') {
        return undefined;
    }

    if (typeof val.plusOne !== 'undefined' && typeof val.plusOne !== 'boolean') {
        return undefined
    }

    if (typeof val.extraName !== 'undefined' && typeof val.extraName !== 'string') {
        return undefined
    }

    if (typeof val.extraDiet !== 'undefined' && typeof val.extraDiet !== 'string') {
        return undefined
    }

    const guest = {
        name: val.name,
        family: val.family,
        diet: val.diet,
        side: val.side,
        plusOne: val.plusOne,
        extraName: val.extraName,
        extraDiet: val.extraDiet
    }
    return guest;
}