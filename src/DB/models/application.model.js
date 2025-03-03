import { model, Schema, Types } from "mongoose";
import { allStatus } from "../../utils/enums/allEnums.js";



const applicationSchema = new Schema({
    jobId: {
        type: Types.ObjectId,
        ref: "Job",
    },
    userId: {
        type: Types.ObjectId,
        ref: "User",
    },
    userCV: {
        secure_url: { type: String, required: true },
        public_id: { type: String, required: true },
    },
    status: {
        type: String,
        enum: Object.values(allStatus),
        default: allStatus.pending
    }
}, { timestamps: true });

const Application = model("Application", applicationSchema);
export default Application