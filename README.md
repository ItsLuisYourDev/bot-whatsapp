# WhatsApp Football Bot

A WhatsApp bot that provides football match information using the API-Football service.

## Features

- Get current football matches
- Real-time match updates
- Easy to use commands

## Commands

- `!ping` - Check if the bot is working
- `!partidos` - Get current football matches

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```env
   FOOTBALL_API_KEY=your_api_key_here
   NODE_ENV=development
   WHATSAPP_AUTH_STRATEGY=local
   ```
4. Run the bot:
   ```bash
   npm run dev
   ```

## Development

- `npm run dev` - Run in development mode with hot reload
- `npm start` - Run in production mode

## Technologies

- Node.js
- whatsapp-web.js
- API-Football
- Axios

## License

ISC
# bot-whatsapp
