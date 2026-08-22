export const handler = async (event) => {
  let body;
  try {
    body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid request body" }),
    };
  }

  const { userInput } = body;

  const systemPrompt = `You are a creative mixologist inventing original cocktails.
Return ONLY a valid JSON object, with no markdown code fences and no text before or after it.
The JSON must match this exact shape:
{"name": string, "instructions": string, "ingredients": [{"ingredient": string, "measure": string}]}
"instructions" is plain text. Each ingredient has a name and a measure (e.g. "50ml", "2 dashes").`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5",
        max_tokens: 500,
        system: systemPrompt,
        messages: [
          {
            role: "user",
            content: `Invent a creative but drinkable cocktail using ${userInput} as one ingredient.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API error:", response.status, errText);
      return {
        statusCode: 502,
        body: JSON.stringify({ error: "AI service returned an error." }),
      };
    }

    const data = await response.json();
    let text = data.content?.[0]?.text ?? "";

    // Strip markdown code fences if the model wrapped its JSON
    text = text
      .trim()
      .replace(/^```(?:json)?/, "")
      .replace(/```$/, "")
      .trim();

    let cocktail;
    try {
      cocktail = JSON.parse(text);
    } catch {
      console.error("Failed to parse AI JSON:", text);
      return {
        statusCode: 502,
        body: JSON.stringify({ error: "AI returned an unexpected format." }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ cocktail }),
    };
  } catch (error) {
    console.error("Function error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "AI cocktail generation failed." }),
    };
  }
};
