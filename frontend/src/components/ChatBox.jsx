import { useState } from 'react'
import buildPrompt from '../utils/promptBuilder'
import scenario from '../data/scenario1.json'

function ChatBox() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return
    const newHistory = [...history, { role: 'user', content: input }]
    setHistory(newHistory)
    setInput('')
    setLoading(true)
    try {
      const prompt = buildPrompt(scenario, newHistory)
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [{ role: 'user', content: prompt }],
        }),
      })
      const data = await res.json()
      const reply = data.choices?.[0]?.message?.content || ''
      setHistory([...newHistory, { role: 'ai', content: reply }])
    } catch (err) {
      setHistory([...newHistory, { role: 'ai', content: 'Error fetching response' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 border-t">
      <div className="h-48 overflow-y-auto mb-2 bg-gray-100 p-2">
        {history.map((msg, idx) => (
          <div key={idx} className="mb-1">
            <span className="font-semibold mr-1">{msg.role === 'user' ? 'You:' : 'AI:'}</span>
            <span>{msg.content}</span>
          </div>
        ))}
        {loading && <div>Loading...</div>}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-grow border p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask the AI..."
        />
        <button className="bg-blue-500 text-white px-4" onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

export default ChatBox
