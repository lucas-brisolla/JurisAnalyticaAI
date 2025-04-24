// backend/src/services/aiIntegrationService.js
const axios = require('axios');
const config = require('../config/config'); // Carrega URL do serviço de IA

const aiServiceApi = axios.create({
  baseURL: config.aiServiceUrl,
  // Headers de autenticação, se necessário
});

exports.analyzeDocumentContent = async (documentText) => {
  try {
    const response = await aiServiceApi.post('/analyze', { text: documentText });
    return response.data; // Retorna { entities: [...], risks: [...], summary: "..." }
  } catch (error) {
    console.error("Erro ao chamar serviço de IA:", error);
    throw new Error('Falha na análise pelo serviço de IA.');
  }
};

exports.getChatResponse = async (userMessage, context) => {
  try {
    // Passa a mensagem e talvez um contexto (ID do documento?) para a IA
    const response = await aiServiceApi.post('/chat', { message: userMessage, context: context });
    return response.data; // Retorna { response: "..." }
  } catch (error) {
    console.error("Erro no chat com IA:", error);
    throw new Error('Falha ao obter resposta do chat IA.');
  }
};