import axios from "axios";
import { computed, observable, action, makeAutoObservable } from "mobx";
import { TCoin, TCoinDiff } from "../types";
import { stores } from "./RootStateContext";

class CurrenciesStore {
  public coins: TCoin[] = [];
  public diffCoin: TCoinDiff = {};

  constructor() {
    makeAutoObservable(this);
  }
  get getCoins() {
    return this.coins;
  }
  get getDiffCoin() {
    return this.diffCoin;
  }
  diffCurrencies = (arr1: TCoin[], arr2: TCoin[]) => {
    return arr1.filter((obj, index) => {
      if (obj.price !== arr2[index].price) {
        return true;
      }
      return false;
    });
  };

  setCoins = (coins: TCoin[]): void => {
    this.diffCoin = this.diffCurrencies(this.coins, coins).reduce(
      (initCoin: TCoinDiff, coin: TCoin) => {
        const newCoin = coins.find((nc) => nc.name === coin.name)!;
        const oldCoin: TCoin = this.coins.find(
          (coin) => coin.name === newCoin.name
        )!;
        const color: string =
          oldCoin.price > newCoin.price ? "#ff4d4d" : "#d9ffb3";
        initCoin[newCoin.name] = color;
        return initCoin;
      },
      {}
    );
    if (this.coins.length > 0) {
      setTimeout(() => (this.coins = coins), 10000);
    } else {
      this.coins = coins;
    }
  };
  fetchCoins = () => {
    axios
      .get(
        "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD"
      )
      .then(({ data: { Data } }) => {
        const coins: TCoin[] = Data.map((coin: any) => {
          const obj: TCoin = {
            id: coin.CoinInfo.Id,
            name: coin.CoinInfo.Name,
            fullName: coin.CoinInfo.FullName,
            imgURL: `https://www.cryptocompare.com/${coin.CoinInfo.ImageUrl}`,
            price: coin.RAW.USD.PRICE.toFixed(2),
            volume24hour: parseInt(coin.RAW.USD.VOLUME24HOUR),
          };
          return obj;
        });
        this.setCoins(coins);
        stores.converterStore.setSelectedCoin("value1", coins[0]);
        stores.converterStore.setSelectedCoin("value2", coins[1]);
      });
  };
}

export default CurrenciesStore;
