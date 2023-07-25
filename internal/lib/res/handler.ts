export function responseHandler(code: boolean, message: string, body?: any) {
  return {
    success: code,
    message,
    result: body,
  };
}
