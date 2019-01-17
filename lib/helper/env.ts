import * as minimist from "minimist";

const cliArgs = minimist(process.argv.slice(2));
const env = cliArgs.env || "dev";

export const envFromArgs = () => env;