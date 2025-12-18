import express from "express";
import cors from "cors";
// Importação das rotas
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rota de verificação (saúde da API)
app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        service: "Rōnin API",
    });
});
// Rotas de usuário
app.use("/users", userRouter);
app.use("/auth", authRouter);

export default app;
