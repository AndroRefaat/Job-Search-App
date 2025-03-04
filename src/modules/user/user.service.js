import User, { defaultPublicId, defaultSecure_url } from "../../DB/models/user.model.js";
import { asyncHandler } from "../../utils/errorHandeling/asyncHandler.js";
import { compare, hash } from "../../utils/hashing/hash.js";
import cloudinary from './../../utils/file uploading/cludinary.config.js';


export const updateAccount = asyncHandler(async (req, res, next) => {

    const { firstName, lastName, mobileNumber, DOB, gender } = req.body
    const data = {}

    if (firstName) {
        data.firstName = firstName
    }
    if (lastName) {
        data.lastName = lastName
    }
    if (mobileNumber) {
        data.mobileNumber = mobileNumber
    }
    if (DOB) {
        data.DOB = DOB
    }
    if (gender) {
        data.gender = gender
    }

    const user = await User.findOneAndUpdate({ _id: req.user._id }, data, { new: true })
    if (!user) return next(new Error("User not found", { cause: 404 }));

    return res.status(200).json({ success: true, message: "Account updated successfully" })
})

export const getAccount = asyncHandler(async (req, res, next) => {

    const user = await User.findById(req.user._id).select("firstName lastName mobileNumber DOB gender");

    if (!user) return next(new Error("User not found", { cause: 404 }));

    return res.status(200).json({ success: true, data: user })


})


export const getProfileAnotherUser = asyncHandler(async (req, res, next) => {

    const { profileId } = req.params;

    const user = await User.findById(profileId)

    if (!user) return next(new Error("User not found", { cause: 404 }));
    return res.status(200).json({
        success: true,
        data: {
            userName: user.username,
            mobileNumber: user.mobileNumber,
            profilePicture: user.profilePicture,
            coverPicture: user.coverPicture
        }
    });

})


export const updatePassword = asyncHandler(async (req, res, next) => {

    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select("+password");


    const passwordMatch = await compare({ plainText: oldPassword, hash: user.password });
    if (!passwordMatch) return next(new Error("Invalid old password", { cause: 400 }));

    const hashPassword = hash({ plainText: newPassword });
    await User.findByIdAndUpdate(req.user._id, { password: hashPassword, changeCredentialTime: Date.now() }, { new: true, runValidators: true });


    return res.status(200).json({ success: true, message: "Password updated successfully" });
})


export const uploadProfilePicture = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.FOLDER_NAME}/user/${user._id}/profilePicture` });
    user.profilePicture = { secure_url, public_id };
    await user.save();
    return res.status(200).json({ success: true, message: "Profile picture uploaded successfully" });

})

export const uploadCoverPicture = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.FOLDER_NAME}/user/${user._id}/coverPicture` });
    user.coverPicture = { secure_url, public_id };
    await user.save();
    return res.status(200).json({ success: true, message: "Cover picture uploaded successfully" });

})


export const deleteProfilePicture = asyncHandler(async (req, res, next) => {

    const user = await User.findById(req.user._id);
    const results = await cloudinary.uploader.destroy(user.profilePicture.public_id);
    if (results.result === 'ok') {
        user.profilePicture = { secure_url: defaultSecure_url, public_id: defaultPublicId };
        await user.save();
        return res.status(200).json({ success: true, message: "Profile picture deleted successfully" });
    }
})


export const deleteCoverPicture = asyncHandler(async (req, res, next) => {

    const user = await User.findById(req.user._id);
    const results = await cloudinary.uploader.destroy(user.coverPicture.public_id);
    if (results.result === 'ok') {
        user.coverPicture = { secure_url: defaultSecure_url, public_id: defaultPublicId };
        await user.save();
        return res.status(200).json({ success: true, message: "Cover picture deleted successfully" });
    }
})

export const freezeAccount = asyncHandler(async (req, res, next) => {

    const user = await User.findById(req.user._id);
    if (user.isFreezed) return next(new Error("Account already frozen", { cause: 400 }));

    await User.updateOne({ _id: req.user._id }, { isFreezed: true, deletedAt: Date.now(), }, { new: true, runValidators: true });
    res.status(200).json({ success: true, message: "Account freezed successfully" });

})