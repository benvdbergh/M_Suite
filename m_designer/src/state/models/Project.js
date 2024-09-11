import { Layout } from './Layout';

export class Project {
  constructor(metaInformation, layouts) {
    this.metaInformation = metaInformation;
    this.layouts = layouts;
  }

  static fromJSON(json) {
    const metaInformation = MetaInformation.fromJSON(json.metaInformation);
    const layouts = json.layouts.map(layout => Layout.fromJSON(layout));
    return new Project(metaInformation, layouts);
  }

  toJSON() {
    return {
      metaInformation: this.metaInformation.toJSON(),
      layouts: this.layouts.map(layout => layout.toJSON())
    };
  }
}

  
export class MetaInformation {
  constructor(projectIdentification, creator, exportTimestamp, lifVersion) {
    this.projectIdentification = projectIdentification;
    this.creator = creator;
    this.exportTimestamp = exportTimestamp;
    this.lifVersion = lifVersion;
  }
  
  static fromJSON(json) {
    return new MetaInformation(
      json.projectIdentification,
      json.creator,
      json.exportTimestamp,
      json.lifVersion
    );
  }
  
  toJSON() {
    return {
      projectIdentification: this.projectIdentification,
      creator: this.creator,
      exportTimestamp: this.exportTimestamp,
      lifVersion: this.lifVersion
    };
  }
}