import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
import errorHandling from "./middleware/errorHandler";
import createUserTable from "./data/createUserTable";
import createOrdersTable from "./data/createOrdersTable";
import createOrderItemsTable from "./data/createOrderItemsTable";
const app = express();
app.use(cors());
app.use(express.json());

// Create tables before starting server
createUserTable();
createOrderItemsTable();
createOrdersTable();

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use(errorHandling);

app.listen(5001, () => console.log("Server running on port 5001"));

export default app;
