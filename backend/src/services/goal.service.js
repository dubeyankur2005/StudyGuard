const goalModel = require("../models/goal.model");

const getGoals = async (owner) => {
  return await goalModel.getGoals(owner);
};

const createGoal = async (owner, goalData) => {
  if (!goalData || typeof goalData.title !== "string" || !goalData.title.trim() || goalData.title.length > 120 || !["daily", "weekly", "Daily", "Weekly"].includes(goalData.type) || !Number.isFinite(Number(goalData.target)) || Number(goalData.target) <= 0) throw Object.assign(new Error("Invalid goal details"), { statusCode: 400 });
  const goals = await goalModel.getGoals(owner);

  const newGoal = {
    id: goals.length ? goals[goals.length - 1].id + 1 : 1,
    title: goalData.title,
    type: goalData.type,
    target: goalData.target,
    progress: goalData.progress || 0,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  goals.push(newGoal);

  await goalModel.saveGoals(owner, goals);

  return newGoal;
};

const updateGoal = async (owner, id, updatedData) => {
  if (!updatedData || Object.keys(updatedData).some((key) => !["title", "type", "target", "progress"].includes(key)) || (updatedData.title !== undefined && (typeof updatedData.title !== "string" || !updatedData.title.trim() || updatedData.title.length > 120)) || (updatedData.target !== undefined && (!Number.isFinite(Number(updatedData.target)) || Number(updatedData.target) <= 0)) || (updatedData.progress !== undefined && (!Number.isFinite(Number(updatedData.progress)) || Number(updatedData.progress) < 0))) throw Object.assign(new Error("Invalid goal details"), { statusCode: 400 });
  const goals = await goalModel.getGoals(owner);

  const index = goals.findIndex((goal) => goal.id === Number(id));

  if (index === -1) {
    return null;
  }

  goals[index] = {
    ...goals[index],
    ...updatedData,
    completed:
      updatedData.progress >= updatedData.target
        ? true
        : goals[index].completed,
    updatedAt: new Date().toISOString(),
  };

  await goalModel.saveGoals(owner, goals);

  return goals[index];
};

const deleteGoal = async (owner, id) => {
  const goals = await goalModel.getGoals(owner);

  const index = goals.findIndex((goal) => goal.id === Number(id));

  if (index === -1) {
    return false;
  }

  goals.splice(index, 1);

  await goalModel.saveGoals(owner, goals);

  return true;
};

module.exports = {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
};
