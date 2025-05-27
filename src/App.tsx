import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-500">
      <h1 className="text-4xl text-white font-bold">
        Tailwind is Working!
      </h1>
    </div>
  )
}

export default App
