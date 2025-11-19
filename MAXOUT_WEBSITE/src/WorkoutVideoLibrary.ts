// src/WorkoutVideoLibrary.ts

// Define all valid workout categories as a union type
export type WorkoutCategory =
  | "Leg Day"
  | "Running"
  | "Squats"
  | "Full Body Stretching"
  | "Abs"
  | "Push Ups";

// Typed dictionary: each category maps to an array of YouTube video IDs
const WorkoutVideoLibrary: Record<WorkoutCategory, string[]> = {
  "Leg Day": ["r4aMIs0ouPU"], // 10 min LEG (No Equipment)
  "Running": ["pxegq_K6jqI"], // 10 MIN CARDIO
  "Squats": ["4_9MoIp2Fg8"], // 10min SQUAT CHALLENGE
  "Full Body Stretching": ["f-G70VJMZvU"], // 10 MIN DAILY STRETCH
  "Abs": ["9p7-YC91Q74"], // 10-min abs
  "Push Ups": ["UszGXwC3wkY"], // Push-Up Challenge
};

export default WorkoutVideoLibrary;

