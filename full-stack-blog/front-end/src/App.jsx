import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import CreateBlog from './components/CreateBlog'

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 py-8">
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-blog" element={<CreateBlog />} />
      </Routes>
    </div>   
    </BrowserRouter>
  )
}

export default App
