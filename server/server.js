const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const port = 4000;
const baseURL = "https://api.themoviedb.org/3";

app.use(cors());

app.get("/data", async (req, res) => {
  try {
    const response = await axios.get(baseURL);
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
