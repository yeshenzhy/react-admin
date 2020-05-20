import Qs from 'qs';

// 解析url参数
const urlParams = (params) => Qs.parse(params, { ignoreQueryPrefix: true });

export { urlParams };
