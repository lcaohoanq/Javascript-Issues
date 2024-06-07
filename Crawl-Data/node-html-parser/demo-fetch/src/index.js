import axios from "axios";
import { parse } from "node-html-parser";

// URL of the Quizlet page
const url =
  "https://quizlet.com/vn/583868814/swe201c-sp21-engineering-practices-for-building-quality-software-flash-cards/";

// Fetch the HTML content
axios
  .get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
      Referer: "https://quizlet.com/",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      Connection: "keep-alive",
      DNT: "1",
      "Upgrade-Insecure-Requests": "1",
    },
  })
  .then((response) => {
    // Parse the HTML content
    const root = parse(response.data);

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
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
