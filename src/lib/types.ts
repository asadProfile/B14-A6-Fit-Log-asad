/**
 * Shape returned by the FitLog API (`/api/fitlog` and `/api/fitlog/:id`).
 */
export type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};

/** Which list a workout lives in on the My Plan page. */
export type PlanTab = "plan" | "saved";

export type SortKey = "duration" | "calories" | "rating";
