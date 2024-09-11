export class LoadRestriction {
  constructor(unloaded, loaded, loadSetNames) {
    this.unloaded = unloaded;
    this.loaded = loaded;
    this.loadSetNames = loadSetNames;
  }

  static fromJSON(json) {
    return new LoadRestriction(
      json.unloaded,
      json.loaded,
      json.loadSetNames
    );
  }

  toJSON() {
    return {
      unloaded: this.unloaded,
      loaded: this.loaded,
      loadSetNames: this.loadSetNames
    };
  }
}