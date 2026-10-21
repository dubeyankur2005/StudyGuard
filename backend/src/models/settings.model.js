const fs = require("fs/promises");
const path = require("path");

const DATA_DIR = path.join(__dirname, "../data/users");
const dataPath = (owner) => path.join(DATA_DIR, `${String(owner)}-settings.json`);

const ensureFileExists = async (owner) => {
  if (!owner || !/^[a-f\d]{24}$/i.test(String(owner))) throw new Error("Invalid owner");
  const DATA_PATH = dataPath(owner);
  try {
    await fs.access(DATA_PATH);
  } catch (error) {
    await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });

    await fs.writeFile(
      DATA_PATH,
      JSON.stringify({}, null, 2)
    );
  }
};

const getSettings = async (owner) => {
  await ensureFileExists(owner);
  const DATA_PATH = dataPath(owner);

  const data = await fs.readFile(DATA_PATH, "utf-8");

  return JSON.parse(data);
};

const saveSettings = async (owner, settings) => {
  await ensureFileExists(owner);
  const DATA_PATH = dataPath(owner);

  await fs.writeFile(
    DATA_PATH,
    JSON.stringify(settings, null, 2)
  );

  return true;
};

const resetSettings = async (owner) => {
  await saveSettings(owner, {});

  return true;
};

module.exports = {
  getSettings,
  saveSettings,
  resetSettings,
};
