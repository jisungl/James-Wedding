# James Wedding Guest List

A full-stack web application for managing a wedding guest list. Guests can be added for either the bride or groom's side, tagged as family, given dietary restrictions, and optionally assigned a plus-one with their own name and dietary information. The app tracks guest counts per side with min/max ranges based on unconfirmed plus-ones. Built for CSE 331 (Software Design & Implementation) at the University of Washington.

**Note:** The project framework (webpack config, type utilities, and boilerplate) was provided by the course instructors. All application logic — components, routing, data model, client-server communication, and tests — was written by me.

## Features

- Add guests with a name, side (bride or groom), and family designation
- Edit dietary restrictions for each guest
- Optionally add a plus-one with their own name and dietary restrictions
- Plus-one status tracked as confirmed, declined, or unknown
- Guest count summary per side with min/max ranges that account for unconfirmed plus-ones
- Form validation with error messages for missing required fields
- Client state synced with server on every add and edit, persisting data across page reloads

## Logistics

**Client.** A React application (class components, TypeScript) with three views managed by a `Page` state: a guest list view showing all guests with their side and plus-one status, a new guest form with name input, side selection (radio buttons), and a family checkbox, and an edit view for setting dietary restrictions and plus-one details. Navigation between views is handled through state changes in the top-level `WeddingApp` component. Guest counting is implemented recursively, calculating min/max totals per side based on whether each guest's plus-one is confirmed, declined, or unknown.

**Server.** An Express server (TypeScript) with two endpoints: `GET /api/listGuests` returns all guests as a JSON array, and `POST /api/addGuest` creates or updates a guest by name. Guests are stored in an in-memory `Map<string, Guest>` keyed by name. Request bodies are validated field-by-field with 400 responses for missing or malformed parameters.

**Communication.** The client uses `fetch` for all server calls, with response handling that checks status codes, parses JSON, validates the shape of returned data using a `parseGuest` type guard, and updates component state on success.

## Tech Stack

- TypeScript
- React (class components)
- Node.js, Express
- Webpack