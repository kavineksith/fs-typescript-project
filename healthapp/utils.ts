export const isNotNumber = (argument: string): boolean =>
  isNaN(Number(argument));

export interface BmiValues {
  height: number;
  weight: number;
}

export const parseBmiArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  const height = args[2];
  const weight = args[3];

  if (!isNotNumber(height) && !isNotNumber(weight)) {
    return {
      height: Number(height),
      weight: Number(weight),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const parseBmiQuery = (query: unknown): BmiValues => {
  if (
    typeof query !== "object" ||
    query === null ||
    !("height" in query) ||
    !("weight" in query)
  ) {
    throw new Error("malformatted parameters");
  }

  const { height, weight } = query;

  if (
    typeof height !== "string" ||
    typeof weight !== "string" ||
    isNotNumber(height) ||
    isNotNumber(weight)
  ) {
    throw new Error("malformatted parameters");
  }

  return {
    height: Number(height),
    weight: Number(weight),
  };
};

export interface ExerciseValues {
  target: number;
  dailyHours: number[];
}

export const isValidNumber = (value: unknown): boolean => {
  if (typeof value === "number") return !isNaN(value);
  if (typeof value === "string")
    return value.trim() !== "" && !isNaN(Number(value));
  return false;
};

export const parseExerciseBody = (body: unknown): ExerciseValues => {
  if (typeof body !== "object" || body === null) {
    throw new Error("parameters missing");
  }

  if (!("daily_exercises" in body) || !("target" in body)) {
    throw new Error("parameters missing");
  }

  const { daily_exercises, target } = body;

  if (!Array.isArray(daily_exercises) || daily_exercises.length === 0) {
    throw new Error("malformatted parameters");
  }

  if (
    !isValidNumber(target) ||
    daily_exercises.some((hours) => !isValidNumber(hours))
  ) {
    throw new Error("malformatted parameters");
  }

  return {
    target: Number(target),
    dailyHours: daily_exercises.map(Number),
  };
};

export const parseExerciseArguments = (args: string[]): ExerciseValues => {
  const parameters = args.slice(2);

  if (parameters.length < 2) {
    throw new Error(
      "Not enough arguments: provide a target and at least one daily hour value",
    );
  }

  if (parameters.some(isNotNumber)) {
    throw new Error("Provided values were not numbers!");
  }

  const numbers = parameters.map(Number);
  const [target, ...dailyHours] = numbers;

  return { target, dailyHours };
};

export default "this is the default...";
