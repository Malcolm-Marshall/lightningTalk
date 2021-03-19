
const puppeteer = require('puppeteer');
const fs = require('fs')

async function main() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.zillow.com/homes/denver_rb/');

  // await page.waitFor(1000);


  // Return an array of all the link text and assign it to sideBarLinks
  const sidebarLinks = await page.evaluate(() => {
    console.log('asd')
    let articles = []
    let titles = document.querySelector('div[class="list-card-price"]');
    let scores = document.getElementsByClassName('list-card-details');
    console.log(titles)

    // console.log('links');
    // const links = document.querySelectorAll('.list-card-price');
    // return Array.from(links).map(a => a.innerText().trim());
  });
  // console.log(JSON.stringify(sideBarLinks))


  // You could use the synchronous or asychronous writeFile methods. Up to you.
  fs.writeFileSync('./sidebar-links.json', JSON.stringify(sidebarLinks));

  await browser.close()
}

main();