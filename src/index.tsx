import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { Visor } from './components/Visor'

export const App = () => {
  return <Visor />
}
const container = document.getElementById('root')

const root = createRoot(container!)

root.render(<App />)
