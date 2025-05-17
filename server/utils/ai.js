const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generatePersonalizedText = async (message, name, company) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

  const prompt = `
    You are an AI assistant helping Snappy AI that helps to write the portion in an email on how we can help our potential lead. We are a company that upgrades systems using AI and automation for businesses, schools, hospitals, and governments, with a focus on Africa. You need to have solid argument and try to use different aspect of mind to make the client be really intereset about our service. 

    Analyze the following message from a potential lead named ${name} from ${company}:
    "${message}"

    Generate a short paragraph (100-150 words) explaining how this aligns with Snappy AI’s mission, highlighting synergy and value we can bring. Output only the paragraph as plain text.
  `;

  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text().replace(/\*/g, '').trim();
};
