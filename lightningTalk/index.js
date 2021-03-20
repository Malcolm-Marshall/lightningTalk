const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  // Initiate the Puppeteer browser
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  // Go to NCAA page and wait for it to load (no network connections for the past 500 ms)
  await page.goto('https://www.ncaa.com/stats/basketball-men/d1', { waitUntil: 'networkidle0' });

  // Run javascript inside the page once it is loaded
  let data = await page.evaluate(() => {

    // Select where the data is I want to scrape
    let info = document.querySelectorAll('tbody > tr');
    info = Array.from(info);

    teamInfo = [];

    // Loop over results of query and format
    for (var i = 0; i < info.length; i++) {
      const regex = /\s+/gm;
      const subst = ` `;
      // The substituted value will be contained in the result variable
      teamInfo.push(info[i].innerText.replace(regex, subst))
    }

    // Format the data into categories
    let ranks = {
      ScoringOffence: teamInfo.slice(0, 10),
      ScoringDefense: teamInfo.slice(10, 20),
      AssistsPG: teamInfo.slice(20, 30),
      ReboundsPG: teamInfo.slice(30, 40)
    }

    // Return the semi-formatted data
    return ranks;
  });

  // Store data locally
  fs.writeFile('rankings.json', JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log('Saved to rankings.json');
  })

  // Log what we scraped
  console.log(data);

  // Close the browser
  await browser.close();
})();