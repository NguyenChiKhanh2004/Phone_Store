const bot = require('../utils/teleramBot');

class ChatController {
    async sendMessage(req, res){
        const { message, customerId } = req.body;

        if (!message || !customerId) {
            return res.status(400).json({ message: "Thiếu thông tin tin nhắn" });
        }

        const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
        const msgToSend = `📩 *Tin nhắn từ khách hàng ${customerId}:*\n${message}`;

        try {
            await bot.sendMessage(chatId, msgToSend, { parse_mode: "Markdown" });
            res.json({ success: true, reply: "Tin nhắn đã gửi đến hỗ trợ viên!" });
        } catch (error) {
            console.error("Lỗi gửi tin nhắn Telegram:", error);
            res.status(500).json({ message: "Lỗi khi gửi tin nhắn" });
        }

    }
}
module.exports = new ChatController();
// exports.sendMessage = async (req, res) => {
//     const { message, customerId } = req.body;

//     if (!message || !customerId) {
//         return res.status(400).json({ message: "Thiếu thông tin tin nhắn" });
//     }

//     const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
//     const msgToSend = `📩 *Tin nhắn từ khách hàng ${customerId}:*\n${message}`;

//     try {
//         await bot.sendMessage(chatId, msgToSend, { parse_mode: "Markdown" });
//         res.json({ success: true, reply: "Tin nhắn đã gửi đến hỗ trợ viên!" });
//     } catch (error) {
//         console.error("Lỗi gửi tin nhắn Telegram:", error);
//         res.status(500).json({ message: "Lỗi khi gửi tin nhắn" });
//     }
// };
