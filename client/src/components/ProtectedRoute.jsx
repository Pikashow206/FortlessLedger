import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children, requireAdmin = false }) {
    const { user } = useContext(AuthContext);

    // If there is no user logged in, send them to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // If the route requires an Admin, but the user is a Customer, send them to dashboard
    if (requireAdmin && user.role !== 'ADMIN') {
        return <Navigate to="/dashboard" replace />;
    }

    // If everything is good, render the page!
    return children;
}