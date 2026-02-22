// Используем стандартный fetch, который доступен в Node.js 18+ на Vercel
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Только POST запросы' });
  }

  const { name, phone, date } = req.body;
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const message = `
🆕 <b>Новая бронь!</b>
👤 <b>Имя:</b> ${name}
📞 <b>Телефон:</b> ${phone}
📅 <b>Дата:</b> ${date}
  `;

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      throw new Error('Ошибка Telegram API');
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}