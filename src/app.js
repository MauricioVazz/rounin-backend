import express from "express";
import cors from "cors";
// Importação das rotas
import userRouter from "./routes/userRouter.js";

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

export default app;
