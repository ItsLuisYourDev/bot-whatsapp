const whatsappService = require('./services/whatsapp');

// Inicializar el servicio de WhatsApp
whatsappService.initialize();

// Manejar errores no capturados
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);
}); 