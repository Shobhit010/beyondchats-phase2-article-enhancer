import axios from "axios";
import { isArticleUrl } from "../utils/isArticleUrl.js";

const GOOGLE_SEARCH_URL = "https://www.googleapis.com/customsearch/v1";

export const googleSearch = async (query) => {
  const res = await axios.get(GOOGLE_SEARCH_URL, {
    params: {
      key: process.env.GOOGLE_API_KEY,
      cx: process.env.GOOGLE_CX,
      q: query,
      num: 10, 
    },
  });

  return res.data.items || [];
};

export const getTopTwoArticles = async (title) => {
  const results = await googleSearch(title);

  if (!results.length) {
    console.log("No Google results for:", title);
    return [];
  }

  const articleLinks = results
    .map(item => item.link)
    .filter(isArticleUrl);

  return articleLinks.slice(0, 2);
};
