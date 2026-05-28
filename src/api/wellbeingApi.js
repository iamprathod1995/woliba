import api from "./axios";

export const getWellbeingPillars = () =>
  api.get("/get-wellbeing-pillars/1");

export const getWellnessInterest = () =>
  api.get("/viewWellnessInterest");