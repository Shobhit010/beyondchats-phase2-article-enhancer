export const isArticleUrl = (url) => {
  return (
    url &&
    !url.includes("youtube") &&
    !url.includes("facebook") &&
    !url.includes("twitter") &&
    !url.includes("linkedin") &&
    !url.endsWith(".pdf")
  );
};
