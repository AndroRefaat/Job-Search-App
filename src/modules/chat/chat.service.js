import User from "../../DB/models/user.model.js";
import { asyncHandler } from "../../utils/errorHandeling/asyncHandler.js";
import Chat from './../../DB/models/chat.model.js';



export const getChat = asyncHandler(async (req, res, next) => {
    const { userId } = req.params

    const user = await User.findById(userId);
    if (!user) return next(new Error("User not found", { cause: 404 }));

    const chat = await Chat.find({
        $or: [
            { sender: req.user._id, receiver: userId },
            { sender: userId, receiver: req.user._id }
        ]
    }).populate("sender", "firstName lastName profilePicture")
        .populate("receiver", "firstName lastName profilePicture")
        .sort({ createdAt: 1 });
    if (!chat) return next(new Error("Chat not found", { cause: 404 }));

    return res.status(200).json({ success: true, message: "Chat found successfully", data: chat });
})