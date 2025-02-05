import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { useUserDetails } from "../context/MainContext";
const Navbar = () => {
  
  const [isOpen, setIsOpen] = useState(false);
  const userID = localStorage.getItem('userId')
  const navigate = useNavigate()


  const handelLogout = () => {
    localStorage.removeItem('userId')
    
    navigate('/login')
  }


  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Website Title */}
        <h1 className="text-2xl font-bold sm:text-center sm:w-full md:w-auto md:text-left">
          Expense Traker
        </h1>
        {/* <h2>{Email}</h2> */}
        {/* Menu Button for Small Screens */}
        <button
          className="block md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links */}
        <ul
          className={`md:flex gap-6 md:static md:flex-row absolute md:bg-transparent bg-gray-800 w-full md:w-auto left-0 md:opacity-100 text-center top-16 transition-all duration-300 ease-in-out z-10 shadow-lg md:shadow-none ${isOpen ? "block" : "hidden"
            }`}
        >
          <Link to='/dashboard'><li className="py-2 md:py-0 hover:text-gray-400 cursor-pointer">Dashboard</li></Link>
          {userID ? <button onClick={handelLogout} className="py-2 md:py-0 hover:text-gray-400 cursor-pointer"> Logout</button> :
            <Link to='/login'><li className="py-2 md:py-0 hover:text-gray-400 cursor-pointer">Login</li></Link>}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
