
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Scale } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
        <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6">
          <Scale className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-blue-900">404</h1>
        <p className="text-xl text-gray-600 mb-8">הדף המבוקש לא נמצא</p>
        <Button asChild size="lg">
          <Link to="/" className="px-8">
            חזרה לדף הבית
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
