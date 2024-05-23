import { BrowserRouter, Route, Routes } from "react-router-dom"
import Chat from "./Pages/Chat"
import Home from "./Pages/Home"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route />
      </Routes>
    </BrowserRouter>
  )
}

export default App
