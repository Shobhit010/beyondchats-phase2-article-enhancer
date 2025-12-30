import OpenAI from "openai";

export const rewriteArticle = async (
  originalArticle,
  referenceContents,
  referenceLinks
) => {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const prompt = `
You are an expert SEO content writer.

Original Article:
${originalArticle.title}
${originalArticle.excerpt || ""}

Reference Articles:
${referenceContents.join("\n\n")}

Task:
- Rewrite the original article
- Improve structure, headings, readability
- Match tone and formatting of reference articles
- Do NOT copy verbatim
- Add references at the bottom

Return in Markdown format.
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    });

    return response.choices[0].message.content;

  } catch (error) {
    if (error.code === "insufficient_quota" || error.status === 429) {
      console.warn("⚠️ OpenAI quota exceeded. Using fallback content.");

      return `
# ${originalArticle.title}

${originalArticle.excerpt || "This article discusses the topic in detail."}

> ⚠️ **Note:** This content could not be enhanced using AI due to API quota limits.

The following references were used for research and structure:
`;
    }

    throw error;
  }
};

export const appendReferences = (content, links) => {
  let refs = "\n\n## References\n";
  links.forEach((link, i) => {
    refs += `${i + 1}. ${link}\n`;
  });
  return content + refs;
};
