import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser'
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
import errorHandling from "./middleware/errorHandler";
import createUserTable from "./data/createUserTable";
import createOrdersTable from "./data/createOrdersTable";
import createOrderItemsTable from "./data/createOrderItemsTable";
import createProductsTable from "./data/createProductsTable";
import createCategoriesTable from "./data/createCategoriesTable";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use(errorHandling);

app.listen(5001, () => console.log("Server running on port 5001"));

export default app;
