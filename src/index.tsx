import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from './dashboard';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import SignIn from './signin';
import SignUp from './signup';
import ProtectedRoute  from './protected-route';
import LandingPage from './landingpage';
import Pricing from './pricing';
import Blog from './blog';
import BlogPost from './blogpost';
import { store } from './redux/store';
import { Provider } from 'react-redux'



const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "zorva-1ef8c.firebaseapp.com",
  projectId: "zorva-1ef8c",
  storageBucket: "zorva-1ef8c.firebasestorage.app",
  messagingSenderId: "321396399417",
  appId: "1:321396399417:web:c411809239ce30f953dce8",
  measurementId: "G-47JCF6MQBE"
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(


<Provider store={store}>
<Router>
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/pricing" element={<Pricing />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/blog/:slug" element={<BlogPost />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/dashboard" element= {
        <ProtectedRoute element={<Dashboard />} />
      } />
  </Routes>
</Router>
</Provider>
);

export default app;


