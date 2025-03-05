
import connectDB from './DB/connection.js';
import globalErrorHandler from './utils/errorHandeling/globalErrorHandler.js';
import notFoundHandler from './utils/errorHandeling/notFoundHandler.js';
import authController from './modules/auth/auth.controller.js';
import userController from './modules/user/user.controller.js';
import adminController from './modules/admin/admin.controller.js';
import companyController from './modules/company/company.controller.js';
import { createHandler } from 'graphql-http/lib/use/express';
import schema from './app.schema.js';

const bootstrap = async (app, express) => {
    app.use(express.json());
    await connectDB();
    app.use('/auth', authController)
    app.use('/user', userController)
    app.use('/graphql', createHandler({ schema }));
    app.use('/admin', adminController)
    app.use('/company', companyController)
    app.all('*', notFoundHandler)
    app.use(globalErrorHandler);
}
export default bootstrap