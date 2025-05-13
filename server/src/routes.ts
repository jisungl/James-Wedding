import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";


// Require type checking of request body.
type SafeRequest = Request<ParamsDictionary, {}, Record<string, unknown>>;
type SafeResponse = Response;  // only writing, so no need to check

//description of an individual guest
type Guest = {
  readonly name: string;
  readonly family: boolean;
  readonly diet: string;
  readonly side: boolean;
  readonly plusOne?: boolean;
  readonly extraName?: string
  readonly extraDiet?: string
}

// const arr : Array<Guest> = [];
const guests: Map<string, Guest> = new Map();

/**
 * testing function to remove all the added guests
 */
export const resetMap = (): void => {
  guests.clear();
}

/**
 * Returns a list of all the guests
 * @param _req the request
 * @param res the response
 */
export const listGuests = (_req: SafeRequest, res: SafeResponse): void => {
  const vals = Array.from(guests.values());
  res.send({guests: vals});
};

/**
 * add the guest to the list
 * @param req the request
 * @param res the response
 * @returns 
 */
export const addGuest = (req: SafeRequest, res: SafeResponse): void => {
  const name = req.body.name
  if (typeof name !== 'string') {
    res.status(400).send("missing 'name' parameter");
    return;
  }

  const family = req.body.family
  if (typeof family !== 'boolean') {
    res.status(400).send("missing 'family' parameter");
    return;
  }

  const diet = req.body.diet
  if (typeof diet !== 'string') {
    res.status(400).send("missing 'diet' parameter");
    return;
  }

  const side = req.body.side
  if (typeof side !== 'boolean') {
    res.status(400).send("missing 'side' parameter");
    return;
  }

  const plusOne = req.body.plusOne
  if (typeof plusOne !== 'boolean' && plusOne !== undefined) {
    res.status(400).send("missing 'plusOne' parameter");
    return;
  }

  const extraName = req.body.extraName
  if (typeof extraName !== 'string' && extraName !== undefined) {
    res.status(400).send("missing 'extraName' parameter");
    return;
  }

  const extraDiet = req.body.extraDiet
  if (typeof extraDiet !== 'string' && extraDiet !== undefined) {
    res.status(400).send("missing 'extraDiet' parameter");
    return;
  }

  const guest: Guest = {
    name: name,
    family: family,
    diet: diet,
    side: side,
    plusOne: plusOne,
    extraName: extraName,
    extraDiet: extraDiet
  };
  guests.set(guest.name, guest); 
  res.send({guest: guest});
}






// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give mutiple values,
// in which case, express puts them into an array.)
const first = (param: unknown): string|undefined => {
  if (Array.isArray(param)) {
    return first(param[0]);
  } else if (typeof param === 'string') {
    return param;
  } else {
    return undefined;
  }
};

/**
 * Dummy route that just returns a hello message to the client.
 * @param req The request object
 * @param res The response object
 */
export const dummy = (req: SafeRequest, res: SafeResponse): void => {
  const name = first(req.query.name);
  if (name === undefined) {
    res.status(400).send('missing or invalid "name" parameter');
    return;
  }

  res.send({msg: `Hi, ${name}!`});
};