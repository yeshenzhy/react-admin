import $axios from '@src/axios/axios';

const loginApi = (data) => {
  return $axios('login', {
    method: 'POST',
    data,
  }); 
};
const registerApi = (data) => {
  return $axios('regUser', {
    method: 'POST',
    data,
  }); 
};
export { loginApi, registerApi };
