import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import errorHandling from "./middleware/errorHandler";
import createUserTable from "./data/createUserTable";
import jwt from "jsonwebtoken";
const app = express();
app.use(cors());
app.use(express.json());

// Create table before starting server
createUserTable();

app.use("/api/auth", authRoutes);
app.get("/api/protected", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1]; 

  try {
    const decoded = jwt.verify(token, "supersecret"); 
    res.status(200).json({
      message: "Protected data accessed",
      token,
      decoded,
    });
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
});
app.use(errorHandling);

app.listen(5001, () => console.log("Server running on port 5001"));

export default app;
