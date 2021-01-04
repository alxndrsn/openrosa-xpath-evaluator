const { initDoc, assertStringValue } = require('../helpers');

describe('#if()', () => {
  it('should return first option if true', () => {
    assertStringValue('if(true(), "a", "b")', 'a');
    assertStringValue('if(true(), 5, "abc")', 5);
  });

  it('should return second option if false', () => {
    assertStringValue('if(false(), "a", "b")', 'b');
    assertStringValue('if(false(), 5, "abc")', 'abc');
    assertStringValue('if(6 > 7, 5, "abc")', 'abc');
    assertStringValue('if("", 5, "abc")', 'abc');
  });

  describe('should evaluate node', () => {
    const doc = initDoc(`
      <div id="FunctionChecklistCase">
        <div id="FunctionChecklistCaseNo">no</div>
        <div id="FunctionChecklistCaseEmpty"></div>
        <div id="FunctionChecklistCase0">0</div>
      </div>`);

    it(`should evaluate an existing node as true`, () => {
      const node = doc.getElementById('FunctionChecklistCaseEmpty');
      assertStringValue(node, null, 'if(self::node(), "exists", "does not exist")', 'exists');
    });

    it(`should evaluate a non-existing node as false`, () => {
      assertStringValue(null, null, 'if(/unreal, "exists", "does not exist")', 'does not exist');
    });

    // TODO: fails with exception 'r' is undefined (Firefox) and 't' is undefined (Chrome)
    it(`should evaluate an "and" expression that checks values of nodes (1)`, () => {
      const node = doc.getElementById('FunctionChecklistCase0');
      assertStringValue(node, null, 'if(. != "0" and /div/div[@id="FunctionCheckListCaseEmpty"] != "", "yes", "no")', 'no');
    });

    it(`should evaluate an "and" expression that checks values of nodes (2)`, () => {
      const node = doc.getElementById('FunctionChecklistCase0');
      assertStringValue(node, null, 'if(. = "0" and /div/div[@id="FunctionCheckListCaseEmpty"] != "", "yes", "no")', 'no');
    });

    it(`should evaluate an "and" expression that checks values of nodes (3)`, () => {
      const node = doc.getElementById('FunctionChecklistCase0');
      assertStringValue(node, null, 'if(. = "0" and /div/div[@id="FunctionChecklistCaseNo"] ="no", "yes", "no")', 'yes');
    });

    it(`should evaluate an "or" expression that checks values of nodes (1)`, () => {
      const node = doc.getElementById('FunctionChecklistCase0');
      assertStringValue(node, null, 'if(. != "0" or /div/div[@id="FunctionCheckListCaseEmpty"] != "", "yes", "no")', 'no');
    });

    // TODO: fails with exception 'r' is undefined (Firefox) and 't' is undefined (Chrome)
    it(`should evaluate an "or" expression that checks values of nodes (2)`, () => {
      const node = doc.getElementById('FunctionChecklistCase0');
      assertStringValue(node, null, 'if(. = "0" or /div/div[@id="FunctionCheckListCaseEmpty"] != "", "yes", "no")', 'yes');
    });
    
    // TODO: fails with 'no' in Chrome (and does not fail in Firefox)
    it(`should evaluate an "or" expression that checks values of nodes (3)`, () => {
      const node = doc.getElementById('FunctionChecklistCase0');
      assertStringValue(node, null, 'if(. != "0" or /div/div[@id="FunctionChecklistCaseNo"] ="no", "yes", "no")', 'yes');
    });

  });
});
