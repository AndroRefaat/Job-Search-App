
import { model, Schema } from "mongoose";
import { OTPS } from "../../utils/enums/allEnums.js";

const otpSchema = new Schema(
    {
        email: { type: String, required: true },
        otps: [
            {
                code: { type: String, required: true }, // يجب أن يكون مشفرًا
                type: { type: String, enum: Object.values(OTPS), required: true },
            }
        ],
    },
    { timestamps: true }
);


otpSchema.index({ "otps.expiresIn": 1 }, { expireAfterSeconds: 0 });

const OTP = model("otp", otpSchema);
export default OTP;
