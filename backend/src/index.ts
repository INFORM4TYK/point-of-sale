import dotenv from "dotenv";
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env";
dotenv.config({ path: envFile });
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import cartRoutes from "./routes/cartRouter";
import customersRoutes from "./routes/customerRoutes";

import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
import errorHandling from "./middleware/errorHandler";

const app = express();


    
app.use(
  cors({
    origin: process.env.BASE_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/customers", customersRoutes);

app.use(errorHandling);

app.listen(5001, () => console.log(`Server running on port 5001 and ${process.env.NODE_ENV}`));

export default app;
