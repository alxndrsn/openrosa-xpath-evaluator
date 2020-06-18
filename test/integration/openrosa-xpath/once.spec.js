const { assertStringValue, initDoc } = require('../../helpers');

describe('once()', () => {
  [
    [ 'FunctionSelectedCaseEmpty', 'once("aa")',    'aa' ],

    // controversial: attempt to change value to NaN of empty node
    [ 'FunctionSelectedCaseEmpty', 'once(. * 10)',    '' ],

    // controversial: attempt to change value to Infinity of empty node
    [ 'FunctionSelectedCaseEmpty', 'once(1 div 0)',   '' ],

    // attempt to change value of node with existing value'
    [ 'FunctionSelectedCaseSingle', 'once("aa")', 'ab' ],
  ].forEach(([ selecter, expr, expected ]) => {
    it(`should evaluate '${expr}' on #${selecter} as '${expected}'`, () => {
      const doc = initDoc(`
        <div id="FunctionSelectedCase">
          <div id="FunctionSelectedCaseEmpty"></div>
          <div id="FunctionSelectedCaseSingle">ab</div>
          <div id="FunctionSelectedCaseMultiple">ab cd ef gh</div>
          <div id="FunctionSelectedCaseMultiple">ij</div>
        </div>`);

      const node = doc.getElementById(selecter);
      assertStringValue(node, null, expr, expected);
    });
  });
});
