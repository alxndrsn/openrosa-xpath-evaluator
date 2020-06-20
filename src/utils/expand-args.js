module.exports = function(args) {
  var expanded = [ [] ];
  args.forEach(arg => {
    if(Array.isArray(arg)) {
      const reExpanded = [];
      arg.forEach(a => {
      	expanded.forEach(exp => {
	  dbg('adding', { a, exp, reExpanded });
	  reExpanded.push([ ...exp, a ]);
	});
      });
      expanded = reExpanded;
    } else {
      expanded.forEach(ls => ls.push(arg));
    }
  });
  dbg('returning:', { expanded });
  return expanded;
};

function dbg(...args) {
  console.log('expandArgs()', ...args.map(JSON.stringify));
}
