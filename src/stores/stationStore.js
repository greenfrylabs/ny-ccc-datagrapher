import { observable, action, when } from "mobx";

export default class StationStore {
  app;
  constructor(app) {
    this.app = app;
    when(() => this.stations.size === 0, () => this.loadStations());
  }

  @observable stations = new Map();

  @action
  updateStations = json =>
    json.forEach(blockJson =>
      this.stations.set(blockJson.properties.name, blockJson)
    );

  @action
  loadStations() {
    this.app
      .fetch("/data/stn.json")
      .then(json => {
        // console.log(json.features);
        this.updateStations(json.features);
      })
      .catch(err => {
        console.log("Failed to load stations", err);
      });
  }
}
