import { Link, useNavigate } from 'react-router-dom'
import { login } from '../Backend/Auth';
import { useState } from 'react';
import { notify } from '../components/Toast';

const Login = () => {
    const [email, Setemail] = useState('')
    const [password, SetPassword] = useState('')
    const navigate = useNavigate()

    const send = async (e) => {
        e.preventDefault();
        
        const data = await login(email, password)
        if (data != null) {
            localStorage.setItem('userId', data)
            navigate("/dashboard")
        }
        else {
            console.log("data is not defined")
            notify("Invalid Credentials")
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                        <input type="email" id="email" value={email} onChange={(e) => Setemail(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                        <input type="password" value={password} onChange={(e) => SetPassword(e.target.value)} id="password" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                    </div>
                    <div className="mb-4 flex items-center">
                        <input type="checkbox" id="remember" className="mr-2" />
                        <label htmlFor="remember" className="text-gray-700">Remember Me</label>
                    </div>
                    <button type="submit" onClick={send} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Login</button>
                    <div className="mb-4 flex items-center">
                        <Link to="/signup" className="text-blue-700">Don't have an account.</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
