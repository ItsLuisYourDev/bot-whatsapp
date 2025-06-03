const axios = require('axios');
const config = require('../config/config');

class FootballService {
    constructor() {
        this.api = axios.create({
            baseURL: config.footballApi.baseUrl,
            headers: {
                'x-rapidapi-key': config.footballApi.apiKey,
                'x-rapidapi-host': 'v3.football.api-sports.io'
            }
        });
    }

    async getFixtures(fromDate, toDate) {
        try {
            const response = await this.api.get('/fixtures', {
                params: {
                    league: config.footballApi.league,
                    season: config.footballApi.season,
                    from: fromDate,
                    to: toDate
                }
            });
            return response.data.response;
        } catch (error) {
            console.error('Error fetching fixtures:', error.message);
            throw error;
        }
    }

    formatFixtures(fixtures) {
        let resultado = "⚽ *PARTIDOS DE LA LIGA* ⚽\n\n";
        
        fixtures.forEach(fixture => {
            const date = new Date(fixture.fixture.date).toLocaleString('es-ES', {
                dateStyle: 'medium',
                timeStyle: 'short'
            });
            
            const homeTeam = fixture.teams.home.name;
            const awayTeam = fixture.teams.away.name;
            const homeGoals = fixture.goals.home !== null ? fixture.goals.home : '-';
            const awayGoals = fixture.goals.away !== null ? fixture.goals.away : '-';
            const venue = fixture.fixture.venue.name;
            const league = fixture.league.name;
            const status = fixture.fixture.status.short;

            resultado += `📅 *${date}*\n`;
            resultado += `🏠 ${homeTeam} ${homeGoals} - ${awayGoals} ${awayTeam} 🏠\n`;
            resultado += `📍 ${venue}\n`;
            resultado += `🏟️ ${league}\n`;
            resultado += `📊 Estado: ${status}\n`;
            resultado += `\n${'─'.repeat(30)}\n\n`;
        });
        
        return resultado;
    }
}

module.exports = new FootballService(); 