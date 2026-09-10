import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";
import { parseBmiQuery, parseExerciseBody } from "./utils.ts";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    const { height, weight } = parseBmiQuery(req.query);
    const bmi = calculateBmi(height, weight);
    res.json({ weight, height, bmi });
  } catch {
    res.status(400).json({ error: "malformatted parameters" });
  }
});

app.post("/exercises", (req, res) => {
  try {
    const { target, dailyHours } = parseExerciseBody(req.body);
    const result = calculateExercises(dailyHours, target);
    res.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "malformatted parameters";
    res.status(400).json({ error: message });
  }
});

// The healthapp-tests suite expects the app to be running on port 3000.
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
