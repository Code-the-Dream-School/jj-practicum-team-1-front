import PlantGrid from '../components/PlantGrid';
import Button from '../components/shared/Button';
import { useNavigate } from 'react-router-dom';

export default function PlantsPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                My Plant Collection
              </h1>
              <p className="text-gray-600">
                Discover and manage your plant observations
              </p>
            </div>
            
            {/* Add Plant Button */}
            <Button
              onClick={() => navigate('/identify')}
            >
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add Plant</span>
              </div>
            </Button>
          </div>
        </div>

        {/* Plant Grid */}
        <PlantGrid />
      </div>
    </main>
  );
}
