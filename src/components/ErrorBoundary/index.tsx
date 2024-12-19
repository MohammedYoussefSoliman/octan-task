import React from 'react';

import { useNavigate } from 'react-router-dom';

import { ErrorBoundaryProps } from './types';

export default function ErrorBoundary({ children, error }: ErrorBoundaryProps) {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (error) navigate('/error');
  }, [error, navigate]);

  if (error) return null;

  return children;
}
