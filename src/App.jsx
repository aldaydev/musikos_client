//Style imports
import './App.css';
import './components/Forms/forms.css';
//React imports
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
//Context imports
import { AuthProvider } from './context/AuthContext';
//Pages imports
import DashBoard from './pages/Dashboard';
import Login from './pages/Login/Login';
import Home from './pages/Home';
import Search from './pages/Search/Search';
//Components imports
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import ProtectedFromNoAuth from './components/ProtectedRoutes/ProtectedFromNoAuth';
import ProtectedFromAuth from './components/ProtectedRoutes/ProtectedFromAuth';
import useFetch from './utils/useFetch';
import Spinner from './components/spinners/Spinner';
import { SearchProvider } from './context/SearchContext';


function App() {

  const {isLoading} = useFetch();

  return (
    <AuthProvider>
    <Router>
      <Header/>
        <main className="App__main">
          <SearchProvider>
          <Routes>
              <Route path="/" element={<Home />} />

              <Route element={<ProtectedFromNoAuth />}>
                <Route path="/dashboard" element={<DashBoard />} />
              </Route>

              <Route element={<ProtectedFromAuth />}>
                <Route path="/login" element={<Login/>} />
              </Route>

              {
                isLoading ? <Spinner/>
                : <Route path="/buscar" element={<Search/>}/>
              }
              
              
          </Routes>
          </SearchProvider>
        </main>
      <Footer/>
    </Router>
    </AuthProvider>
  )
}

export default App;
