import { observable, action } from 'mobx';

class AppState {
  // 侧边导航展开收起
  @observable timer = 0;
  @observable collapse = false
  @action
  setCollapse() {
    this.collapse = !this.collapse;
  }
  // 用户信息
  @observable userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
  @action
  setUserInfo(data) {
    this.userInfo = data || {};
  }
}

export default new AppState();

