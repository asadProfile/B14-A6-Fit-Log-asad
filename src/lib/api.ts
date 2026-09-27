import type { Workout } from "./types";

/**
 * Primary and fallback mirrors for the FitLog workout data.
 * The fallback is used automatically when the primary host is unreachable.
 */
const API_HOSTS = [
  process.env.NEXT_PUBLIC_FITLOG_API ?? "https://api.abcz.workers.dev/api/fitlog",
  "https://api.api-store.workers.dev/api/fitlog",
];

/** Thrown when every API mirror fails, so pages can render an error state. */
export class ApiError extends Error {
  constructor(message = "Could not reach the FitLog workout API.") {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string): Promise<T> {
  let lastError: unknown = null;

  for (const host of API_HOSTS) {
    try {
      const response = await fetch(`${host}${path}`, {
        // Workout data is live data owned by the API, never cached at build time.
        cache: "no-store",
        headers: { Accept: "application/json" },
      });

      if (response.status === 404) {
        throw new Response404();
      }

      if (!response.ok) {
        throw new Error(`Request to ${host} failed with ${response.status}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      if (error instanceof Response404) throw error;
      lastError = error;
    }
  }

  throw new ApiError(
    lastError instanceof Error ? lastError.message : undefined,
  );
}

class Response404 extends Error {}

/** Fetch every lift in the library. */
export async function getWorkouts(): Promise<Workout[]> {
  const data = await request<Workout[]>("");
  if (!Array.isArray(data)) {
    throw new ApiError("The workout API returned an unexpected payload.");
  }
  return data;
}

/** Fetch a single lift. Resolves to `null` when the id does not exist. */
export async function getWorkout(id: string | number): Promise<Workout | null> {
  try {
    return await request<Workout>(`/${id}`);
  } catch (error) {
    if (error instanceof Response404) return null;
    throw error;
  }
}

/** Same as {@link getWorkout} but never throws — useful for client-side lists. */
export async function getWorkoutSafe(
  id: string | number,
): Promise<Workout | null> {
  try {
    return await getWorkout(id);
  } catch {
    return null;
  }
}
