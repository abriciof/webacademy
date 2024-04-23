import { cleanEnv, port, str} from "envalid";

export default function validateEnv(){
    cleanEnv(process.env, {
        PORT: port(),
        NODE_ENV: str(),
        DEFAULT_LANG: str({ choices: ['pt-BR','en-US'] }),
    })
}