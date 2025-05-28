import React from 'react';
import { toast } from 'react-toastify';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    toast.error('Something went wrong. Please try refreshing the page.');
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Oops! Something went wrong
              </h2>
              <p className="text-gray-600 mb-6">
                We're sorry, but something went wrong. Please try refreshing the page.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition text-base font-medium"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
