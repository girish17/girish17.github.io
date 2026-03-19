import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import Projects from './pages/Projects'
import Experience from './pages/Experience'
import Books from './pages/Books'
import Writings from './pages/Writings'
import Photos from './pages/Photos'
import BlogPost from './pages/blog/MarkdownBlogPost'
import FlossPost from './pages/blog/FlossPost'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="projects" element={<Projects />} />
          <Route path="experience" element={<Experience />} />
          <Route path="books" element={<Books />} />
          <Route path="writings" element={<Writings />} />
          <Route path="writings/:slug" element={<BlogPost />} />
          <Route path="photos" element={<Photos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
