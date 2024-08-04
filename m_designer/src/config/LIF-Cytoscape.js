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

  const edgeMap = new Map();
  mapData.layouts[0].edges.forEach(edge => {
    const edgeKey = [edge.startNodeId, edge.endNodeId].sort().join('-');
    if (!edgeMap.has(edgeKey)) {
      edgeMap.set(edgeKey, {
        group: 'edges',
        data: {
          id: edge.edgeId,
          source: edge.startNodeId,
          target: edge.endNodeId,
          label: edge.edgeName,
          edgeDescription: edge.edgeDescription,
          bidirectional: false,
          sourceArrowShape: 'none',
          targetArrowShape: 'triangle',
        },
      });
    } else {
      const existingEdge = edgeMap.get(edgeKey);
      existingEdge.data.bidirectional = true;
      existingEdge.data.sourceArrowShape = 'triangle';
    }
  });

  const edges = Array.from(edgeMap.values());
  return [...nodes, ...edges];
};