import { observable, action } from 'mobx';

class AppState {
  // 装饰器@
  @observable timer = 0;
  @observable collapse = false
  @action
  setCollapse() {
    this.collapse = !this.collapse;
  }
}

export default new AppState();

