import React from "react";
import "./appstyles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from './index';



function SignUp() {

  const auth = getAuth(app);
  const navigate = useNavigate();
  const provider = new FacebookAuthProvider();

  const signup = async (firebaseUid: string, email: string | null) => {
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/adduser`, {
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
    <div>
      <div className="authentication-page">
        <div className="authentication-container">
          <div className="authentication-image"></div>
          <div className="authentication-form-container">
            
          <form className="authentication-form" onSubmit={signUpWithEmail}>
              <h1>Sign Up to jolix </h1>
              <p>Create an account below</p>
              <div className="form-group" >
                <label htmlFor="email">Email address</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />
              </div>
              <div className="form-group">
                <button type="submit">Sign Up</button>
              </div>
              <div className="authentication-alt-signin">
                <p>Or sign up using</p>
                <button type="button" onClick={signUpWithFacebook}><FontAwesomeIcon icon={faFacebookF} style={{marginRight: '10px'}}/>Sign up with Facebook</button>
                <button type="button" onClick={signUpWithGoogle} style={{backgroundColor:"white", color: "black", border:"1px solid black", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <img src="/assets/googleicon.jpeg" alt="" style={{width: '20px', height: '19px', marginRight: '10px'}}/>
                  Sign up with Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;