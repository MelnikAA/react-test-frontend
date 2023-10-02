import { makeObservable, observable, action } from "mobx";

class DirectionStore {
  selectedDirection: "frontend" | "backend" | null = null;

  constructor() {
    makeObservable(this, {
      selectedDirection: observable,
      setDirection: action,
    });
  }

  setDirection(direction: "frontend" | "backend") {
    this.selectedDirection = direction;
  }
}

export default new DirectionStore();
