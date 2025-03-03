import { model, Schema, Types } from "mongoose";
import { jobLocations, seniorityLevels, workingTimes } from "../../utils/enums/allEnums.js";


const jobSchema = new Schema({
    jobTitle: {
        type: String,
        required: true
    },
    jobLocation: {
        type: String,
        enums: Object.values(jobLocations)
    },
    workingTime: {
        type: String,
        enums: Object.values(workingTimes)
    },
    seniorityLevel: {
        type: String,
        enums: Object.values(seniorityLevels)
    },
    jobDescription: {
        type: String,
    },
    technicalSkills: {
        type: [String],
    },
    softSkills: {
        type: [String],
    },
    addedBy: {
        type: Types.ObjectId,
        ref: "User"
    },
    updatedBy: {
        type: Types.ObjectId,
        ref: "User"
    },
    closed: {
        type: Boolean,
        default: false
    },
    companyId: {
        type: Types.ObjectId,
        ref: "Company"
    }
}, { timestamps: true });

const Job = model("Job", jobSchema);
export default Job;