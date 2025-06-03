const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const config = require('../config/config');

class WhatsAppService {
    constructor() {
        this.client = new Client({
            authStrategy: new LocalAuth()
        });

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.client.on('qr', (qr) => {
            qrcode.generate(qr, { small: true });
        });

        this.client.on('ready', () => {
            console.log('WhatsApp client is ready!');
        });

        this.client.on('message', this.handleMessage.bind(this));
    }

    async handleMessage(msg) {
        try {
            if (msg.body.toLowerCase() === '!ping') {
                await msg.reply('Pong! 🏓');
            } else if (msg.body.toLowerCase() === '!partidos' || msg.body.toLowerCase() === '!ping') {
                const fromDate = '2025-06-01';
                const toDate = '2025-06-12';
                const fixtures = await this.getFixtures(fromDate, toDate);
                await msg.reply(fixtures);
            }
        } catch (error) {
            console.error('Error handling message:', error);
            await msg.reply('Lo siento, hubo un error al procesar tu mensaje.');
        }
    }

    async getFixtures(fromDate, toDate) {
        const footballService = require('./football');
        try {
            const fixtures = await footballService.getFixtures(fromDate, toDate);
            return footballService.formatFixtures(fixtures);
        } catch (error) {
            console.error('Error getting fixtures:', error);
            throw new Error('Error al obtener los partidos');
        }
    }

    initialize() {
        this.client.initialize();
    }
}

module.exports = new WhatsAppService(); 