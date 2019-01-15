export const successResponse = (data, message = "", code = 200) => ({
  success: true,
  message,
  code,
  ...data
});