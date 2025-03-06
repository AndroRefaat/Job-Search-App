import { Router } from "express";
import isAuthenticated from './../../middlewares/authentication.middleware.js';
import isAuthorized from './../../middlewares/authorization.js';
import { roles } from "../../utils/enums/allEnums.js";
import { validation } from './../../middlewares/validation.middleware.js';
import * as companyService from '../company/company.service.js'
import * as companySchemas from '../company/company.validation.js'
import { uploadCloud } from './../../utils/file uploading/multer.cloudinary.js';
import jobController from '../job/job.controller.js';
const router = Router();

router.use('/:companyId/jobs', jobController)

router.post('/addCompany', isAuthenticated, isAuthorized(roles.admin, roles.user), validation(companySchemas.addCompanySchema), companyService.addCompany)

router.patch('/updateCompany/:companyId', isAuthenticated, isAuthorized(roles.admin, roles.user), validation(companySchemas.updateCompanySchema), companyService.updateCompany)

router.delete('/softDeleteCompany/:companyId', isAuthenticated, isAuthorized(roles.admin), companyService.softDeleteCompany)

router.get('/getCompanyWithJobs/:companyId', isAuthenticated, isAuthorized(roles.admin, roles.user), validation(companySchemas.getCompanyWithJobsSchema), validation(companySchemas.getCompanyWithJobsSchema), companyService.getCompanyWithJobs)

router.get('/searchCompany', isAuthenticated, isAuthorized(roles.admin, roles.user), companyService.searchCompany)

router.post('/uploadCompanyLogo/:companyId', isAuthenticated, uploadCloud().single('image'), isAuthorized(roles.admin, roles.user), companyService.uploadCompanyLogo)

router.post('/uploadCompanyCoverPic/:companyId', isAuthenticated, uploadCloud().single('image'), isAuthorized(roles.admin, roles.user), companyService.uploadCompanyCoverPic)

router.delete('/deleteCompanyLogo/:companyId', isAuthenticated, uploadCloud().single('image'), isAuthorized(roles.admin, roles.user), companyService.deleteCompanyLogo)

router.delete('/deleteCompanyCoverPic/:companyId', isAuthenticated, uploadCloud().single('image'), isAuthorized(roles.admin, roles.user), companyService.deleteCompanyCoverPic)


export default router;