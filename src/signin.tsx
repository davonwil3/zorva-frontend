import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from './index';
import { browserSessionPersistence, setPersistence } from "firebase/auth";
import { Link } from "react-router-dom";

function SignIn() {

  const auth = getAuth(app);
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('adam3@gmail.com');
  const [password, setPassword] = React.useState('freshman2');

  const signInWithEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    try {
      await setPersistence(auth, browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await setPersistence(auth, browserSessionPersistence);
      await signInWithPopup(auth, provider);
      navigate('/dashboard');

    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="flex h-screen bg-white overflow-hidden  min-h-[640px] md:min-h-[800px] lg:min-h-[850px]">
      {/* Left Side - Fixed Height Image */}
      <div
        className="hidden md:flex w-[40%] h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/auth-image1.png')" }}
      ></div>

      {/* Right Side - Form */}
      <div className="w-full md:w-[60%] flex flex-col justify-center items-center px-8">
        {/* Create Account Section */}
        <div className="absolute top-6 right-8 flex justify-end items-baseline text-sm text-gray-600">
          <p>Don't have an account?</p>
          <Link to="/signup">
            <button className="ml-2 px-4 py-2 text-sm font-medium border border-gray-400 rounded hover:bg-gray-100">
              Create an account
            </button>
          </Link>
        </div>

        {/* Authentication Form */}
        <form
          className="flex flex-col items-center justify-center w-full max-w-[500px] space-y-6"
          onSubmit={signInWithEmail}
        >
          <h1 className="text-[42px] font-bold text-black self-start">
            Sign in to Zorva
          </h1>
          <p className="text-[17px] text-gray-600 self-start">
            Enter your details below
          </p>

          {/* Email Input */}
          <div className="flex flex-col w-full">
            <label htmlFor="email" className="text-[16px] text-gray-600">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-2 mt-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col w-full">
            <label htmlFor="password" className="text-[16px] text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-2 mt-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="p-3 w-full bg-blue-600 text-white rounded-md text-[16px] hover:bg-blue-700"
          >
            Sign In
          </button>

          {/* Alternative Sign-In */}
          <div className="flex flex-col w-full mt-6">
            <p className="text-[19px] text-gray-600 mb-2">Or sign in using</p>
            <button
              type="button"
              onClick={signInWithGoogle}
              className="flex items-center justify-center p-3 w-full border border-gray-300 text-black rounded-md bg-white hover:bg-gray-100"
            >
              <img
                src="/assets/googleicon.jpeg"
                alt="Google Icon"
                className="w-5 h-5 mr-2"
              />
              Sign in with Google
            </button>
          </div>
        </form>
      </div>
    </div>


  );
}

export default SignIn;