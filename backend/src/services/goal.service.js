const goalModel = require("../models/goal.model");

const getGoals = async () => {
  return await goalModel.getGoals();
};

const createGoal = async (goalData) => {
  const goals = await goalModel.getGoals();

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

  await goalModel.saveGoals(goals);

  return newGoal;
};

const updateGoal = async (id, updatedData) => {
  const goals = await goalModel.getGoals();

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

  await goalModel.saveGoals(goals);

  return goals[index];
};

const deleteGoal = async (id) => {
  const goals = await goalModel.getGoals();

  const index = goals.findIndex((goal) => goal.id === Number(id));

  if (index === -1) {
    return false;
  }

  goals.splice(index, 1);

  await goalModel.saveGoals(goals);

  return true;
};

module.exports = {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
};