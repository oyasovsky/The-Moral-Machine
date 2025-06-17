import scenario from '../data/scenario1.json'

function ScenarioViewer() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">{scenario.title}</h2>
      <p className="mb-2">{scenario.summary}</p>
      <h3 className="font-semibold mt-4">AI Action Log</h3>
      <p className="whitespace-pre-wrap">{scenario.ai_action_log}</p>
    </div>
  )
}

export default ScenarioViewer
