describe( 'count-non-empty', () => {
  it('count-non-empty', () => {
    initDoc(`
      <!DOCTYPE html>
      <html xml:lang="en-us" xmlns="http://www.w3.org/1999/xhtml" xmlns:ev="http://some-namespace.com/nss">
        <head>
      		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      		<title>xpath-test</title>
      	</head>
      	<body class="yui3-skin-sam" id="body">
          <div id="FunctionCountNonEmpty">
      			<div>-5</div>
      			<div>-15</div>
      			<div></div>
      			<p>
      				<div></div>
      				<div><!--comment--></div>
      				<span>  </span>
      				<span>
      				</span>
      			</p>
      			<p></p>
  		     </div>
          </body>
        </html>`);
    nsr = nsResolver;
    assertNumber('count-non-empty(//xhtml:div[@id="FunctionCountNonEmpty"]/xhtml:div)', 2);
    assertNumber('count-non-empty(//xhtml:div[@id="FunctionCountNonEmpty"]/xhtml:p)', 1);
    assertNumber('count-non-empty(//xhtml:div[@id="FunctionCountNonEmpty"]/xhtml:p/xhtml:div)', 0);
    assertNumber('count-non-empty(//xhtml:div[@id="FunctionCountNonEmpty"]/xhtml:p/xhtml:span)', 2);
    assertNumber('count-non-empty(//xhtml:div[@id="FunctionCountNonEmpty"]//*)', 5);
    assertNumber('count-non-empty(//xhtml:div[@id="NoExist"]/xhtml:div)', 0);
  });

  it( 'count-non-empty fails when too few, too many, or incorrect arguments are provided', () => {
    assert.throw(() => xEval('count-non-empty()'), Error);
    assert.throw(() => xEval('count-non-empty(2)'), Error);
    assert.throw(() => xEval('count-non-empty(0)'), Error);
    assert.throw(() => xEval('count-non-empty("a")'), Error);
  });
});