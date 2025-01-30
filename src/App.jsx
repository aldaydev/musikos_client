import './App.css'
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import DashBoard from './pages/Dashboard';
import Login from './pages/Login';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";


function App() {

  return (
    <>
    <Router>
      <Header/>
        <main className="App__main">
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/login" element={<Login/>} />
          </Routes>
        </main>
      <Footer/>
    </Router>
      
    </>
  )
}

export default App;
