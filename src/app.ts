import { createServer } from "http";
import dotenv from  "dotenv";
import Server from './utils/Server';
import { logger } from './utils/logger';

const app = Server();
if (app.get('env') === 'development') {
    dotenv.config();
}


const port = process.env.PORT;
createServer(app).listen(port).on('listening', () => {
    logger.info(`Server are running at port ${port}`);
    console.log(`Server are running at port ${port}`)
}).on('error', (error) => {
    console.error(error)
})
