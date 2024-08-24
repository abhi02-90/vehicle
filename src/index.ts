import app from "./app";
import { connectDB, environmentConfig } from './config';

export const startServer = async () => {
  try {
    if (environmentConfig.APP.ENVIRONMENT !== "test") {
      await connectDB(environmentConfig.DB.CONNECTION_STRING);
      app?.listen(environmentConfig.APP.PORT, () => {
        console.log(`Server is listening on port: http://localhost:${environmentConfig.APP.PORT} ....`);
      });
    }

  } catch (error) {
    
  }
}

startServer();

export default app;
