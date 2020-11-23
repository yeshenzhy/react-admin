import $axios from '@src/axios/axios';

const loginApi = (data) => $axios('login', {
  method: 'POST',
  data,
});
const registerApi = (data) => $axios('regUser', {
  method: 'POST',
  data,
});
const testApi = (data) => $axios('test', {
  method: 'POST',
  data,
});

export { loginApi, registerApi, testApi };
