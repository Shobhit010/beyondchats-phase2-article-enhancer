import axios from "axios";

export const publishArticle = async (article) => {
  const res = await axios.post(
    "http://localhost:5000/api/articles",
    article
  );
  return res.data;
};
