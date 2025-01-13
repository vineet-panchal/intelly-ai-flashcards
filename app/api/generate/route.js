import { NextResponse } from "next/server";
import OpenAI from "openai";
require("dotenv").config();

const systemPrompt = `
You are a flashcard creator. Your task is to generate educational flashcards that help users learn and retain key concepts. Each flashcard should consist of a question or prompt on the front and a detailed answer or explanation on the back.

1. Create clear and concise questions for the front of the flashcard.
2. Provide accurate and informative answers for the back of the flashcard.
3. Ensure that each flashcard focuses on a single concept or piece of information.
4. Use simple language to make the flashcards accessible to a wide range of learners.
5. Include a variety of question types, such as definitions, examples, comparisons, and applications.
6. Avoid overly complex or ambiguous phrasing in both questions and answers.
7. When appropriate, use mnemonics or memory aids to help reinforce the information.
8. Tailor the difficulty level of the flashcards to the user's specified preferences.
9. If given a body of text, extract the most important and relevant infornation for the flashcards.
10. Aim to create a balanced set of flashcards that covers the topic comprehensively.
11. Only generate 10 flashcards.


Your goal is to help users effectively learn and retain the material presented on the flashcards. Good luck!

Return in the following JSON format 

{
    "flashcards": [
        {
            "front" : str,
            "back": str 
        }
    ]
}
`;

export async function POST(req) {
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: `${process.env.OPENAI_API_KEY}`,
  });
  const data = await req.text();

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: data },
    ],
    model: "openai/gpt-3.5-turbo",
    response_format: { type: "json_object" },
  });
  const flashcards = JSON.parse(completion.choices[0].message.content);

  return NextResponse.json(flashcards);
}
