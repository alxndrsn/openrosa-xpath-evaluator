function toSnapshotResult(nodes, rt, singleItem) {
  return function() {
    var idx = 0;
    return {
      resultType: rt,
      singleNodeValue: nodes.length ? singleItem || nodes[0] : null,
      snapshotLength: nodes.length,
      snapshotItem: function(i){return nodes[i];},
      iterateNext: function(){return nodes.length > idx ? nodes[idx++] : null;}
    };
  }();
}

module.exports = {
  toSnapshotResult
};
