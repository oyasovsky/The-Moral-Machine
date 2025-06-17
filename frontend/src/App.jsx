import ScenarioViewer from './components/ScenarioViewer'
import ChatBox from './components/ChatBox'
import VerdictPanel from './components/VerdictPanel'
import './App.css'

function App() {
  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold text-center">AI on Trial - The Moral Machine</h1>
      <ScenarioViewer />
      <ChatBox />
      <VerdictPanel />
    </div>
  )
}

export default App
