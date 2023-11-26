import { NavLink } from "react-router-dom"
import logo from '../additional/logo.svg'
import { AuthStatus } from "./auth/AuthStatus"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../Auth/AuthContext"

export const SimpleNavbar = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            auth.signOut(() => navigate('/'));
        } catch(ex) {
            alert(ex);
        }
    };

    return(
        <nav className="bg-gray-800 text-white py-3 px-4 flex items-center justify-between">
            <div className="flex items-center select-none">
                <p className="font-bold text-xl">React App</p>
                <img style={{width:"35px", margin:"0 10px 0 0"}} src={logo} className="App-logo" alt="logo" />
                <AuthStatus/>
            </div>
            <div className="flex items-center">
                <NavLink to='/' className="px-4 pt-2 pb-2.5 mx-1 leading-none rounded hover:bg-gray-700">
                    Home - Public page
                </NavLink>
                <NavLink to='/private' className="px-4 pt-2 pb-2.5 mx-1 leading-none rounded hover:bg-gray-700">
                    Private page
                </NavLink>
                {
                    auth.user
                    ?
                    <div className="px-4 pt-2 pb-2.5 mx-1 leading-none rounded bg-gray-800 hover:bg-gray-700"
                        onClick={handleLogOut}>
                        Log Out
                    </div>
                    :
                    <>
                        <NavLink to='/login' className="px-4 pt-2 pb-2.5 mx-1 leading-none rounded hover:bg-gray-700">
                            Log In
                        </NavLink>
                        <NavLink to='/register' className="px-4 pt-2 pb-2.5 mx-1 leading-none rounded hover:bg-gray-700">
                            Register
                        </NavLink>
                    </>
                }
            </div>
        </nav>
    )
}