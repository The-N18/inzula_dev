export const BACKEND_HOST_ADDRESS = '127.0.0.1';
export const BACKEND_HOST_PORT = '8000';
export const BACKEND_FILE_PORT = '8000';
export const BACKEND_HTTP_PROTOCOL = 'http';

const DO_NOT_APPEND = ['127.0.0.1', 'localhost'];

export const backend_url = () => {
  return BACKEND_HTTP_PROTOCOL + "://" + BACKEND_HOST_ADDRESS + ":" + BACKEND_HOST_PORT;
}

export const api_url = () => {
  return BACKEND_HTTP_PROTOCOL + "://" + BACKEND_HOST_ADDRESS + ":" + BACKEND_HOST_PORT;
}

export const get_img_url = (img) => {
  console.log("img");
  console.log(img);
  if(img && img !== '' && img.includes("http")) {
    return img;
  }
  return backend_url() + img;
}
