const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

// URL-адреса для пинга
const KAGUYA_BOT_URL = 'https://kaguya2-0-bot-s1n1.onrender.com';
// Вставь сюда URL этого пингера после первого деплоя на Render
let SELF_URL = process.env.RENDER_EXTERNAL_URL || 'http://localhost:' + PORT;

app.get('/', (req, res) => {
  res.send('Pinger is active and running!');
});

// Функция отправки пинг-запроса
async function ping(url) {
  try {
    const response = await fetch(url);
    console.log(`[${new Date().toLocaleTimeString()}] Ping SUCCESS: ${url} (Status: ${response.status})`);
  } catch (error) {
    console.error(`[${new Date().toLocaleTimeString()}] Ping ERROR: ${url} (${error.message})`);
  }
}

// Общий пинг всех сервисов
function pingAll() {
  console.log('--- Starting Scheduled Ping ---');
  ping(KAGUYA_BOT_URL);
  if (SELF_URL) {
    ping(SELF_URL);
  }
}

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Pinger server listening on port ${PORT}`);
  
  // Первый пинг при старте
  pingAll();

  // Интервал 5 минут (300 000 мс)
  setInterval(pingAll, 300000);
});
