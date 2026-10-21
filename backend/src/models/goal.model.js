const fs = require("fs/promises");
const path = require("path");

const DATA_DIR = path.join(__dirname, "../data/users");
const dataPath = (owner) => path.join(DATA_DIR, `${String(owner)}-goals.json`);

const ensureFileExists = async (owner) => {
  if (!owner || !/^[a-f\d]{24}$/i.test(String(owner))) throw new Error("Invalid owner");
  const DATA_PATH = dataPath(owner);
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

const getGoals = async (owner) => {
  await ensureFileExists(owner);
  const DATA_PATH = dataPath(owner);

  const data = await fs.readFile(DATA_PATH, "utf-8");

  return JSON.parse(data);
};

const saveGoals = async (owner, goals) => {
  await ensureFileExists(owner);
  const DATA_PATH = dataPath(owner);

  await fs.writeFile(
    DATA_PATH,
    JSON.stringify(goals, null, 2)
  );

  return true;
};

const getGoalById = async (owner, id) => {
  const goals = await getGoals(owner);

  return goals.find((goal) => goal.id === Number(id));
};

const getCompletedGoals = async (owner) => {
  const goals = await getGoals(owner);

  return goals.filter((goal) => goal.completed);
};

const getPendingGoals = async (owner) => {
  const goals = await getGoals(owner);

  return goals.filter((goal) => !goal.completed);
};

module.exports = {
  getGoals,
  saveGoals,
  getGoalById,
  getCompletedGoals,
  getPendingGoals,
};
