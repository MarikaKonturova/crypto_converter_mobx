import { makeAutoObservable } from "mobx";
import { TCoin } from "../types";

class ConverterStore {
  constructor() {
    makeAutoObservable(this);
  }

  converterValues = {
    value1: {
      name: "",
      value: "0",
      price: 0,
    },
    value2: {
      name: "",
      value: "0",
      price: 0,
    },
  };
  setSelectedCoin(name: keyof typeof this.converterValues, coin: TCoin) {
    this.converterValues[name] = {
      name: coin.name,
      price: coin.price,
      value: this.converterValues.value1.value,
    };
  }
  setValue2(value: string) {
    this.converterValues.value2 = {
      ...this.converterValues.value2,
      value: value,
    };
    this.converterValues.value1 = {
      ...this.converterValues.value1,
      value: (
        (+value * this.converterValues.value2.price) /
        this.converterValues.value1.price
      ).toString(),
    };
  }
  setValue1(value: string) {
    this.converterValues.value1 = {
      ...this.converterValues.value1,
      value: value,
    };
    this.converterValues.value2 = {
      ...this.converterValues.value2,
      value: (
        (+value * this.converterValues.value1.price) /
        this.converterValues.value2.price
      ).toString(),
    };
  }
}
export default ConverterStore;
