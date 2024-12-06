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

  static loadProject(project) {
    if (!project) {
      console.warn('Project.getLayouts called with null project:', project);
      return [];
    }
    var projectMetaInformation = {};
    var layouts = {};
    var nodes = {};
    var edges = {};
    var stations = {};
    var vehicleTypeNodeProperties = {};
    var vehicleTypeEdgeProperties = {};

    if (project.metaInformation) {
      projectMetaInformation = MetaInformation.fromJSON(project.metaInformation).toJSON();
    }
    
    if (project.layouts) {
      project.layouts.forEach(layout => {
        layouts[layout.layoutId] = {
          layoutId: layout.layoutId, 
          layoutName: layout.layoutName, 
          layoutVersion: layout.layoutVersion, 
          layoutLevelId: layout.layoutLevelId, 
          layoutDescription: layout.layoutDescription
        }

        if (layout.nodes) {
          layout.nodes.forEach(node => {
            nodes[node.nodeId] = {
              layoutId: layout.layoutId,
              nodeId: node.nodeId,
              nodeName: node.nodeName,
              nodeDescription: node.nodeDescription,
              mapId: node.mapId,
              nodePosition: node.nodePosition
            };
            if (node.vehicleTypeNodeProperties) {
              node.vehicleTypeNodeProperties.forEach(vehicleTypeNodeProperty => {
                vehicleTypeNodeProperties[vehicleTypeNodeProperty.vehicleTypeNodePropertyId] = {
                  nodeId: node.nodeId,
                  vehicleTypeNodePropertyId: vehicleTypeNodeProperty.vehicleTypeNodePropertyId,
                  vehicleTypeNodePropertyName: vehicleTypeNodeProperty.vehicleTypeNodePropertyName,
                  vehicleTypeNodePropertyDescription: vehicleTypeNodeProperty.vehicleTypeNodePropertyDescription,
                  vehicleTypeNodePropertyValue: vehicleTypeNodeProperty.vehicleTypeNodePropertyValue,
                  vehicleTypeNodePropertyUnit: vehicleTypeNodeProperty.vehicleTypeNodePropertyUnit,
                  vehicleTypeNodePropertyDataType: vehicleTypeNodeProperty.vehicleTypeNodePropertyDataType,
                  vehicleTypeNodePropertyMinValue: vehicleTypeNodeProperty.vehicleTypeNodePropertyMinValue,
                  vehicleTypeNodePropertyMaxValue: vehicleTypeNodeProperty.vehicleTypeNodePropertyMaxValue,
                  vehicleTypeNodePropertyDefaultValue: vehicleTypeNodeProperty.vehicleTypeNodePropertyDefaultValue,
                };
              });
            }
          });
        }
        if (layout.edges) {
          layout.edges.forEach(edge => {
            edges[edge.edgeId] = {
              layoutId: layout.layoutId,
              edgeId: edge.edgeId,
              edgeName: edge.edgeName,
              edgeDescription: edge.edgeDescription,
              startNodeId: edge.startNodeId,
              endNodeId: edge.endNodeId
            };
            if (edge.vehicleTypeEdgeProperties) {
              edge.vehicleTypeEdgeProperties.forEach(vehicleTypeEdgeProperty => {
                vehicleTypeEdgeProperties[vehicleTypeEdgeProperty.vehicleTypeEdgePropertyId] = {
                  edgeId: edge.edgeId,
                  vehicleTypeEdgePropertyId: vehicleTypeEdgeProperty.vehicleTypeEdgePropertyId,
                  vehicleTypeEdgePropertyName: vehicleTypeEdgeProperty.vehicleTypeEdgePropertyName,
                  vehicleTypeEdgePropertyDescription: vehicleTypeEdgeProperty.vehicleTypeEdgePropertyDescription,
                  vehicleTypeEdgePropertyValue: vehicleTypeEdgeProperty.vehicleTypeEdgePropertyValue,
                  vehicleTypeEdgePropertyUnit: vehicleTypeEdgeProperty.vehicleTypeEdgePropertyUnit,
                  vehicleTypeEdgePropertyDataType: vehicleTypeEdgeProperty.vehicleTypeEdgePropertyDataType,
                  vehicleTypeEdgePropertyMinValue: vehicleTypeEdgeProperty.vehicleTypeEdgePropertyMinValue,
                  vehicleTypeEdgePropertyMaxValue: vehicleTypeEdgeProperty.vehicleTypeEdgePropertyMaxValue,
                  vehicleTypeEdgePropertyDefaultValue: vehicleTypeEdgeProperty.vehicleTypeEdgePropertyDefaultValue,
                };
              });
            }
          });
        }
        if (layout.stations) {
          layout.stations.forEach(station => {
            stations[station.stationId] = {
              layoutId: layout.layoutId,
              stationId: station.stationId,
              stationName: station.stationName,
              stationDescription: station.stationDescription,
              stationHeight: station.stationHeight,
              stationPosition: station.stationPosition
            };
          });
        }
      });
    }
    return { projectMetaInformation, layouts, nodes, edges, vehicleTypeNodeProperties, vehicleTypeEdgeProperties, stations};
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