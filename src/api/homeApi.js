import $axios from '@src/axios/axios';

const loginApi = (data) => $axios('regUser', {
  method: 'POST',
  data,
});

export { loginApi };
