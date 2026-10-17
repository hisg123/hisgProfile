import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import EnhancedApp from './EnhancedApp'
import './App.css'
import './Diagram.css'

createRoot(document.getElementById('root')).render(<StrictMode><EnhancedApp /></StrictMode>)