export const BACKEND_HOST_ADDRESS = '127.0.0.1';
export const BACKEND_HOST_PORT = '8000';
export const BACKEND_FILE_PORT = '8000';
export const BACKEND_HTTP_PROTOCOL = 'http';

const DO_NOT_APPEND = ['127.0.0.1', 'localhost'];

export const backend_url = () => {
  if(DO_NOT_APPEND.indexOf(BACKEND_HOST_ADDRESS) === -1) {
    return BACKEND_HTTP_PROTOCOL + "://" + BACKEND_HOST_ADDRESS + ":" + BACKEND_HOST_PORT;
  } else {
    return '';
  }
}

export const api_url = () => {
  return BACKEND_HTTP_PROTOCOL + "://" + BACKEND_HOST_ADDRESS + ":" + BACKEND_HOST_PORT;
}
