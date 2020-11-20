import Qs from 'qs';

// 解析url参数
const urlParams = (params) => { return Qs.parse(params, { ignoreQueryPrefix: true }); };

export { urlParams };
