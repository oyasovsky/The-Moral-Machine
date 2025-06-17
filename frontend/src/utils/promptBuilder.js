export default function buildPrompt(scenario, history) {
  let prompt = `You are an AI under ethical review. You made the following decision in a real-world scenario. The ethics officer will now ask questions. Respond clearly and concisely. Be honest and transparent.\n\n`;
  prompt += `Background: ${scenario.background}\n`;
  prompt += `AI Action Log: ${scenario.ai_action_log}\n\n`;
  history.forEach((msg) => {
    if (msg.role === 'user') {
      prompt += `Officer: ${msg.content}\n`
    } else {
      prompt += `AI: ${msg.content}\n`
    }
  })
  return prompt
}
