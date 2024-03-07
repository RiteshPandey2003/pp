
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch('/api/user/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        return setErrorMessage(data.message);
      }

      setLoading(false);

      if (res.ok) {
        navigate('/');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-6 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Sign in</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your Email"
            id="email"
            onChange={handleChange}
            className="py-2 px-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Your Password"
            id="password"
            onChange={handleChange}
            className="py-2 px-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="py-2 px-6 bg-blue-800 text-white rounded hover:bg-blue-700 focus:outline-none"
          >
            {loading ? 'Loading...' : 'Sign in'}
          </button>
        </form>
        <div className="flex items-center mt-5 text-sm">
          <span className="text-gray-600">Already have an account?</span>
          <Link to="/sign-up" className="text-blue-500 ml-2">Sign up</Link>
        </div>
        {errorMessage && (
          <div className="mt-5 text-red-500">{errorMessage}</div>
        )}
      </div>
    </div>
  );
}
