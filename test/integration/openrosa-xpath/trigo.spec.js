describe('math functions', () => {

  it('sin()', () => {
    assertNumber('sin(2)', 0.9092974268256817);
    assertNumber('sin("a")', NaN);
  });

  // TODO firefox
  xit('sin() for node', () => {
    initDoc(`
      <!DOCTYPE html>
      <html xml:lang="en-us" xmlns="http://www.w3.org/1999/xhtml" xmlns:ev="http://some-namespace.com/nss">
      	<body class="yui3-skin-sam" id="body">
        <div id="testFunctionNodeset">
    			<div id="testFunctionNodeset2">
    				<p>1</p>
    				<p>2</p>
    				<p>3</p>
    				<p>4</p>
    			</div>
    		</div>
      </html>`);
    nsr = nsResolver;
    assertNumber('sin(//xhtml:div[@id="testFunctionNodeset2"]/xhtml:p[2])', 0.9092974268256817);
  });

  it('cos()', () => {
    assertNumber('cos(2)', -0.4161468365471424);
    assertNumber('cos("NaN")', NaN);
  });

  it('tan()', () => {
    assertNumber('tan(2)', -2.185039863261519);
    assertNumber('tan("a")', NaN);
    assertNumber('tan("NaN")', NaN);
  });

  // to verify rounding errors
  const checkNumber = (val1, val2) => {
    var val = xEval(val1).numberValue;
    assert.equal(Math.round(val * (10**15))/(10**15), val2);
  };

  it('acos()', () => {
    checkNumber('acos(0.5)', 1.047197551196598);
    checkNumber('acos(-1)', 3.141592653589793);
    assertNumber('acos(2)', NaN);
    assertNumber('acos("a")', NaN);
    assertNumber('acos("NaN")', NaN);
  });

  it('asin()', () => {
    checkNumber('asin(0.5)', 0.523598775598299);
    checkNumber('asin(-1)', -1.570796326794896);
    assertNumber('asin(2)', NaN);
    assertNumber('asin("a")', NaN);
    assertNumber('asin("NaN")', NaN);
  });

  it('atan()', () => {
    checkNumber('atan(0.5)', 0.463647609000806);
    checkNumber('atan(-1)', -0.785398163397448);
    assertNumber('atan("a")', NaN);
    assertNumber('atan("NaN")', NaN);
  });

  it('atan2()', () => {
    assertNumber('atan2(2,3)', 0.5880026035475675);
    assertNumber('atan2(2, "NaN")', NaN);
    assertNumber('atan2(2, "a")', NaN);
    assertNumber('atan2("NaN", 2)', NaN);
  });

  it('log()', () => {
    assertNumber('log(2)', 0.6931471805599453);
    assertNumber('log("NaN")', NaN);
    assertNumber('log("a")', NaN);
  });

  it('log10()', () => {
    assertNumber('log10(2)', 0.3010299956639812);
    assertNumber('log10("NaN")', NaN);
    assertNumber('log10("a")', NaN);
  });

  it('pi()', () => {
    assertNumber('pi()', 3.141592653589793);
  });

  it('exp()', () => {
    assertNumber('exp(2)', 7.38905609893065);
    assertNumber('exp("NaN")', NaN);
  });

  it('exp10()', () => {
    assertNumber('exp10(2)', 100);
    assertNumber('exp10(-2)', 0.01);
    assertNumber('exp10("NaN")', NaN);
  });

  it('sqrt()', () => {
    assertNumber('sqrt(4)', 2);
    assertNumber('sqrt(-2)', NaN);
    assertNumber('sqrt("NaN")', NaN);
  });
});