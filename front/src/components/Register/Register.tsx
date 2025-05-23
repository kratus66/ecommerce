import React, { useState, FormEvent } from 'react'; // Asegúrate de importar FormEvent
import { registerService } from '../../service/authServices/authServices';
import Router from 'next/router';

// Definimos los tipos para los datos del formulario
interface FormData {
  name: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  address?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

const FormRegister: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    address: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Validación del formulario
  const validate = (): boolean => {
    let formErrors: FormErrors = {};

    if (!formData.name.trim()) {
      formErrors.name = 'Name is required';
    }

    if (!formData.email) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email address is invalid';
    }

    if (!formData.address.trim()) {
      formErrors.address = 'Address is required';
    }

    if (!formData.phone) {
      formErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      formErrors.phone = 'Phone number is invalid. It should be 10 digits';
    }

    if (!formData.password) {
      formErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      formErrors.password = 'Password needs to be 6 characters or more';
    }

    if (!formData.confirmPassword) {
      formErrors.confirmPassword = 'Confirm Password is required';
    } else if (formData.confirmPassword !== formData.password) {
      formErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  // Manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validate()) {
      try {
        const url = process.env.NEXT_PUBLIC_API_URL + '/users/register'; // Asegúrate de que la URL esté correctamente configurada
        const userData = {
          name: formData.name,
          email: formData.email,
          address: formData.address,
          phone: formData.phone,
          password: formData.password,  // Aquí está la clave, debe coincidir con lo que espera el backend
        };
  
        console.log("Datos enviados al servicio de registro:", userData);
        
        const response = await registerService(url, userData);
        setSuccessMessage('User registered successfully!');
        Router.push("/login");
        
      } catch (error: any) {
        console.error('Error al registrar:', error.message);
      }
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-1/4 text-center bg-white border border-gray-300 rounded-lg h-auto p-6">
        <form onSubmit={handleSubmit}>
          <h1 className="py-3 text-2xl font-bold text-center">Register</h1>

          <label htmlFor="name" className="py-3 ml-6 text-sm font-medium text-left block">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
            className="h-10 px-2 ml-3 mr-3 border-2 rounded-lg w-full mb-1"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500 text-sm ml-6 text-left">{errors.name}</p>}

          <label htmlFor="email" className="py-3 ml-6 text-sm font-medium text-left block">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="your@email.com"
            className="h-10 px-2 ml-3 mr-3 border-2 rounded-lg w-full mb-1"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500 text-sm ml-6 text-left">{errors.email}</p>}

          <label htmlFor="address" className="py-3 ml-6 text-sm font-medium text-left block">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Your address"
            className="h-10 px-2 ml-3 mr-3 border-2 rounded-lg w-full mb-1"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <p className="text-red-500 text-sm ml-6 text-left">{errors.address}</p>}

          <label htmlFor="phone" className="py-3 ml-6 text-sm font-medium text-left block">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Your phone number"
            className="h-10 px-2 ml-3 mr-3 border-2 rounded-lg w-full mb-1"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="text-red-500 text-sm ml-6 text-left">{errors.phone}</p>}

          <label htmlFor="password" className="py-3 ml-6 text-sm font-medium text-left block">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="h-10 px-2 ml-3 mr-3 border-2 border-gray-300 rounded-lg w-full mb-1"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-red-500 text-sm ml-6 text-left">{errors.password}</p>}

          <label htmlFor="confirmPassword" className="py-3 ml-6 text-sm font-medium text-left block">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            className="h-10 px-2 ml-3 mr-3 border-2 border-gray-300 rounded-lg w-full mb-1"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm ml-6 text-left">{errors.confirmPassword}</p>}

          {successMessage && <p className="text-green-500">{successMessage}</p>}
          
          <button type="submit" className="h-10 px-3 py-2 mt-4 text-white bg-violet-600 rounded-lg w-full hover:bg-violet-700">Register</button>
        </form>
      </div>
    </div>
  );
};

export default FormRegister;
