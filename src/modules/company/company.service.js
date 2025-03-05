import Job from "../../DB/models/job.model.js";
import Company from "../../DB/models/company.model.js";
import { roles } from "../../utils/enums/allEnums.js";
import { asyncHandler } from "../../utils/errorHandeling/asyncHandler.js";
import cloudinary from './../../utils/file uploading/cludinary.config.js';
import { defaultPublicId, defaultSecure_url } from "../../DB/models/user.model.js";


export const addCompany = asyncHandler(async (req, res, next) => {

    const { companyName, companyEmail, description, industry, address, numberOfEmployees } = req.body;

    // companyExists By mail
    const companyExists = await Company.findOne({ companyEmail });
    if (companyExists) return next(new Error("Company already exists", { cause: 400 }));

    const company = await Company.create({
        companyName,
        companyEmail,
        description,
        industry,
        address,
        numberOfEmployees,
        CreatedBy: req.user._id
    })

    return res.status(201).json({ success: true, message: "Company added successfully", company });

})

export const updateCompany = asyncHandler(async (req, res, next) => {
    const { companyId } = req.params;

    // companyExists
    const company = await Company.findById(companyId);
    if (!company) return next(new Error("Company not found", { cause: 404 }));

    // check if user is allowed to update this company
    if (company.CreatedBy.toString() !== req.user._id.toString()) return next(new Error("You are not allowed to update this company", { cause: 403 }));

    // prevent update legalAttachment
    if (req.body.legalAttachment) return next(new Error("legalAttachment is not allowed to update", { cause: 400 }));

    // update company
    const updatedCompany = await Company.findByIdAndUpdate(companyId, req.body, { new: true, runValidators: true });

    return res.status(200).json({ success: true, message: "Company updated successfully", company: updatedCompany });
})


export const softDeleteCompany = asyncHandler(async (req, res, next) => {

    const { companyId } = req.params;
    // companyExists
    const company = await Company.findById(companyId);
    if (!company) return next(new Error("Company not found", { cause: 404 }));

    // check if user is allowed to update this company && if admin
    if (company.CreatedBy.toString() !== req.user._id.toString()
        &&
        req.user.role !== roles.admin) return next(new Error("You are not allowed to update this company", { cause: 403 }));

    await Company.updateOne({ _id: companyId }, { isFreezed: true, deletedAt: Date.now() }, { new: true, runValidators: true });
    // company.deletedAt = Date.now();
    // company.isFreezed = true;
    // await company.save();
    return res.status(200).json({ success: true, message: "Company soft deleted successfully" })


})


export const getCompanyWithJobs = asyncHandler(async (req, res, next) => {

    const { companyId } = req.params;

    const company = await Company.findById(companyId).populate("jobs");

    if (!company) return next(new Error("Company not found", { cause: 404 }));
    return res.status(200).json({ success: true, message: "Company and related jobs found successfully", data: company });
})


export const searchCompany = asyncHandler(async (req, res, next) => {
    const { name } = req.query;
    if (!name) return next(new Error("company name is required", { cause: 400 }));

    const company = await Company.find({ companyName: { $regex: `^${name}`, $options: "i" } });

    if (!company) return next(new Error("Company not found", { cause: 404 }));

    return res.status(200).json({ success: true, message: "Companies found successfully", data: company });
})


export const uploadCompanyLogo = asyncHandler(async (req, res, next) => {
    const { companyId } = req.params;
    if (!companyId) return next(new Error("company id is required", { cause: 400 }));

    const company = await Company.findById(companyId);
    if (!company) return next(new Error("company not found", { cause: 404 }));

    if (company.CreatedBy.toString() !== req.user._id.toString()) {
        return next(new Error("You are not authorized to update this company", { cause: 403 }));
    }

    if (!req.file) return next(new Error("Image is required", { cause: 400 }));
    const uploadImage = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.FOLDER_NAME}/company/${company._id}/logo` });
    company.Logo = { secure_url: uploadImage.secure_url, public_id: uploadImage.public_id };
    await company.save();
    return res.status(200).json({ success: true, message: "Company logo uploaded successfully", data: company });

})


export const uploadCompanyCoverPic = asyncHandler(async (req, res, next) => {
    const { companyId } = req.params;
    if (!companyId) return next(new Error("company id is required", { cause: 400 }));

    const company = await Company.findById(companyId);
    if (!company) return next(new Error("company not found", { cause: 404 }));

    if (company.CreatedBy.toString() !== req.user._id.toString()) {
        return next(new Error("You are not authorized to update this company", { cause: 403 }));
    }

    if (!req.file) return next(new Error("Image is required", { cause: 400 }));
    const uploadImage = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.FOLDER_NAME}/company/${company._id}/cover Picture` });
    company.coverPic = { secure_url: uploadImage.secure_url, public_id: uploadImage.public_id };
    await company.save();
    return res.status(200).json({ success: true, message: "Company cover picture uploaded successfully", data: company });

})


export const deleteCompanyLogo = asyncHandler(async (req, res, next) => {

    const { companyId } = req.params;
    if (!companyId) return next(new Error("company id is required", { cause: 400 }));

    const company = await Company.findById(companyId);
    if (!company) return next(new Error("company not found", { cause: 404 }));

    if (!company.Logo || !company.Logo.public_id) return next(new Error("company logo not found", { cause: 404 }));

    await cloudinary.uploader.destroy(company.Logo.public_id);

    company.Logo = { secure_url: defaultSecure_url, public_id: defaultPublicId };
    await company.save();

    return res.status(200).json({ success: true, message: "Company logo deleted successfully", data: company });

})


export const deleteCompanyCoverPic = asyncHandler(async (req, res, next) => {

    const { companyId } = req.params;
    if (!companyId) return next(new Error("company id is required", { cause: 400 }));

    const company = await Company.findById(companyId);
    if (!company) return next(new Error("company not found", { cause: 404 }));

    if (!company.coverPic || !company.coverPic.public_id) return next(new Error("company cover picture not found", { cause: 404 }));

    await cloudinary.uploader.destroy(company.coverPic.public_id);

    company.coverPic = { secure_url: defaultSecure_url, public_id: defaultPublicId };
    await company.save();

    return res.status(200).json({ success: true, message: "Company cover picture deleted successfully", data: company });

})