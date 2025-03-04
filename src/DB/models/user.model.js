import { model, Schema, Types } from "mongoose";
import { genders, OTPS, providers, roles } from "../../utils/enums/allEnums.js";
import { hash } from "../../utils/hashing/hash.js";
import { decrypt, encrypt } from "../../utils/encryption/encryption.js";

export const defaultSecure_url = 'https://res.cloudinary.com/dtwkoizpn/image/upload/v1739401332/Screenshot_2025-02-12_230055_trxd6j.png'
export const defaultPublicId = "Screenshot_2025-02-12_230055_trxd6j.png"


const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email already exists"],
        match: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,
        lowercase: true
    },
    password: {
        type: String,
        select: false,
    },
    provider: {
        type: String,
        enum: Object.values(providers),
        default: providers.system
    },
    gender: {
        type: String,
        enum: Object.values(genders),
        default: genders.male
    },
    DOB: {
        type: Date,
        validate: {
            validator: (value) => {
                return new Date().getFullYear() - value.getFullYear() >= 18
            },
            message: "Age must be greater than 18"
        }
    },
    mobileNumber: {
        type: String,
        unique: [true, "Mobile number already exists"],
    },
    role: {
        type: String,
        enum: Object.values(roles),
        default: roles.user
    },
    isConfirmed: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    },
    bannedAt: {
        type: Date,
        default: null
    },
    isFreezed: {
        type: Boolean,
        default: false
    },
    updatedBy: {
        type: Types.ObjectId,
        ref: "User",
        default: null
    },
    changeCredentialTime: {
        type: Date,
        default: null
    },
    profilePicture: {
        secure_url: { type: String, default: defaultSecure_url },
        public_id: { type: String, default: defaultPublicId }
    },
    coverPicture: {
        secure_url: { type: String },
        public_id: { type: String }
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

userSchema.virtual('username').get(function () {
    return `${this.firstName} ${this.lastName}`
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await hash({ plainText: this.password });
    next();
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('mobileNumber')) return next();
    this.mobileNumber = await encrypt({ plainText: this.mobileNumber });
    next();
})

userSchema.post('findOne', async function (doc) {
    if (doc && doc.mobileNumber) {
        doc.mobileNumber = decrypt({ cipherText: doc.mobileNumber });
    }
})


const User = model("User", userSchema)
export default User;

