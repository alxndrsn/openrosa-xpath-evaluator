const assert = require('chai').assert;

const expandArgs = require('../../src/utils/expand-args');

describe.only('expandArgs()', () => {
  it('should expand single arg to a single no-arg array', () => {
    // expect
    assert.deepEqual(expandArgs([]), [ [] ]);
  });

  it('should expand single args to a single set of args', () => {
    // expect
    assert.deepEqual(expandArgs([ 1, 2, 3 ]), [ [ 1, 2, 3 ] ]);
  });

  it('should expand a single array arg', () => {
    // expect
    assert.deepEqual(expandArgs([ 1, [2,3 ] , 4]), [ [1,2,4 ], [1,3,4] ]);
  });

  it('should expand multiple array args', () => {
    // expect
    assert.deepEqual(expandArgs([ 10, [20,21] , [30, 31] ]),
        [ [10,20,30], [10,21,30], [10,20,31], [10,21,31] ]);
  });
});
