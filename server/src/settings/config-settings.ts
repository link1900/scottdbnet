export const configSettings = {
  isGlobal: true,
  cache: true,
  envFilePath:
    process.env.EXECUTION_ENVIRONMENT === "prod"
      ? "./resource/config/.env.prod"
      : "./resource/config/.env.local",
};
