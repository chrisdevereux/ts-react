flow('Look at Live Weather', function () {
  step('Open the page', navigateToPage)

  function navigateToPage() {
    casper.thenOpen("http://localhost:8000/tenerife")
    casper.waitForSelector(
      '#app-root div',
      function success() {
				phantomCSS.screenshot('#app-root')
				casper.test.pass('Should see site')
      },
      function failure() {
        casper.test.fail('Should see site')
      }
    )
  }
})
