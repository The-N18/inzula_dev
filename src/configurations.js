//export const BACKEND_HOST_ADDRESS = '127.0.0.1';
export const BACKEND_HOST_ADDRESS = '15.188.83.142';
// BACKEND_HOST_ADDRESS = 'http://localhost:3000/verify/'+emailconfirmation.key;
// BACKEND_HOST_ADDRESS = 'http://15.188.83.142:5000/verify/'+emailconfirmation.key;
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
  if(img && img !== '' && img.includes("http")) {
    return img;
  }
  return backend_url() + img;
}

export const buildImagesLinkList = (images) => {
  if(images.length > 0) {
    let imgLinks = [];
    for(let i = 0; i < images.length; i++) {
      imgLinks.push({url: get_img_url(images[i]['image'])});
    }
    return imgLinks;
  }
  return [];
}
