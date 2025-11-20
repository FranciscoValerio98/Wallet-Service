// src/routes/wallet.routes.js
const express = require("express");
const router = express.Router();

// Importamos nuestro nuevo controlador
const walletController = require("../controllers/wallet.controller");

const { checkJwt } = require('../middleware/auth.middleware');



//¡NUEVO! IMPORTA ESTO PARA LA PUERTA TRASERA ---
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Asegura que process.env esté cargado
const JWT_SECRET = process.env.JWT_SECRET;

//¡NUEVO! Pega esta ruta aquí ---
//==================================================================
// 		PUERTA TRASERA DE PRUEBAS (¡Borrar en producción!)
//==================================================================
router.post('/generate-token', (req, res) => {
  try {
    const { userId, role } = req.body;
    if (!userId || !role) {
      return res.status(400).json({ error: "Se requiere 'userId' y 'role' en el body" });
    }

    const payload = { userId, role };

    // ¡Firmamos el token con el MISMO secreto que usa el middleware!
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });

    res.status(200).json({
      message: `Token generado para ${role}: ${userId}`,
      token: token,
      payload: payload
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// --- Definición de Endpoints de Wallet ---

// Ruta de prueba (la dejamos)
router.get("/test", (req, res) => {
  res.status(200).json({ message: "Ruta de prueba de Wallets funciona OK!" });
});

// RF1: Crear Wallet
// URL Completa: POST /api/v1/wallets
// **Punto Clave:** Cuando llegue un POST a '/',
// se ejecutará la función 'createWallet' del controlador.
router.post("/", checkJwt, walletController.createWallet);

// RF2: Consultar Saldo
// URL Completa: GET /api/v1/wallets/:userId/balance
// **Punto Clave:** ':userId' es un parámetro dinámico.
// Express lo capturará y lo pondrá en 'req.params.userId'
router.get("/:userId/balance", checkJwt, walletController.getWalletBalance);

// RF3: Ejecutar Crédito
// Será llamado por el Transaction Service (RF8)
// URL Completa: POST /api/v1/wallets/credit
router.post("/credit", checkJwt, walletController.creditWallet);

// RF4: Ejecutar Débito
// Será llamado por el Transaction Service (RF8)
// URL Completa: POST /api/v1/wallets/debit
router.post("/debit", checkJwt, walletController.debitWallet);

// RF7: Consultar movimientos recientes
// URL Completa: GET /api/v1/wallets/:walletId/ledger
router.get("/:walletId/ledger", checkJwt, walletController.getWalletLedger);

// RF10: Compensar transacción
// Será llamado por el Transaction Service (RF10)
// URL Completa: POST /api/v1/wallets/compensate
router.post("/compensate", checkJwt, walletController.compensateWallet);

module.exports = router;
