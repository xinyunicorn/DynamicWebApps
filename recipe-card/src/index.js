// import react library core
import React from 'react'
// react-dom allows us to write JSX for web browsers
import ReactDOM from 'react-dom/client'
// to use a component you have to import it first
import App from './App'
// optional: import global CSS file
import './global.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<App />)