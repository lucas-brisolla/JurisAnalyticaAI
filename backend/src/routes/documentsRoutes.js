const express = require('express');
const multer = require('multer'); // Middleware para upload
const documentController = require('../controllers/documentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
const upload = multer({storage: multer.memoryStorage()}; // Ou storage em disco/nuvem

//Rota protegida por autenticação
router.post(
    '/upload',
    authMiddleware,
    upload.single('document') // 'document' é o nome do campo no form-data 
    documentController.uploadAndAnalyzeDocument
);

// Outras rotas para listar, buscar, deletar documentos...
router.get('/', authMiddleware, documentController.listDocuments);

module.exports = router;

// backend/src/controllers/documentController.js
const documentService = require('../services/documentService');

exports.uploadAndAnalyzeDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const userId = req.user.id; // Obtido do authMiddleware
    const file = req.file;

    // 1. Salvar metadados do documento no DB
    // 2. Salvar o arquivo em storage seguro (ex: S3)
    // 3. Chamar o serviço de análise de IA (assíncrono)
    const document = await documentService.handleUploadAndTriggerAnalysis(userId, file);

    res.status(202).json({ message: 'Document uploaded and analysis started.', documentId: document.id });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: 'Server internal error' });
  }
};

exports.listDocuments = async (req, res) => {
    // Lógica para buscar documentos do usuário no DB
};