// src/routes/wallet.routes.js
const express = require("express");
const router = express.Router();

// Importamos nuestro nuevo controlador
const walletController = require("../controllers/wallet.controller");

// --- Definición de Endpoints de Wallet ---

// Ruta de prueba (la dejamos)
router.get("/test", (req, res) => {
  res.status(200).json({ message: "Ruta de prueba de Wallets funciona OK!" });
});

// **¡NUEVA RUTA!**
// RF1: Crear Wallet
// URL Completa: POST /api/v1/wallets
// **Punto Clave:** Cuando llegue un POST a '/',
// se ejecutará la función 'createWallet' del controlador.
router.post("/", walletController.createWallet);

// **¡NUEVA RUTA!**
// RF2: Consultar Saldo
// URL Completa: GET /api/v1/wallets/:userId/balance
// **Punto Clave:** ':userId' es un parámetro dinámico.
// Express lo capturará y lo pondrá en 'req.params.userId'
router.get("/:userId/balance", walletController.getWalletBalance);

// RF3: Ejecutar Crédito
// Será llamado por el Transaction Service (RF8)
// URL Completa: POST /api/v1/wallets/credit
router.post("/credit", walletController.creditWallet);

// RF4: Ejecutar Débito
// Será llamado por el Transaction Service (RF8)
// URL Completa: POST /api/v1/wallets/debit
router.post("/debit", walletController.debitWallet);

// RF7: Consultar movimientos recientes
// URL Completa: GET /api/v1/wallets/:walletId/ledger
router.get("/:walletId/ledger", walletController.getWalletLedger);

// RF10: Compensar transacción
// Será llamado por el Transaction Service (RF10)
// URL Completa: POST /api/v1/wallets/compensate
router.post("/compensate", walletController.compensateWallet);

module.exports = router;
