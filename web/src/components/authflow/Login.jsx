import { Link } from "react-router-dom";
import { useState } from "react";

export const Login = () => {
    // handle email and password on change
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [hidden, setHidden] = useState('hidden bg-succes');

    const [error, setError] = useState('');


    const handleEmailChange = (e) => {
        // add email to state
        setEmail(e)
    }
    const handlePasswordChange = (e) => {
        // add password to state
        setPassword(e)
    }

    const login = async () => {
        const response = await fetch('http://localhost:8000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        const responseData = await response.json();
        console.log(responseData);
        // check 404
        if (response.status === 404) {
            alert(responseData.message)
        }
        if (response.status === 401) {
            setError(responseData.errors)
            setHidden('block bg-error')
        }
        if (response.ok) {
            localStorage.setItem('token', responseData.token);
            localStorage.setItem('name', responseData.user.name);
            localStorage.setItem('email', responseData.user.email);
            localStorage.setItem('role', responseData.user.role);
            setHidden('block bg-succes')
        } else {
            console.log(responseData.message);
        }
    }
    return (
        <div className="absolute w-screen h-screen  overflow-hidden top-0">
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                    <div
                        className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Login op uw account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="email"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jou
                                        email</label>
                                    <input onChange={(e) => handleEmailChange(e.target.value)} type="email" name="email" id="email"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="name@company.com" />
                                </div>
                                <div>
                                    <label htmlFor="password"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Wachtwoord</label>
                                    <input onChange={(e) => handlePasswordChange(e.target.value)} type="password" name="password" id="password" placeholder="••••••••"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                                <div className={`${hidden} text-white w-full bg-gradient-to-r bg-error font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2`}>
                                    {error}
                                </div>

                                <button type={"button"} onClick={() => login()}
                                        className="text-white w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Login
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Nog geen account? <Link to="/register"
                                                            className="font-medium text-primary-600 hover:underline dark:text-primary-500">Registreer</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default Login;