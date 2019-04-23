import { action, observable } from "mobx";

export default class AppStore {
  @observable open: boolean;

  constructor() {
    this.open = false;
  }

  @action handleClose() {
    this.open = false;
  }

  @action handleClick() {
    this.open = true;
  }
}
