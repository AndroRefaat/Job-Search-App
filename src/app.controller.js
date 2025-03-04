
import connectDB from './DB/connection.js';
import globalErrorHandler from './utils/errorHandeling/globalErrorHandler.js';
import notFoundHandler from './utils/errorHandeling/notFoundHandler.js';
import authController from './modules/auth/auth.controller.js';
import userController from './modules/user/user.controller.js';

const bootstrap = async (app, express) => {
    app.use(express.json());
    await connectDB();
    app.use('/auth', authController)
    app.use('/user', userController)

    app.all('*', notFoundHandler)
    app.use(globalErrorHandler);
}
export default bootstrap