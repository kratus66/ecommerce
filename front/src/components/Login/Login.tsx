import { loginService } from '@/service/authServices/authServices';
import Link from 'next/link';
import { useState } from 'react';
import Router from 'next/router';

const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = process.env.NEXT_PUBLIC_API_URL + "/users/login";

    try {
      const body = { email, password };
      const data = await loginService(url, body);
      console.log("Login Exitoso: ", data);

      if (data && data.user && data.user.name && data.user.id) {  // Aseguramos que el userId esté disponible
        const { token, user } = data;
        localStorage.setItem('userName', user.name);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', user.id);  // Guardamos también el userId

        // Redirigir y actualizar la página
        Router.push("/").then(() => {
          Router.reload(); // Forzar recarga de la página después de redirigir
        });
      } else {
        console.error('No se encontró el ID o nombre de usuario en la respuesta');
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 sm">
      <div className="w-1/4 text-center bg-white border border-gray-300 rounded-lg h-auto p-6">
        <form onSubmit={handleSubmit}>
          <h1 className="py-3 text-2xl font-bold text-center">Welcome Back!</h1>

          <label htmlFor="email" className="py-3 ml-6 text-sm font-medium text-left block">Email Address</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="h-10 px-2 ml-3 mr-3 border-2 rounded-lg w-full mb-4"
          />

          <label htmlFor="password" className="py-3 ml-6 text-sm font-medium text-left block">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="h-10 px-2 ml-3 mr-3 border-2 border-gray-300 rounded-lg w-full mb-4"
          />

          {error && <p className="text-red-500">{error}</p>}

          <div className="flex items-center justify-between p-4 mt-1">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-sm">Remember me</label>
            </div>
            <Link href="/register" className='text-blue-600'>Create account</Link>
          </div>

          <button type="submit" className="h-10 px-3 py-2 mt-4 text-white bg-violet-600 rounded-lg w-full hover:bg-violet-700">Login</button>
        </form>
      </div>
    </div>
  );
};

export default FormLogin;
