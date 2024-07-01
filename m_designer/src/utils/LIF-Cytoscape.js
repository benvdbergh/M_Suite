export const convertToLIF = (elements) => {
  const nodes = elements
    .filter(el => el.group === 'nodes')
    .map(node => ({
      nodeId: node.data.id,
      nodeName: node.data.nodeName,
      nodeDescription: node.data.nodeDescription,
      mapId: node.data.mapId || 'defaultMapId',
      nodePosition: node.position,
      vehicleTypeNodeProperties: node.data.vehicleTypeNodeProperties || [],
    }));

  const edges = elements
    .filter(el => el.group === 'edges')
    .map(edge => ({
      edgeId: edge.data.id,
      edgeName: edge.data.label,
      edgeDescription: edge.data.edgeDescription,
      startNodeId: edge.data.source,
      endNodeId: edge.data.target,
      vehicleTypeEdgeProperties: edge.data.vehicleTypeEdgeProperties || [],
    }));

  return {
    metaInformation: {
      projectIdentification: 'defaultProjectId',
      creator: 'defaultCreator',
      exportTimestamp: new Date().toISOString(),
      lifVersion: '1.0.0',
    },
    layouts: [
      {
        layoutId: 'defaultLayoutId',
        layoutName: 'defaultLayoutName',
        layoutVersion: '1.0.0',
        layoutLevelId: 'defaultLayoutLevelId',
        layoutDescription: 'defaultLayoutDescription',
        nodes,
        edges,
      }
    ]
  };
};

export const addMetaData = (mapData) => {
  const nodes = mapData.layouts[0].nodes
  const edges = mapData.layouts[0].edges

  return {
    metaInformation: {
      projectIdentification: 'defaultProjectId',
      creator: 'defaultCreator',
      exportTimestamp: new Date().toISOString(),
      lifVersion: '1.0.0',
    },
    layouts: [
      {
        layoutId: 'defaultLayoutId',
        layoutName: 'defaultLayoutName',
        layoutVersion: '1.0.0',
        layoutLevelId: 'defaultLayoutLevelId',
        layoutDescription: 'defaultLayoutDescription',
        nodes,
        edges,
      }
    ]
  };
};

export const convertToCytoscapeElements = (mapData) => {
  const nodes = mapData.layouts[0].nodes.map(node => ({
    group: 'nodes',
    id: node.nodeId,
    data: {
      id: node.nodeId,
      group: 'nodes',
      label: node.nodeName,
      nodeName: node.nodeName,
      nodeDescription: node.nodeDescription,
      nodePosition: node.nodePosition,
    },
    position: node.nodePosition,
  }));

  const edges = mapData.layouts[0].edges.map(edge => ({
    group: 'edges',
    id: edge.edgeId,
    data: {
      id: edge.edgeId,
      group: 'edges',
      source: edge.startNodeId,
      target: edge.endNodeId,
      label: edge.edgeName,
      edgeDescription: edge.edgeDescription,
    },
  }));
  return [...nodes, ...edges];
};