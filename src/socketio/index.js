import { Server } from "socket.io";
import { jobSocketHandler } from "./job.socket.service.js";

export let io;

export const runSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
        },
        allowEIO3: true // ✅ حل مشكلة عدم الاتصال بـ WebSocket في بعض الحالات
    });

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on("join", (userId) => {
            socket.join(userId);
            console.log(`User ${userId} joined their personal room`);
        });

        jobSocketHandler(socket, io);

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
};
