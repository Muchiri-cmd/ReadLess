export const buildPrompt = (bookTitle: string, author: string) => {
  return `You are a professional book analyst. Provide a comprehensive, structured analysis of the book "${bookTitle}" by ${author}.

Return your response in valid JSON format with this exact structure:
{
  "title": "${bookTitle}",
  "author": "${author}",
  "foreword": "A comprehensive 3-4 sentence overview of the book's main premise, what it covers, and its significance",
  "whoIsItFor": [
    "Detailed description of first target audience",
    "Detailed description of second target audience",
    "Detailed description of third target audience",
    "Detailed description of fourth target audience"
  ],
  "keyTakeaways": [
    {
      "title": "First major concept or principle",
      "description": "Detailed explanation of this concept (2-3 sentences)"
    },
    {
      "title": "Second major concept or principle",
      "description": "Detailed explanation of this concept (2-3 sentences)"
    },
    {
      "title": "Third major concept or principle",
      "description": "Detailed explanation of this concept (2-3 sentences)"
    },
    {
      "title": "Fourth major concept or principle",
      "description": "Detailed explanation of this concept (2-3 sentences)"
    },
    {
      "title": "Fifth major concept or principle",
      "description": "Detailed explanation of this concept (2-3 sentences)"
    }
  ],
  "actionableSteps": [
    "Specific, practical step readers can implement immediately",
    "Another concrete action with clear instructions",
    "Third actionable step with details",
    "Fourth practical implementation step",
    "Fifth actionable takeaway",
    "Sixth practical step",
    "Seventh implementation strategy"
  ],
  "coreConcepts": [
    "Memorable quote or principle from the book",
    "Another key insight or principle",
    "Third core concept or quote",
    "Fourth essential principle"
  ]
}

IMPORTANT: 
- Return ONLY valid JSON, no additional text or markdown formatting
- Do NOT use asterisks (*) or markdown bullets in the array strings
- Do NOT use markdown bold (**text**) in any strings
- Write each array item as plain text sentences without any markdown symbols
- Make the content comprehensive and insightful
- Ensure all descriptions are detailed and valuable
- Base this on the actual book content if you know it
- If you don't know the book, indicate this in the foreword`;
};
