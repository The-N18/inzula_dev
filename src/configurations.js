export const BACKEND_HOST_ADDRESS = '15.188.83.142';
export const BACKEND_HOST_PORT = '8000';
export const BACKEND_FILE_PORT = '8000';
export const BACKEND_HTTP_PROTOCOL = 'http';

export const backend_url = () => {
  return BACKEND_HTTP_PROTOCOL + "://" + BACKEND_HOST_ADDRESS + ":" + BACKEND_HOST_PORT;
}
