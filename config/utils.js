/*
 * @Author: zhy
 * @Date: 2021-08-10 11:49:40
 * @Description: 
 * @LastEditTime: 2021-08-10 14:28:22
 */

const path = require('path');
const os = require('os');
const packageConfig = require('../package.json');

// 控制台错误显示处理
exports.createNotifierCallback = () => {
  const notifier = require('node-notifier');

  return (severity, errors) => {
    if (severity !== 'error') return;

    const error = errors[0];
    const filename = error.file && error.file.split('!').pop();

    notifier.notify({
      title: packageConfig.name,
      message: `${severity}: ${error.name}`,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png'),
    });
  };
};
// 获取内网ip
exports.ipAddress = () => {
  const ifaces = os.networkInterfaces();

  for (const dev in ifaces) {
    const iface = ifaces[dev];

    for (let i = 0; i < iface.length; i++) {
      const { family, address, internal } = iface[i];

      if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
        return address;
      }
    }
  }
};
