function toNodes(r) {
  var n, v = [];
  while((n = r.iterateNext())) v.push(n);
  return v;
}

function getNamespaceAtts(result) {
  var v = [], n;
  while((n = result.iterateNext())) {
    if(n.name.indexOf(':')>0) v.unshift(n);
  }
  return v;
}

function toSnapshotResult(nodes, rt, singleItem) {
  return function() {
    var idx = 0;
    return {
      resultType: rt,
      singleNodeValue: nodes.length ? singleItem || nodes[0] : null, // TODO prob just: return nodes[0];
      snapshotLength: nodes.length,
      snapshotItem: function(i){return nodes[i];},
      iterateNext: function(){return nodes.length > idx ? nodes[idx++] : null;}
      // TODO this could probably be rewritten without any bounds check, i.e.: return nodes[idx++];
    };
  }();
}

module.exports = {
  getNamespaceAtts,
  toNodes,
  toSnapshotResult
};
