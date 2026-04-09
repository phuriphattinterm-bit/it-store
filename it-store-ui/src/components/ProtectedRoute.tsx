import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    isAuthenticated: boolean;
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, children }) => {
    const location = useLocation();
    
    return isAuthenticated ? (
        <>{children}</>
    ) : (
        <Navigate to="/products/list" state={{ from: location }} replace />
    );
};

export default ProtectedRoute;