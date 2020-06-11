const { assertNumberValue, assertStringValue, assertTrue, initDoc } = require('../helpers');

describe.only('predicates with function calls', ()=> {

  describe('with native functions', () => {
    [
      [ 'count(/data/item[true()]) = 2',   assertTrue ],
      [ 'count(/data/b[round(2.44) = 2])', assertNumberValue, 2 ],
      [ '/data/item[true()]/number',       assertNumberValue, 4 ],
      [ '/data/item[true()]/number + 1',   assertNumberValue, 5 ],
      [ '/data/item[true()]/number + 1',   assertStringValue, '5' ],
      [ '/data/item[string-length("a") = 1]/number + 2',    assertNumberValue, 6 ],
      [ '/data/item[2]/number + 3',                         assertNumberValue, 9 ],
      [ '/data/item[string-length(./number)=1]/number + 3', assertNumberValue, 7 ],
      [ '/data/item[(./number div 3.14) > 1.9]/number',     assertNumberValue, 6 ],
    ].forEach(([ expr, assertion, ...extraArgs ]) => {
      it(`should evaluate ${expr} as expected`, () => {
        initDoc(`
          <data>
            <item>
              <number>4</number>
            </item>
            <item>
              <number>6</number>
            </item>
            <b/>
            <b/>
          </data>
        `);

        assertion(expr, ...extraArgs);
      });
    });
  });


  describe('with extended functions', () => {
    [
      [ 'pi()',                                         assertNumberValue, 3.141592653589793 ],
      [ '/data/item[1]/number',                         assertNumberValue, 4 ],
      [ '/data/item[true()]/number',                    assertNumberValue, 4 ],
      [ '/data/item[pi() > 3]/number',                  assertNumberValue, 4 ],
//      [ '/data/item[tan(./number) > 1]/number',         assertNumberValue, 4 ],
//      [ '/data/item[(./number div pi()) > 1.9]/number', assertNumberValue, 6 ],
    ].forEach(([ expr, assertion, ...extraArgs ]) => {
      it(`should evaluate ${expr} as expected`, () => {
        initDoc(`
          <data>
            <item>
              <number>4</number>
            </item>
            <item>
              <number>6</number>
            </item>
          </data>
        `);

        assertion(expr, ...extraArgs);
      });
    });
  });

  // I put this one separate as it has a different 'too many args' error, and there may be multiple causes for failure
  it.only('with the #selected function', () => {
    initDoc(`
      <data>
        <a>a</a>
        <a>b</a>
        <a>c</a>
      </data>
    `);

    // assertTrue('selected("a b", "a")');
    assertNumberValue('count(/data/a[selected("a b", "a")])', 3);
  });
});
