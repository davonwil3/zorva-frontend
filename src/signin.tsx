import React from "react";
import './authentication.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {app} from './index';
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
      navigate('/files');
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await setPersistence(auth, browserSessionPersistence);
      await signInWithPopup(auth, provider);
      navigate('/files')
     
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
            <div className="create-account-ask">
              <p>Dont have an account?</p>
              <Link to="/signup">
                <button>Create an account</button>
              </Link>
            </div>
            
            <form className="authentication-form" onSubmit={signInWithEmail}>
              <h1>Sign in to Zorva </h1>
              <p>Enter your details below</p>
              <div className="form-group" >
                <label htmlFor="email">Email address</label>
                <input type="email" value={email} id="email" name="email" onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" value={password} id="password" name="password" onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="form-group">
                <button type="submit">Sign In</button>
              </div>
              <div className="authentication-alt-signin">
                <p>Or sign in using</p>
                <button type="button" onClick={signInWithGoogle} style={{backgroundColor:"white", color: "black", border:"1px solid black", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <img src="/assets/googleicon.jpeg" alt="" style={{width: '20px', height: '19px', marginRight: '10px'}}/>
                  Sign in with Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;