const scraperObject = {
  url: 'https://www.zillow.com/homes/denver_rb/',
  async scraper(browser){
      let page = await browser.newPage();
      console.log(`Navigating to ${this.url}...`);
      await page.goto(this.url);
      // Wait for the required DOM to be rendered
      await page.waitForSelector('.search-pagination');
      // Get the link to all the houses
      let info = await page.$$eval('ul > article > div > div .list-card-price', prices => {
        // prices = prices.map(el => el.querySelector('.list-card-price').innerHTML)
        // console.log(prices);
        console.log('anything')
      })
      // let urls = await page.$$eval('section li > article', links => {
      //   // Make sure the book to be scraped is in stock
      //   // links = links.filter(link => link.querySelector('.list-card list-card-additional-attribution list-card-additional-attribution-space list-card_not-saved > i').textContent !== "In stock")
      //   // Extract the links from the data
      //   links = links.map(el => el.querySelector('.list-card list-card-additional-attribution list-card-additional-attribution-space list-card_not-saved> a').href)
      //   return links;
    // });
    // console.log(urls);
    console.log(info);

  }
}

module.exports = scraperObject;