const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 3001 });

// setInterval(() => {
//     if (global.latestReply) {
//         wss.clients.forEach((client) => {
//             if (client.readyState === WebSocket.OPEN) {
//                 client.send(JSON.stringify(global.latestReply));
//             }
//         });
//         global.latestReply = null;
//     }
// }, 2000);
setInterval(() => {
    if (global.latestReply) {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(global.latestReply));
                console.log("Gửi tin nhắn phản hồi:", global.latestReply);
            }
        });
        global.latestReply = null;
    }
}, 2000);
