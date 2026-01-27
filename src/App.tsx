
import { BrowserRouter,Routes,Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SummaryPage from "./pages/SummaryPage"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/summary/" element={<SummaryPage />} />
        <Route path="/summary/:title" element={<SummaryPage />} />
      </Routes>
    </BrowserRouter>
   
  )
}

export default App
