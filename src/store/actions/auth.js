import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url, AUTH_TIMEOUT } from "../../configurations";
import {setUserInfo} from "./userInfo";
import { closeLoginModal } from "./loginModal";
import { closeLoginParentModal } from "./loginParentModal";
import { closeSignupModal } from "./signupModal";
import { closeSignupParentModal } from "./signupParentModal";
import {closeCompleteProfileModal} from "./completeProfileModal";
import { openVerifyYourEmail } from "./verifyYourEmail";

import {createNotification, NOTIFICATION_TYPE_SUCCESS, NOTIFICATION_TYPE_ERROR} from 'react-redux-notify';

import $ from 'jquery';
window.jQuery = $;
require('bootstrap');

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const deleteStart = () => {
  return {
    type: actionTypes.DELETE_ACCOUNT_START
  };
};


export const authSetDiscountText = (text) => {
  return {
    type: actionTypes.AUTH_SET_DISCOUNT_TEXT,
    discountText: text
  };
};

export const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
  };
};

export const signupSuccess = () => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
  };
};

export const deleteSuccess = () => {
  return {
    type: actionTypes.DELETE_ACCOUNT_SUCCESS,
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const deleteFail = error => {
  return {
    type: actionTypes.DELETE_ACCOUNT_FAIL,
    error: error
  };
};

export const logoutAction = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  localStorage.removeItem("userProfileId");
  localStorage.removeItem("username");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const logout = expirationTime => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  localStorage.removeItem("userProfileId");
  localStorage.removeItem("username");
  localStorage.removeItem("first_name");
  localStorage.removeItem("last_name");
  localStorage.removeItem("email");
  localStorage.removeItem("phone_number");
  localStorage.removeItem("profile_pic");
  localStorage.removeItem("user_type");
  localStorage.removeItem("sex");
  localStorage.removeItem("id_document");
  return dispatch => {
      type: actionTypes.AUTH_LOGOUT,
      setUserInfo(null, null, null, null, null, null, null, null, null, null, null, null)
    };
};

export const doNothing = expirationTime => {
  return dispatch => {
    };
};

export const checkAuthTimeout = expirationTime => {
   return dispatch => {
     setTimeout(() => {
       dispatch(logout());
     }, expirationTime * 100000);
   };
 };


 export const authLogin = (username, password) => {
   return dispatch => {
     dispatch(authStart());
     axios
       .post(api_url() + "/rest-auth/login/", {
         username: username,
         password: password
       })
       .then(res => {
         const token = res.data.key;
         const userId = res.data.user_id;
         const userProfileId = res.data.user_profile_id;
         const username = res.data.username;
         const first_name = res.data.first_name;
         const last_name = res.data.last_name;
         const email = res.data.email;
         const date_joined = res.data.date_joined;
         const phone_number = res.data.phone_number;
         const profile_pic = res.data.profile_pic;
         const id_document = res.data.id_document;
         const passport_number = res.data.passport_number;
         const country = res.data.country;
         const user_type = res.data.user_type;
         const sex = res.data.sex;
         const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
         localStorage.setItem("token", token);
         localStorage.setItem("expirationDate", expirationDate);
         localStorage.setItem("userId", userId);
         localStorage.setItem("username", username);
         localStorage.setItem("userProfileId", userProfileId);
         localStorage.setItem("first_name", first_name);
         localStorage.setItem("last_name", last_name);
         localStorage.setItem("email", email);
         localStorage.setItem("phone_number", phone_number);
         localStorage.setItem("profile_pic", profile_pic);
         localStorage.setItem("id_document", id_document);
         localStorage.setItem("passport_number", passport_number);
         localStorage.setItem("country", country);
         localStorage.setItem("user_type", user_type);
         localStorage.setItem("sex", sex);
         localStorage.setItem("date_joined", date_joined);
         dispatch(authSuccess(token));
         dispatch(setUserInfo(userId, username, userProfileId, first_name, last_name, email, date_joined, phone_number, profile_pic, passport_number, country, user_type, sex, id_document));
         dispatch(checkAuthTimeout(AUTH_TIMEOUT));
         dispatch(createNotification({
           message: "Login successful.",
           type: NOTIFICATION_TYPE_SUCCESS,
           duration: 10000,
           canDismiss: true,
         }));

         $("#login").modal("hide");
         $("#login").modal("hide");
         $("#login").on('hidden.bs.modal', function (e) {
          console.log("HIDDEN");
          $("#login").off('hidden.bs.modal');
          $('.modal-backdrop').remove()

         
          
        })

         dispatch(closeLoginModal());
         dispatch(closeLoginParentModal());
       })
       .catch(err => {
         dispatch(authFail(err));
         dispatch(createNotification({
           message: "Login failed. Please check your username and password.",
           type: NOTIFICATION_TYPE_ERROR,
           duration: 10000,
           canDismiss: true,
         }));
       });
   };
 };



 export const authSignup = (first_name, last_name, username, email, password1, password2, terms_conditions, user_type, with_discount) => {
   return dispatch => {
     dispatch(authStart());
     axios
       .post(api_url() + "/rest-auth/registration/", {
         first_name: first_name,
         last_name: last_name,
         username: username,
         email: email,
         password1: password1,
         password2: password2,
         terms_conditions: terms_conditions,
         user_type: user_type,
         with_discount: with_discount
       })
       .then(res => {
         dispatch(signupSuccess());
         dispatch(checkAuthTimeout(AUTH_TIMEOUT));
         dispatch(createNotification({
           message: "Signup successful.",
           type: NOTIFICATION_TYPE_SUCCESS,
           duration: 10000,
           canDismiss: true,
         }));
         dispatch(closeSignupModal());
         dispatch(closeSignupParentModal());
         dispatch(openVerifyYourEmail());
       })
       .catch(err => {
         dispatch(authFail(err));
         dispatch(createNotification({
           message: "Signup failed. Please check your information.",
           type: NOTIFICATION_TYPE_ERROR,
           duration: 10000,
           canDismiss: true,
         }));
       });
   };
 };

 export const updateUserProfile = (first_name, last_name, phone_number, email, country, passport_number, profile_pic, user_type, sex, passport_file) => {
  const config = {
            headers: { 'content-type': 'multipart/form-data' }
          };
  let data2 = {
    user_id: localStorage.getItem("userId"),
    user_profile_id: localStorage.getItem("userProfileId"),
    first_name: first_name,
    last_name: last_name,
    phone_number: phone_number,
    email: email,
    country: country,
    passport_number: passport_number,
    user_type: user_type,
    sex: sex
  }
  let data = new FormData();
  for( let key in data2 ) {
    data.append(key, data2[key]);
  }
  if(profile_pic && profile_pic[0] && profile_pic !== null && profile_pic !== "") {
    data.append('profile_pic', profile_pic[0], profile_pic[0]['name']);
  }
  if(passport_file && passport_file[0] && passport_file !== null && passport_file !== "") {
    data.append('id_document', passport_file[0], passport_file[0]['name']);
  }
  return dispatch => {
    dispatch(authStart());
    axios
      .post(api_url() + "/user/update_profile", data, config)
      .then(res => {
        const token = res.data.key;
        const userId = res.data.user_id;
        const username = res.data.username;
        const userProfileId = res.data.user_profile_id;
        const first_name = res.data.first_name;
        const last_name = res.data.last_name;
        const email = res.data.email;
        const date_joined = res.data.date_joined;
        const phone_number = res.data.phone_number;
        const profile_pic = res.data.profile_pic;
        const id_document = res.data.id_document;
        const passport_number = res.data.passport_number;
        const country = res.data.country;
        const user_type = res.data.user_type;
        const sex = res.data.sex;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", userId);
        localStorage.setItem("username", username);
        localStorage.setItem("userProfileId", userProfileId);
        localStorage.setItem("first_name", first_name);
        localStorage.setItem("last_name", last_name);
        localStorage.setItem("email", email);
        localStorage.setItem("phone_number", phone_number);
        localStorage.setItem("id_document", id_document);
        localStorage.setItem("profile_pic", profile_pic);
        localStorage.setItem("passport_number", passport_number);
        localStorage.setItem("country", country);
        localStorage.setItem("user_type", user_type);
        localStorage.setItem("sex", sex);
        localStorage.setItem("date_joined", date_joined);
        dispatch(authSuccess(token));
        dispatch(setUserInfo(userId, username, userProfileId, first_name, last_name, email, date_joined, phone_number, profile_pic, passport_number, country, user_type, sex, id_document));
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        dispatch(createNotification({
          message: "Profile updated successfully",
          type: NOTIFICATION_TYPE_SUCCESS,
          duration: 10000,
          canDismiss: true,
        }));
      })
      .catch(err => {
        dispatch(authFail(err));
        dispatch(createNotification({
          message: "Failed to update profile. Check your entry",
          type: NOTIFICATION_TYPE_ERROR,
          duration: 10000,
          canDismiss: true,
        }));
      });
  };
};


export const completeProfileInfo = (first_name, last_name, phone_number, country, passport_number, sex, passport_file) => {
  const config = {
            headers: { 'content-type': 'multipart/form-data' }
          };
  let data2 = {
    user_id: localStorage.getItem("userId"),
    user_profile_id: localStorage.getItem("userProfileId"),
    first_name: first_name,
    last_name: last_name,
    phone_number: phone_number,
    country: country,
    passport_number: passport_number,
    sex: sex
  }
  let data = new FormData();
  for( let key in data2 ) {
    data.append(key, data2[key]);
  }
  if(passport_file && passport_file[0] && passport_file !== null && passport_file !== "") {
    data.append('id_document', passport_file[0], passport_file[0]['name']);
  }
  return dispatch => {
    dispatch(authStart());
    axios
      .post(api_url() + "/user/complete_profile", data, config)
      .then(res => {
        const token = res.data.key;
        const userId = res.data.user_id;
        const username = res.data.username;
        const userProfileId = res.data.user_profile_id;
        const first_name = res.data.first_name;
        const last_name = res.data.last_name;
        const date_joined = res.data.date_joined;
        const phone_number = res.data.phone_number;
        const passport_number = res.data.passport_number;
        const country = res.data.country;
        const sex = res.data.sex;
        const id_document = res.data.id_document;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", userId);
        localStorage.setItem("username", username);
        localStorage.setItem("userProfileId", userProfileId);
        localStorage.setItem("first_name", first_name);
        localStorage.setItem("last_name", last_name);
        localStorage.setItem("id_document", id_document);
        localStorage.setItem("phone_number", phone_number);
        localStorage.setItem("passport_number", passport_number);
        localStorage.setItem("country", country);
        localStorage.setItem("sex", sex);
        localStorage.setItem("date_joined", date_joined);
        const email = localStorage.getItem("email");
        const user_type = localStorage.getItem("user_type");
        const profile_pic = localStorage.getItem("profile_pic");
        dispatch(authSuccess(token));
        dispatch(closeCompleteProfileModal());
        dispatch(setUserInfo(userId, username, userProfileId, first_name, last_name, email, date_joined, phone_number, profile_pic, passport_number, country, user_type, sex, id_document));
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        dispatch(createNotification({
          message: "Profile updated successfully",
          type: NOTIFICATION_TYPE_SUCCESS,
          duration: 10000,
          canDismiss: true,
        }));
      })
      .catch(err => {
        dispatch(authFail(err));
        dispatch(createNotification({
          message: "Failed to update profile. Check your entry",
          type: NOTIFICATION_TYPE_ERROR,
          duration: 10000,
          canDismiss: true,
        }));
      });
  };
};


 export const deleteAccount = (userProfileId) => {
   return dispatch => {
     dispatch(deleteStart());
     axios
       .delete(api_url() + "/user/user_account/"+userProfileId+"/", {})
       .then(res => {
         dispatch(checkAuthTimeout(AUTH_TIMEOUT));
         dispatch(deleteSuccess());
         dispatch(createNotification({
           message: "You have deleted your account successfully.",
           type: NOTIFICATION_TYPE_SUCCESS,
           duration: 10000,
           canDismiss: true,
         }));
         dispatch(logout());
         window.location.href = '/'
       })
       .catch(err => {
         dispatch(deleteFail(err));
         dispatch(createNotification({
           message: "Failed to delete your account.",
           type: NOTIFICATION_TYPE_ERROR,
           duration: 10000,
           canDismiss: true,
         }));
       });
   };
 };


 export const googleLogin = (values) => {
  return dispatch => {
    axios
      .post(api_url() + "/rest-auth/google/connect", {'access_token': values['accessToken']})
      .then(res => {
        const token = res.data.key;
        const userId = res.data.user_id;
        const userProfileId = res.data.user_profile_id;
        const username = res.data.username;
        const first_name = res.data.first_name;
        const last_name = res.data.last_name;
        const email = res.data.email;
        const date_joined = res.data.date_joined;
        const phone_number = res.data.phone_number;
        const profile_pic = res.data.profile_pic;
        const id_document = res.data.id_document;
        const passport_number = res.data.passport_number;
        const country = res.data.country;
        const user_type = res.data.user_type;
        const sex = res.data.sex;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", userId);
        localStorage.setItem("username", username);
        localStorage.setItem("userProfileId", userProfileId);
        localStorage.setItem("first_name", first_name);
        localStorage.setItem("last_name", last_name);
        localStorage.setItem("email", email);
        localStorage.setItem("phone_number", phone_number);
        localStorage.setItem("profile_pic", profile_pic);
        localStorage.setItem("id_document", id_document);
        localStorage.setItem("passport_number", passport_number);
        localStorage.setItem("country", country);
        localStorage.setItem("date_joined", date_joined);
        localStorage.setItem("user_type", user_type);
        localStorage.setItem("sex", sex);
        dispatch(authSuccess(token));
        dispatch(setUserInfo(userId, username, userProfileId, first_name, last_name, email, date_joined, phone_number, profile_pic, passport_number, country, user_type, sex, id_document));
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        dispatch(createNotification({
          message: "Google Login successful.",
          type: NOTIFICATION_TYPE_SUCCESS,
          duration: 10000,
          canDismiss: true,
        }));
        dispatch(closeLoginParentModal()); 
        dispatch(closeSignupParentModal());
      })
      .catch(err => {
        console.log("IN AUTH GOOGLE LOGIN CATCH",err);

        /*NELSON COMMENTED THIS*/
        // dispatch(createNotification({
        //   message: "Google signup setup failed.",
        //   type: NOTIFICATION_TYPE_ERROR,
        //   duration: 10000,
        //   canDismiss: true,
        // }));
      });
  };
 };

 export const facebookLogin = (values) => {
  return dispatch => {
    axios
      .post(api_url() + "/rest-auth/facebook/connect", {'access_token': values['accessToken']})
      .then(res => {
        const token = res.data.key;
        const userId = res.data.user_id;
        const userProfileId = res.data.user_profile_id;
        const username = res.data.username;
        const first_name = res.data.first_name;
        const last_name = res.data.last_name;
        const email = res.data.email;
        const date_joined = res.data.date_joined;
        const phone_number = res.data.phone_number;
        const profile_pic = res.data.profile_pic;
        const id_document = res.data.id_document;
        const passport_number = res.data.passport_number;
        const country = res.data.country;
        const user_type = res.data.user_type;
        const sex = res.data.sex;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", userId);
        localStorage.setItem("username", username);
        localStorage.setItem("userProfileId", userProfileId);
        localStorage.setItem("first_name", first_name);
        localStorage.setItem("last_name", last_name);
        localStorage.setItem("email", email);
        localStorage.setItem("phone_number", phone_number);
        localStorage.setItem("profile_pic", profile_pic);
        localStorage.setItem("id_document", id_document);
        localStorage.setItem("passport_number", passport_number);
        localStorage.setItem("country", country);
        localStorage.setItem("date_joined", date_joined);
        localStorage.setItem("user_type", user_type);
        localStorage.setItem("sex", sex);
        dispatch(authSuccess(token));
        dispatch(setUserInfo(userId, username, userProfileId, first_name, last_name, email, date_joined, phone_number, profile_pic, passport_number, country, user_type, sex, id_document));
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        dispatch(createNotification({
          message: "Facebook Login successful.",
          type: NOTIFICATION_TYPE_SUCCESS,
          duration: 10000,
          canDismiss: true,
        }));
        dispatch(closeLoginParentModal());
        dispatch(closeSignupParentModal());
      })
      .catch(err => {
        dispatch(createNotification({
          message: "Facebook signup failed.",
          type: NOTIFICATION_TYPE_ERROR,
          duration: 10000,
          canDismiss: true,
        }));
      });
  };
 };

 export const forgotPassword = (email) => {
   return dispatch => {
     axios
       .post(api_url() + "/rest-auth/password/reset/", {'email': email})
       .then(res => {
         dispatch(checkAuthTimeout(AUTH_TIMEOUT));
         dispatch(createNotification({
           message: "Password reset link sent.",
           type: NOTIFICATION_TYPE_SUCCESS,
           duration: 10000,
           canDismiss: true,
         }));
         dispatch(closeLoginParentModal());
         dispatch(closeSignupParentModal());
       })
       .catch(err => {
         dispatch(createNotification({
           message: "Failed to send password reset link",
           type: NOTIFICATION_TYPE_ERROR,
           duration: 10000,
           canDismiss: true,
         }));
       });
   };
 };

 export const resetPassword = (uid, token, password1, password2) => {
   return dispatch => {
     axios
       .post(api_url() + "/rest-auth/password/reset/confirm/", {'uid': uid, 'token': token, 'new_password1': password1, 'new_password2': password2})
       .then(res => {
         dispatch(checkAuthTimeout(AUTH_TIMEOUT));
         dispatch(createNotification({
           message: "Password set successfully.",
           type: NOTIFICATION_TYPE_SUCCESS,
           duration: 10000,
           canDismiss: true,
         }));
       })
       .catch(err => {
         dispatch(createNotification({
           message: "Failed to set password",
           type: NOTIFICATION_TYPE_ERROR,
           duration: 10000,
           canDismiss: true,
         }));
       });
   };
 };


export const authCheckState = () => {
   return dispatch => {
     const token = localStorage.getItem("token");
     const userId = localStorage.getItem("userId");
     const userProfileId = localStorage.getItem("userProfileId");
     const username = localStorage.getItem("username");
     const first_name = localStorage.getItem("first_name");
     const last_name = localStorage.getItem("last_name");
     const email = localStorage.getItem("email");
     const phone_number = localStorage.getItem("phone_number");
     const profile_pic = localStorage.getItem("profile_pic");
     const id_document = localStorage.getItem("id_document");
     const passport_number = localStorage.getItem("passport_number");
     const country = localStorage.getItem("country");
     const date_joined = localStorage.getItem("date_joined");
     const user_type = localStorage.getItem("user_type");
     const sex = localStorage.getItem("sex");
     if (token === undefined) {
       dispatch(logout());
     } else {
       const expirationDate = new Date(localStorage.getItem("expirationDate"));
       if (expirationDate <= new Date()) {
         dispatch(logout());
       } else {
         dispatch(authSuccess(token));
         dispatch(setUserInfo(userId, username, userProfileId, first_name, last_name, email, date_joined, phone_number, profile_pic, passport_number, country, user_type, sex, id_document));
         dispatch(
           checkAuthTimeout(
             (expirationDate.getTime() - new Date().getTime()) / 1000
           )
         );
       }
     }
   };
 };