import { useState, useEffect } from "react";
import axios from "axios";
import { getUser } from "../utils/userStoage";

const ChatBox = () => {
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const user = getUser();
    const fullName = user?.full_name || "Người bí ẩn";

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:3001");
        ws.onopen = () => console.log("Kết nối WebSocket thành công!");
        ws.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            if (newMessage.message && !newMessage.text) {
                newMessage.text = newMessage.message;
            }
            setChatHistory((prev) => [...prev, newMessage]);
        };
        ws.onerror = (error) => console.error("Lỗi WebSocket:", error);
        return () => ws.close();
    }, []);

    const sendMessage = async () => {
        if (!message.trim()) return;
        await axios.post("http://localhost:3000/chat/sendMessage", {
            message,
            customerId: fullName,
        });

        setChatHistory((prev) => [...prev, { sender: "user", text: message }]);
        setMessage("");
    };

    // Bắt sự kiện khi nhấn phím Enter
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Nút mở chat */}
            <button
                className="fixed bottom-6 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600"
                onClick={() => setIsOpen(!isOpen)}
            >
                💬
            </button>

            {/* Khung chat */}
            {isOpen && (
                <div className="fixed bottom-16 right-6 w-96 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-center bg-blue-500 text-white p-3 rounded-t-lg">
                        <h2 className="text-lg font-semibold">Chat hỗ trợ</h2>
                        <button onClick={() => setIsOpen(false)} className="text-white">✖</button>
                    </div>

                    {/* Nội dung chat */}
                    <div className="p-3 space-y-2 overflow-y-auto max-h-64 flex flex-col">
                        {chatHistory.map((msg, index) => (
                            <div
                                key={index}
                                className={`p-2 max-w-[75%] rounded-lg text-sm ${msg.sender === "user"
                                    ? "bg-blue-500 text-white self-end"
                                    : "bg-gray-200 text-gray-800 self-start"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    {/* Input gửi tin nhắn */}
                    <div className="flex items-center p-2 border-t">
                        <input
                            type="text"
                            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none text-black"
                            placeholder="Nhập tin nhắn..."
                            value={message} // 🔥 Đảm bảo giá trị `message` luôn cập nhật
                            onChange={(e) => setMessage(e.target.value)} // 🔥 Cập nhật `message` khi nhập
                            onKeyDown={handleKeyDown} // Bắt sự kiện Enter
                        />

                        <button
                            onClick={sendMessage}
                            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Gửi
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBox;
