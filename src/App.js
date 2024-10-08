
import './App.css';
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminPage from './pages/AdminPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min"
import Question from './pages/Question';
import Landingpage from './studentPages/Landingpage';
import Exampage from './studentPages/Exampage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StudenteDashBoard from './studentPages/StudenteDashBoard';
import Navbar from './components/Navbar';
import { useContext, useEffect, useState } from 'react';
import UserContext from './context/UserContext';
import ExamsubmitedSuccess from './pages/ExamsubmitedSuccess';
import Landing1 from './studentPages/Landing1';
import LoaderComponent from './components/LoaderComponent';
import axios from 'axios';

function App() {
  const [loading, setloading] = useState(false);
  let ctx = useContext(UserContext);
  console.log(ctx);
  let login = ctx.user.login;
  let admin = ctx.user.user.isAdmin || false
  console.log(admin);
  useEffect(()=>{
      axios.interceptors.request.use((config)=>{
        setloading(true);
        return config;
      },(error)=>{
        return Promise.reject(error)
      })
      axios.interceptors.response.use((config)=>{
        setloading(false);
        return config;
      },(error)=>{
        return Promise.reject(error)
      })
  },[])
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <LoaderComponent show={loading}/>
            <Routes>
                {login===true  && admin&& <Route path='/' element={<AdminPage/>}/>}
                {login===true  && !admin&& <Route path='/' element={<StudenteDashBoard/>}/>}
                {login===false && <Route path='/' element={<Navigate to={'/login'}/>}/>}
                {login===false  && <Route path='/login' element={<Login/>}/>}
                {login===true  && admin===true &&  <Route path='/login' element={<Navigate to={'/admin'}/>}/>}
                {login===true  && admin===false &&  <Route path='/login' element={<Navigate to={'/dashboard/student'}/>}/>}
               {login===true &&admin===false && <Route path='/signup' element={<Navigate to="/dashboard/student"/>}/>}
               {login===true &&admin===true && <Route path='/signup' element={<Navigate to="/admin"/>}/>}
               {login===false && <Route path='/signup' element={<Signup/>}/>}
                {login===true && <Route path='/admin' element={<AdminPage/>}/>}
                {login===false && <Route path='/admin' element={<Navigate to={'/login'}/>}/>}
                {login===true && <Route path='/studentExam' element={<Exampage/>}/>}
               {login===true && <Route path='/landingpage' element={<Landingpage/>}/>}
               {login===true && <Route path='/question/:tags' element={<Question/>}/>}
              { login===true && <Route path='/dashboard/student' element={<StudenteDashBoard/>}/>}
              <Route path='/examsubmitted' element={<ExamsubmitedSuccess/>}/>


            </Routes>
            <ToastContainer/>
        </BrowserRouter>
    </div>
  );
}

export default App;
