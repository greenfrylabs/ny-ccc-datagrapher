import { observable, action } from "mobx";

import CountyStore from "../stores/countyStore";
import StateStore from "../stores/stateStore";
import BasinStore from "../stores/basinStore";
import StationStore from "../stores/stationStore";
import BlockStore from "../stores/blockStore";

import { geoms } from "../api";

export default class AppStore {
  fetch;
  history;
  countyStore;
  stateStore;
  basinStore;
  stationStore;
  blockStore;
  constructor(fetcher, history) {
    this.fetch = fetcher;
    this.history = history;
    this.countyStore = new CountyStore(this);
    this.stateStore = new StateStore(this);
    this.basinStore = new BasinStore(this);
    this.stationStore = new StationStore(this);
    this.blockStore = new BlockStore(this);
  }

  get counties() {
    return this.countyStore.counties;
  }

  get states() {
    return this.stateStore.states;
  }

  get basins() {
    return this.basinStore.basins;
  }

  get stations() {
    // console.log(this.stationStore.stations);
    return this.stationStore.stations;
  }

  get geoms() {
    return geoms;
  }

  get bStore() {
    return this.blockStore;
  }

  get blocks() {
    return this.blockStore.blocks;
  }

  @observable isModal = false;
  @action toggleModal = () => (this.isModal = !this.isModal);
}
