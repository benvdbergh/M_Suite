export class Station {
  constructor(stationId, interactionNodeIds, stationName, stationDescription, stationHeight, stationPosition) {
    this.stationId = stationId;
    this.interactionNodeIds = interactionNodeIds;
    this.stationName = stationName;
    this.stationDescription = stationDescription;
    this.stationHeight = stationHeight;
    this.stationPosition = stationPosition;
  }

  static fromJSON(json) {
    const stationPosition = StationPosition.fromJSON(json.stationPosition);
    return new Station(
      json.stationId,
      json.interactionNodeIds,
      json.stationName,
      json.stationDescription,
      json.stationHeight,
      stationPosition
    );
  }

  toJSON() {
    return {
      stationId: this.stationId,
      interactionNodeIds: this.interactionNodeIds,
      stationName: this.stationName,
      stationDescription: this.stationDescription,
      stationHeight: this.stationHeight,
      stationPosition: this.stationPosition.toJSON()
    };
  }
}

export class StationPosition {
  constructor(x, y, theta) {
    this.x = x;
    this.y = y;
    this.theta = theta;
  }

  static fromJSON(json) {
    return new StationPosition(
      json.x,
      json.y,
      json.theta
    );
  }

  toJSON() {
    return {
      x: this.x,
      y: this.y,
      theta: this.theta
    };
  }
}