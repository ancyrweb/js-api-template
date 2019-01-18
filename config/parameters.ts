export type AppParametersType = {
  DATABASE_TYPE: "mysql" | "mariadb"
  DATABASE_HOST: string,
  DATABASE_PORT: number,
  DATABASE_USERNAME: string,
  DATABASE_PASSWORD: string,
  DATABASE_NAME: string,
  SMTP_HOST: string,
  SMTP_PORT: number,
  SMTP_AUTH?: any,
  SMTP_PROXY?: string,
}

export default {
  DATABASE_TYPE: "mysql",
  DATABASE_HOST: "localhost",
  DATABASE_PORT: 3306,
  DATABASE_USERNAME: "sandbox",
  DATABASE_PASSWORD: "azerty",
  DATABASE_NAME: "sandbox",
  SMTP_HOST: "",
  SMTP_PORT: 587,
} as AppParametersType;