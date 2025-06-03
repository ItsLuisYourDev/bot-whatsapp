const fs = require('fs');
const { Client,LocalAuth  } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');

const client = new Client({
    authStrategy: new LocalAuth() // esto guarda en .wwebjs_auth/
});

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    // console.log('QR RECEIVED', qr);
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async msg => {
    if (msg.body == '!ping') {
        const t = await ficture("");
        if (t) {
            msg.reply(t);
        } else {
            msg.reply("Hubo un error al obtener los partidos.");
        }
    }
});


client.initialize();
async function ficture(fechaFormateada) {
    const url = `https://v3.football.api-sports.io/fixtures?league=242&season=2025&from=2025-06-01&to=2025-06-12`;

    const options = {
        method: 'GET',
        url: url,
        headers: {
            'x-rapidapi-key': 'eeac689d711cf31e35f30562dd2bb057',
            'x-rapidapi-host': 'v3.football.api-sports.io'
        }
    };

    try {
        const response = await axios.request(options);
        const resp = response.data.response;
        // mostrarPartidos(resp);
        var resultado = "";
        resp.forEach(element => {
            resultado += `${element.fixture.date} ${element.teams.home.name} ${element.goals.home} - ${element.goals.away} ${element.teams.away.name}\n`;
            // console.log("Fecha: ",element.fixture.date); // O haz lo que necesites con cada elemento
            // console.log(element.teams.home.name,": ", element.goals.home, " | "  ,element.teams.away.name,": ",element.goals.away); // O haz lo que necesites con cada elemento
        });
        // console.log(resultado);
        return resultado;
    } catch (error) {
        console.error('Error al hacer la petición:', error.message);
    }
}

// function mostrarPartidos(partidos) {
//     partidos.forEach(p => {
//     const fecha = new Date(p.fixture.date).toLocaleString('es-ES', {
//         dateStyle: 'medium', timeStyle: 'short'
//     });

//     const homeTeam = p.teams.home.name;
//     const awayTeam = p.teams.away.name;

//     const golesHome = p.goals.home !== null ? p.goals.home : '-';
//     const golesAway = p.goals.away !== null ? p.goals.away : '-';

//     console.log(`${fecha} | ${homeTeam} ${golesHome} - ${golesAway} ${awayTeam}`);
//     });
// }