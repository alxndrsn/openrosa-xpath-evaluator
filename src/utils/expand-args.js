module.exports = function(args) {
  var expanded = [ [] ];
  args.forEach(arg => {
    if(Array.isArray(arg)) {
      const reExpanded = [];
      arg.forEach(a => {
        expanded.forEach(exp => {
          reExpanded.push([ ...exp, a ]);
        });
      });
      expanded = reExpanded;
    } else {
      expanded.forEach(ls => ls.push(arg));
    }
  });
  return expanded;
};
