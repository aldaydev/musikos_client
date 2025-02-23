import './App.css';
import './components/Forms/forms.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import DashBoard from './pages/Dashboard';
import Login from './pages/Login/Login';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import ProtectedFromNoAuth from './components/ProtectedRoutes/ProtectedFromNoAuth';
import ProtectedFromAuth from './components/ProtectedRoutes/ProtectedFromAuth';


function App() {

  return (
    <AuthProvider>
    <Router>
      <Header/>
        <main className="App__main">
          <Routes>
              <Route path="/" element={<Home />} />

              <Route element={<ProtectedFromNoAuth />}>
                <Route path="/dashboard" element={<DashBoard />} />
              </Route>

              <Route element={<ProtectedFromAuth />}>
                <Route path="/login" element={<Login/>} />
              </Route>
              
          </Routes>
        </main>
      <Footer/>
    </Router>
    </AuthProvider>
  )
}

export default App;
