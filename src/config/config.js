require('dotenv').config();

module.exports = {
    footballApi: {
        baseUrl: 'https://v3.football.api-sports.io',
        apiKey: process.env.FOOTBALL_API_KEY,
        league: 242,
        season: 2025
    },
    whatsapp: {
        authStrategy: 'local'
    }
}; 