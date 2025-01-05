import React from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from './index';


function SignUp() {

  const auth = getAuth(app);
  const navigate = useNavigate();


  const signup = async (firebaseUid: string, email: string | null) => {
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/adduser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firebaseUid,
          email
        })
      });
    } catch (error) {
      console.error(error);
    }
  }

  const signUpWithEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUid = userCredential.user.uid;
      signup(firebaseUid, email);
      navigate('/signin');
    } catch (error) {
      console.error(error);
    }
  };

  const signUpWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const firebaseUid = userCredential.user.uid;
      const email = userCredential.user.email;
      signup(firebaseUid, email)
      navigate('/signin')
      // Send the UID to your backend
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden min-h-[640px] md:min-h-[800px] lg:min-h-[850px]">
      {/* Left Side - Fixed Height Image */}
      <div
        className="hidden md:flex w-[40%] h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/auth-image1.png')" }}
      ></div>

      {/* Right Side - Form */}
      <div className="w-full md:w-[60%] flex flex-col justify-center items-center px-8">
        {/* Authentication Form */}
        <form
          className="flex flex-col items-center justify-center w-full max-w-[500px] space-y-6"
          onSubmit={signUpWithEmail}
        >
          <h1 className="text-[42px] font-bold text-black self-start">
            Sign Up to Zorva
          </h1>
          <p className="text-[17px] text-gray-600 self-start">
            Create an account below
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
              required
              className="p-2 mt-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="p-3 w-full bg-blue-600 text-white rounded-md text-[16px] hover:bg-blue-700"
          >
            Sign Up
          </button>

          {/* Alternative Sign-Up */}
          <div className="flex flex-col w-full mt-6">
            <p className="text-[19px] text-gray-600 mb-2">Or sign up using</p>
            <button
              type="button"
              onClick={signUpWithGoogle}
              className="flex items-center justify-center p-3 w-full border border-gray-300 text-black rounded-md bg-white hover:bg-gray-100"
            >
              <img
                src="/assets/googleicon.jpeg"
                alt="Google Icon"
                className="w-5 h-5 mr-2"
              />
              Sign up with Google
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}

export default SignUp;