const fs = require("fs/promises");
const path = require("path");

const DATA_PATH = path.join(__dirname, "../data/goals.json");

const ensureFileExists = async () => {
  try {
    await fs.access(DATA_PATH);
  } catch (error) {
    await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });

    await fs.writeFile(
      DATA_PATH,
      JSON.stringify([], null, 2)
    );
  }
};

const getGoals = async () => {
  await ensureFileExists();

  const data = await fs.readFile(DATA_PATH, "utf-8");

  return JSON.parse(data);
};

const saveGoals = async (goals) => {
  await ensureFileExists();

  await fs.writeFile(
    DATA_PATH,
    JSON.stringify(goals, null, 2)
  );

  return true;
};

const getGoalById = async (id) => {
  const goals = await getGoals();

  return goals.find((goal) => goal.id === Number(id));
};

const getCompletedGoals = async () => {
  const goals = await getGoals();

  return goals.filter((goal) => goal.completed);
};

const getPendingGoals = async () => {
  const goals = await getGoals();

  return goals.filter((goal) => !goal.completed);
};

module.exports = {
  getGoals,
  saveGoals,
  getGoalById,
  getCompletedGoals,
  getPendingGoals,
};