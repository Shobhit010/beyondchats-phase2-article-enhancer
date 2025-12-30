import axios from "axios";
import { load } from "cheerio";

export const scrapeArticleContent = async (url) => {
  const { data } = await axios.get(url, { timeout: 10000 });
  const $ = load(data);

  let content = "";

  $("article p").each((_, el) => {
    const text = $(el).text().trim();
    if (text) content += text + "\n";
  });

  if (!content.trim()) {
    $("p").each((_, el) => {
      const text = $(el).text().trim();
      if (text) content += text + "\n";
    });
  }

  return content.trim();
};
