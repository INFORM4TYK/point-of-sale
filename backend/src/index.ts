import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import errorHandling from "./middleware/errorHandler";
import createUserTable from "./data/createUserTable";
const app = express();
app.use(cors());
app.use(express.json());

// Create table before starting server
createUserTable();

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.use(errorHandling);

app.listen(5001, () => console.log("Server running on port 5001"));

export default app;
