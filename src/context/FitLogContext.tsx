"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useToast } from "@/components/ui/Toast";
import type { Workout } from "@/lib/types";
import { PLAN_LIMIT } from "@/lib/utils";

const STORAGE_KEYS = {
  plan: "fitlog:today-plan:v1",
  saved: "fitlog:saved:v1",
  done: "fitlog:done:v1",
} as const;

export type AddResult = "added" | "exists" | "full";

type FitLogContextValue = {
  /** Today's Plan — capped at {@link PLAN_LIMIT} lifts. */
  plan: Workout[];
  /** Lifts saved for later. */
  saved: Workout[];
  /** Ids of plan lifts the user has ticked off today. */
  doneIds: number[];
  /** False until localStorage has been read, so badges never flash a wrong value. */
  hydrated: boolean;
  planFull: boolean;
  addToPlan: (workout: Workout) => AddResult;
  saveForLater: (workout: Workout) => AddResult;
  removeFromPlan: (workout: Workout) => void;
  removeFromSaved: (workout: Workout) => void;
  toggleDone: (workout: Workout) => void;
  isInPlan: (id: number) => boolean;
  isInSaved: (id: number) => boolean;
  isDone: (id: number) => boolean;
};

const FitLogContext = createContext<FitLogContextValue | null>(null);

/** Read a persisted list, tolerating disabled storage and corrupt JSON. */
function readStorage(key: string): Workout[] {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Workout[]) : [];
  } catch {
    return [];
  }
}

function readIdList(key: string): number[] {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "number") : [];
  } catch {
    return [];
  }
}

function writeStorage(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or blocked — the app keeps working in-memory */
  }
}

/**
 * Holds Today's Plan, Saved and Done state for the whole app.
 *
 * Every mutation is mirrored into localStorage so the plan survives a reload,
 * and the navbar badges read straight off this context.
 */
export function FitLogProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [doneIds, setDoneIds] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Restore the previous session once we are on the client.
  useEffect(() => {
    setPlan(readStorage(STORAGE_KEYS.plan).slice(0, PLAN_LIMIT));
    setSaved(readStorage(STORAGE_KEYS.saved));
    setDoneIds(readIdList(STORAGE_KEYS.done));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeStorage(STORAGE_KEYS.plan, plan);
  }, [plan, hydrated]);

  useEffect(() => {
    if (hydrated) writeStorage(STORAGE_KEYS.saved, saved);
  }, [saved, hydrated]);

  useEffect(() => {
    if (hydrated) writeStorage(STORAGE_KEYS.done, doneIds);
  }, [doneIds, hydrated]);

  const isInPlan = useCallback(
    (id: number) => plan.some((item) => item.id === id),
    [plan],
  );
  const isInSaved = useCallback(
    (id: number) => saved.some((item) => item.id === id),
    [saved],
  );
  const isDone = useCallback((id: number) => doneIds.includes(id), [doneIds]);

  const addToPlan = useCallback(
    (workout: Workout): AddResult => {
      if (isInPlan(workout.id)) {
        toast({
          title: "Already in today's plan",
          description: `${workout.name} is already queued up for today.`,
          variant: "info",
        });
        return "exists";
      }

      if (plan.length >= PLAN_LIMIT) {
        toast({
          title: "Today's plan is full",
          description: `The cap is ${PLAN_LIMIT} lifts. Finish or remove one to load more.`,
          variant: "error",
        });
        return "full";
      }

      setPlan((current) => [...current, workout]);
      toast({
        title: "Added to today's plan",
        description: `${workout.name} — ${workout.duration} min, ${workout.caloriesBurned} kcal.`,
      });
      return "added";
    },
    [isInPlan, plan.length, toast],
  );

  const saveForLater = useCallback(
    (workout: Workout): AddResult => {
      if (isInSaved(workout.id)) {
        toast({
          title: "Already saved",
          description: `${workout.name} is waiting in your saved list.`,
          variant: "info",
        });
        return "exists";
      }

      setSaved((current) => [...current, workout]);
      toast({
        title: "Saved for later",
        description: `${workout.name} was added to your saved lifts.`,
      });
      return "added";
    },
    [isInSaved, toast],
  );

  const removeFromPlan = useCallback(
    (workout: Workout) => {
      setPlan((current) => current.filter((item) => item.id !== workout.id));
      setDoneIds((current) => current.filter((id) => id !== workout.id));
      toast({
        title: "Removed from today's plan",
        description: `${workout.name} is out of today's session.`,
        variant: "info",
      });
    },
    [toast],
  );

  const removeFromSaved = useCallback(
    (workout: Workout) => {
      setSaved((current) => current.filter((item) => item.id !== workout.id));
      toast({
        title: "Removed from saved",
        description: `${workout.name} is no longer in your saved list.`,
        variant: "info",
      });
    },
    [toast],
  );

  const toggleDone = useCallback(
    (workout: Workout) => {
      const alreadyDone = doneIds.includes(workout.id);
      setDoneIds((current) =>
        alreadyDone
          ? current.filter((id) => id !== workout.id)
          : [...current, workout.id],
      );
      toast({
        title: alreadyDone ? "Marked as not done" : "Marked as done",
        description: alreadyDone
          ? `${workout.name} is back in today's queue.`
          : `Nice work — ${workout.name} is logged for today.`,
        variant: alreadyDone ? "info" : "success",
      });
    },
    [doneIds, toast],
  );

  const value = useMemo<FitLogContextValue>(
    () => ({
      plan,
      saved,
      doneIds,
      hydrated,
      planFull: plan.length >= PLAN_LIMIT,
      addToPlan,
      saveForLater,
      removeFromPlan,
      removeFromSaved,
      toggleDone,
      isInPlan,
      isInSaved,
      isDone,
    }),
    [
      plan,
      saved,
      doneIds,
      hydrated,
      addToPlan,
      saveForLater,
      removeFromPlan,
      removeFromSaved,
      toggleDone,
      isInPlan,
      isInSaved,
      isDone,
    ],
  );

  return <FitLogContext.Provider value={value}>{children}</FitLogContext.Provider>;
}

export function useFitLog(): FitLogContextValue {
  const context = useContext(FitLogContext);
  if (!context) {
    throw new Error("useFitLog must be used inside <FitLogProvider>.");
  }
  return context;
}
