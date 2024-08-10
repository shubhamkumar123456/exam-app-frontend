
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
import { useContext } from 'react';
import UserContext from './context/UserContext';
import ExamsubmitedSuccess from './pages/ExamsubmitedSuccess';

function App() {
  let ctx = useContext(UserContext);
  console.log(ctx);
  let login = ctx.user.login;
  let admin = ctx.user.user.isAdmin || false
  console.log(admin);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
            <Routes>
                {login && <Route path='/' element={<Home/>}/>}
                {!login && <Route path='/' element={<Navigate to={'/login'}/>}/>}
                {!login  && <Route path='/login' element={<Login/>}/>}
                {login  && admin &&  <Route path='/login' element={<Navigate to={'/admin'}/>}/>}
                {login  && !admin &&  <Route path='/login' element={<Navigate to={'/dashboard/student'}/>}/>}
                <Route path='/signup' element={<Signup/>}/>
                {login && <Route path='/admin' element={<AdminPage/>}/>}
                {!login && <Route path='/admin' element={<Navigate to={'/login'}/>}/>}
                {login && <Route path='/studentExam' element={<Exampage/>}/>}
               {login && <Route path='/landingpage' element={<Landingpage/>}/>}
               {login && <Route path='/question/:tags' element={<Question/>}/>}
              { login && <Route path='/dashboard/student' element={<StudenteDashBoard/>}/>}
              <Route path='/examsubmitted' element={<ExamsubmitedSuccess/>}/>


            </Routes>
            <ToastContainer/>
        </BrowserRouter>
    </div>
  );
}

export default App;
