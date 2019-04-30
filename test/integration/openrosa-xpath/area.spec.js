describe( 'distance() and area() functions', () => {
  const SHAPE1 = '7.9377 -11.5845 0 0;7.9324 -11.5902 0 0;7.927 -11.5857 0 0;7.925 -11.578 0 0;7.9267 -11.5722 0 0;7.9325 -11.5708 0 0;7.9372 -11.5737 0 0;7.9393 -11.579 0 0;7.9377 -11.5845 0 0';
  const TRACE1 = '38.253094215699576 21.756382658677467;38.25021274773806 21.756382658677467;38.25007793942195 21.763892843919166;38.25290886154963 21.763935759263404;38.25146813817506 21.758421137528785';
  const TRACE2 = '38.25304740874071 21.75644703234866;38.25308110946615 21.763377860443143;38.25078942453431 21.763399318115262;38.25090738066984 21.756640151397733;38.25197740258244 21.75892539347842';
  const TRACE3 = '38.252845204059824 21.763313487426785;38.25303055837213 21.755867675201443;38.25072202094234 21.755803302185086;38.25062091543717 21.76294870700076;38.25183417221606 21.75692982997134';
  const LINE = '7.9377 -11.5845 0 0;7.9324 -11.5902 0 0';
  const SAME = '7.9377 -11.5845 0 0;7.9377 -11.5845 0 0';

  [
    [ SHAPE1, 2333220.77, 5724.36 ],
    // [ TRACE1, 151451.76, 1800.69 ],
    // [ TRACE2, 122754.94, 1684.62 ],
    // [ TRACE3, 93911.49, 2076.24 ],
    // [ LINE, 0.0, 861.99 ],
    // [ SAME, 0.0, 0.0 ],
    // [ '0 0;0 1', 0.0, 111318.85 ],
    // [ '0 0;0 90', 0.0, 10018696.05 ],
    // [ '90 0;90 1', 0.0, 0.0 ],
    // [ '5000 5000; 5000 5000', NaN, NaN ],
    // [ 'a', NaN, NaN ],
    // [ '', NaN, NaN ],
  ].forEach((t, i) => {
    const param = t[ 0 ];
    xit( `area() works (${i+1})`, () => {
        assertNumber(`area("${param}")`, t[1]);
    } );
    xit( `distance() works (${i+1})`, () => {
        assertNumber(`distance("${param}")`, t[2]);
    });
  } );

  [
      [ 'FunctionArea1', './*', 2333220.77, 5724.36 ],
      [ 'FunctionArea4', '.', 2333220.77, 5724.36 ],
      [ 'FunctionArea2', './*', 122754.94, 1684.62 ],
      [ 'FunctionArea3', './*', 93911.49, 2076.24 ],
  ].forEach( ( t, i ) => {
      const id = t[ 0 ];
      const param = t[ 1 ];
      xit( `area() works (${i+1})`, () => {
          const result = g.doc.evaluate( `area(${param})`, g.doc.getElementById( id ), null, g.win.XPathResult.NUMBER_TYPE, null );
          expect( result.numberValue ).to.deep.equal( t[ 2 ] );
      } );
      xit( `distance() works (${i+1})`, () => {
          const result = g.doc.evaluate( `distance(${param})`, g.doc.getElementById( id ), null, g.win.XPathResult.NUMBER_TYPE, null );
          expect( result.numberValue ).to.deep.equal( t[ 3 ] );
      } );
  } );

  xit('throws error when no parameters are provided', () => {
    ['area()', 'distance()'].forEach(t => {
      assert.throw(() => `area(${t})`, Error);
    });
  });
});
