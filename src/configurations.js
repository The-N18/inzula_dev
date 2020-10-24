export const BACKEND_HOST_ADDRESS = '127.0.0.1';
export const BACKEND_HOST_PORT = '8000';
export const BACKEND_HTTP_PROTOCOL = 'http';

export const backend_url = () => {
  return BACKEND_HTTP_PROTOCOL + "://" + BACKEND_HOST_ADDRESS + ":" + BACKEND_HOST_PORT;
}