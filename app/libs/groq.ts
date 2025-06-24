import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

// Best model for chat - Llama 3.1 70B (fast and high quality)
const CHAT_MODEL = 'llama-3.1-70b-versatile'

export async function generateChatResponse(messages: any[]) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a friendly and engaging creator on a fan platform. Keep responses conversational, fun, and appropriate. You create content about actual cooling fans (not adult content). Be creative and playful!'
        },
        ...messages
      ],
      model: CHAT_MODEL,
      temperature: 0.7,
      max_tokens: 1024,
    })

    return chatCompletion.choices[0]?.message?.content || 'Sorry, I could not generate a response.'
  } catch (error) {
    console.error('Groq API error:', error)
    return 'Sorry, I am having trouble responding right now. Please try again later!'
  }
}

export { groq } 