import User from './../../../DB/models/user.model.js';
import Company from './../../../DB/models/company.model.js';
import { decrypt } from '../../../utils/encryption/encryption.js'; // تأكد من المسار الصحيح

export const findAllUsersAndCompanies = async () => {

    const usersData = await User.find().select("_id firstName lastName email mobileNumber role isFreezed");

    // decrypt phone numbers
    const users = usersData.map(user => ({
        ...user.toObject(),
        mobileNumber: decrypt({ cipherText: user.mobileNumber }) // فك تشفير رقم الهاتف
    }));

    const companies = await Company.find();

    return {
        success: true,
        status: 200,
        results: {
            users,
            companies
        }
    };
};
