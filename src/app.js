import express from "express";
import cors from "cors";

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

export default app;
