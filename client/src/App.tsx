import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useFetch } from 'use-http'

function App() {
  const [isRunning, setIsRunnig] = useState(false);
  const {
    get
  } = useFetch('http://localhost:5000');

  useEffect(() => {
    refreshData();
  }, [])

  const refreshData = async () => {
    try {
      const data: {
        running: boolean
      } = await get();
      setIsRunnig(data.running);
    } catch {
      setIsRunnig(false);
    }
  };


  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="card">
        <div>running: {isRunning} </div>
      </div>
    </>
  )
}

export default App
