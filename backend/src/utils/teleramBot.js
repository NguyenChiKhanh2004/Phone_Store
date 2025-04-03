const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
dotenv.config();
const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });


bot.on('message', async (msg) => {
    // console.log("Nhận tin nhắn từ Telegram:", msg); // Debug toàn bộ tin nhắn

    const chatId = msg.chat.id;
    const text = msg.text;

    // Nếu tin nhắn đến từ admin, bạn có thể kiểm tra dựa vào chat id (nếu cần)
    if (chatId == process.env.TELEGRAM_ADMIN_CHAT_ID) {
        global.latestReply = {
            customerId: "Khách hàng",
            message: text,
            sender: "admin",
        };
        // console.log("Đã cập nhật global.latestReply:", global.latestReply);
    }
});



module.exports = bot;