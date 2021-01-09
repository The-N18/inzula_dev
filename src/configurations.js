export const DEBUG = true;
//export const BACKEND_HOST_ADDRESS = DEBUG ? '127.0.0.1' : '35.181.124.82';
export const BACKEND_HOST_ADDRESS = DEBUG ? '127.0.0.1' : 'dkx1b8wlo613w.cloudfront.net';
export const BACKEND_HOST_PORT = '8000';
export const BACKEND_HTTP_PROTOCOL = DEBUG ? 'http' : 'https';
export const AUTH_TIMEOUT = 3600;

export const GOOGLE_CLIENT_ID = "1018467540475-2dsdk3lijubc8ln26ooa63lg83dsa8fm.apps.googleusercontent.com"
export const FACEBOOK_APP_ID = "136854898060654"

const DO_NOT_APPEND = ['127.0.0.1', 'localhost'];

export const backend_url = () => {
  if(DEBUG) {
    return BACKEND_HTTP_PROTOCOL + "://" + BACKEND_HOST_ADDRESS + ":" + BACKEND_HOST_PORT;
  } else {
    return BACKEND_HTTP_PROTOCOL + "://" + BACKEND_HOST_ADDRESS;
  }
}

export const api_url = () => {
  if(DEBUG) {
    return BACKEND_HTTP_PROTOCOL + "://" + BACKEND_HOST_ADDRESS + ":" + BACKEND_HOST_PORT;
  } else {
    return BACKEND_HTTP_PROTOCOL + "://" + BACKEND_HOST_ADDRESS;
  }
}

export const get_img_url = (img) => {
  if(img && img !== '' && img.includes("http")) {
    return img;
  }
  return backend_url() + img;
}

export const buildImagesLinkList = (images) => {
  if(images.length > 0) {
    let max_img = images.length > 3 ? 3 : images.length;
    let imgLinks = [];
    for(let i = 0; i < max_img; i++) {
      imgLinks.push({url: get_img_url(images[i]['image'])});
    }
    return imgLinks;
  }
  return [];
}

export const isProfileComplete = (localstorage) => {
  const token = localStorage.getItem("token");
  const uname = localStorage.getItem("username");
  const fname = localStorage.getItem("first_name");
  const lname = localStorage.getItem("last_name");
  const phone = localStorage.getItem("phone_number");
  const passp = localStorage.getItem("passport_number");
  const ctry = localStorage.getItem("country");
  const sex = localStorage.getItem("sex");
  if(token !== "" && uname !== "" && fname !== "" && lname !== "" && phone !== "" && phone !== null && phone !== "undefined" && phone !== "0" && passp !== ""  && passp !== null  && passp !== "undefined" && ctry !== "" && ctry !== "undefined" && ctry !== null && sex !== "" && sex !== "undefined" && sex !== null) {
    return true;
  }
  return false;
}
