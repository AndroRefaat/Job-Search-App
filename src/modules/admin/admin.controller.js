import { Router } from "express";
import isAuthenticated from './../../middlewares/authentication.middleware.js';
import isAuthorized from './../../middlewares/authorization.js';
import { roles } from "../../utils/enums/allEnums.js";
import * as adminService from '../admin/admin.service.js'
import { validation } from './../../middlewares/validation.middleware.js';
import * as adminSchemas from './admin.validation.js';

const router = Router();

router.patch('/banOrUnbanUser/:userId', isAuthenticated, isAuthorized(roles.admin), validation(adminSchemas.banOrUnbanUserSchema), adminService.banOrUnbanUser)

router.patch('/banOrUnbanCompany/:companyId', isAuthenticated, isAuthorized(roles.admin), validation(adminSchemas.banOrUnbanCompanySchema), adminService.banOrUnbanCompany)

router.patch('/approve/:companyId', isAuthenticated, isAuthorized(roles.admin), validation(adminSchemas.approveSchema), adminService.approve)


export default router;