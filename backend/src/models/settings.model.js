const fs = require("fs/promises");
const path = require("path");

const DATA_PATH = path.join(__dirname, "../data/settings.json");

const ensureFileExists = async () => {
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

const getSettings = async () => {
  await ensureFileExists();

  const data = await fs.readFile(DATA_PATH, "utf-8");

  return JSON.parse(data);
};

const saveSettings = async (settings) => {
  await ensureFileExists();

  await fs.writeFile(
    DATA_PATH,
    JSON.stringify(settings, null, 2)
  );

  return true;
};

const resetSettings = async () => {
  await saveSettings({});

  return true;
};

module.exports = {
  getSettings,
  saveSettings,
  resetSettings,
};