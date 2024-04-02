import { cleanEnv, port, str } from 'envalid'

const validateEnv = () => {
    cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    LOGS: str()
    });
   };

export default validateEnv;