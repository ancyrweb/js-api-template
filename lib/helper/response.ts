export const successResponse = (data, message = "", code = 200) => ({
  success: true,
  message,
  code,
  ...data
});

export const errorResponse = (message = "", code = 400) => ({
  success: false,
  message,
  code,
});