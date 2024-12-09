import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from './index'; // Adjust the import according to your project structure

interface ProtectedRouteProps {
    element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const auth = getAuth(app);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [auth]);

    if (isAuthenticated === null) {
        // Optionally, you can return a loading indicator while checking authentication
        return <div>Loading...</div>;
    }

    return isAuthenticated ? element : <Navigate to="/signin" />;
};

export default ProtectedRoute;