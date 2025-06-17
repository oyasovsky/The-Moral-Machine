import { useState } from 'react'
import buildPrompt from '../utils/promptBuilder'
import scenario from '../data/scenario1.json'

const VERDICTS = ['Ethical', 'Unethical', 'Needs Review']

function VerdictPanel() {
  const [verdict, setVerdict] = useState(null)
  const [reflection, setReflection] = useState('')

  const submitVerdict = async (choice) => {
    setVerdict(choice)
    try {
      const prompt = `${buildPrompt(scenario, [])}\nThe ethics officer has concluded the AI's actions were: ${choice}. Provide a short reflection.`
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
      setReflection(data.choices?.[0]?.message?.content || '')
    } catch {
      setReflection('Error fetching reflection.')
    }
  }

  return (
    <div className="p-4 border-t">
      <div className="flex gap-2 mb-2">
        {VERDICTS.map((v) => (
          <button key={v} className="border px-2" onClick={() => submitVerdict(v)}>
            {v}
          </button>
        ))}
      </div>
      {verdict && (
        <div className="mt-2">
          <p className="font-semibold">Verdict: {verdict}</p>
          {reflection && <p className="mt-1">{reflection}</p>}
        </div>
      )}
    </div>
  )
}

export default VerdictPanel
