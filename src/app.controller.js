
import connectDB from './DB/connection.js';

const bootstrap = (app, express) => {
    app.use(express.json());
    connectDB();

}