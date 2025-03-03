import { model, Schema, Types } from "mongoose";

const chatSchema = new Schema({
    senderId: {
        type: Types.ObjectId,
        ref: "User",
    },
    receiverId: {
        type: Types.ObjectId,
        ref: "User",
    },
    messages: [
        {
            message: {
                type: String
            },
            senderId: {
                type: Types.ObjectId,
                ref: "User",
            }
        }
    ]
}, { timestamps: true });

const Chat = model("Chat", chatSchema);
export default Chat