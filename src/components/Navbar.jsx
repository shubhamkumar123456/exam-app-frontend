
import { MdMenuBook } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext } from "react";

function Header() {
  let navigate = useNavigate()
  const ctx = useContext(UserContext)
  const handleLogout = ()=>{
    localStorage.removeItem('user_details')
    ctx.setuser({login:false,user:""})
    navigate('/login')
  }

  return (
   <nav className="navbar navbar-expand-lg ">
  <div className="container-fluid">
    <Link className="navbar-brand" href="#"><MdMenuBook size={"30px"}/> Exam Portal</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active  me-lg-3" aria-current="page" href="#">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link me-lg-3  " href="#">About</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link  " href="#">Dashboard</Link>
        </li>
     
        <li onClick={handleLogout} className="nav-item">
          <Link className="nav-link btn btn-success  " >Logout</Link>
        </li>
      
      </ul>
     
    </div>
  </div>
</nav>

  );
}
export default Header;
