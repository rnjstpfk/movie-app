import { Routes, Route } from 'react-router-dom';
import './App.scss';
import Home from "./routes/Home";
import Login from './routes/Login';
import Signup from './routes/Signup';
import ResetPassword from './routes/ResetPassword';
import MyPage from './routes/MyPage';  
import Drama from "./routes/Detail";
import MoviesDetail from "./routes/MoviesDetail";
import DramaDetail from './routes/DramaDetail';

import Header from './components/Header';
import Footer from './components/Footer';
import QuickBtn from './components/QuickBtn';

import Comedy from './routes/Comedy';
import ComedyDetail from './routes/ComedyDetail';
// ❌ Favorites import 제거
// import Favorites from './routes/Favorites';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path='/mypage' element={<MyPage />} />
          <Route path='/drama' element={<Drama />} />
          <Route path='/drama/:id' element={<DramaDetail />} />

          <Route path='/movies/:id' element={<MoviesDetail />} />
          <Route path="/comedy" element={<Comedy />} />
          <Route path="/comedy/:id" element={<ComedyDetail />} />
        </Routes>
      </main>
      <Footer />
      <QuickBtn />
    </div>
  );
}

export default App;
