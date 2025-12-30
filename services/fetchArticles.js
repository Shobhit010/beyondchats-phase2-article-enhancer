import axios from "axios";

export const fetchArticles = async () => {
  const res = await axios.get("http://localhost:5000/api/articles");
  return res.data;
};
