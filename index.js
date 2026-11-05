const express = require("express");
const bookRoutes = require("./routes/books");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Express LAB!" });
});

app.use("/books", bookRoutes);
app.use("/auth", authRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route does not exist!" });
});

app.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});
