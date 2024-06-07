import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(
    "https://quizlet.com/vn/583868814/swe201c-sp21-engineering-practices-for-building-quality-software-flash-cards/"
  );

  // Wait for the required element to load
  await page.waitForSelector(".flex-sidebar theme-night");

  // Get the page content
  const content = await page.content();

  // Parse the HTML content
  const root = parse(content);

  // Find the elements containing the flashcard data
  const cards = root.querySelectorAll(".SetPageTerms-term");

  // Extract and print the question and answer for each card
  cards.forEach((card) => {
    const question = card.querySelector(".TermText").innerText;
    const answer = card.querySelector(".TermText").innerText;
    console.log(`Question: ${question}`);
    console.log(`Answer: ${answer}`);
    console.log("---");
  });

  await browser.close();
})();
