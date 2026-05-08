const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const getReadings = (length = 1200) => {
  const current = Date.now();
  const hour = 1000 * 60 * 60;

  return [...new Array(length)].map((_, index) => ({
    time: current - index * hour,
    value: Math.random() * 0.7 + 0.4,
  }));
};

app.get("/readings", async (_, res) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  res.json(getReadings());
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Mock API running on http://localhost:${PORT}`);
});
