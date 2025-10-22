import { ErrorBoundary } from "./components/common/ErrorBoundary";
import { FilterBar } from "./components/property/FilterBar";
import { PropertyList } from "./components/property/PropertyList";
import { useProperties } from "./hooks/useProperties";

function App() {
  const { properties, isLoading, isError, error, applyFilters, resetFilters } =
    useProperties();

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-luxury-pearl">
        {/* Header */}
        <header className="bg-white border-b border-luxury-champagne">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-luxury-gold to-luxury-darkGold rounded-sm flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                  </svg>
                </div>
                <div>
                  <h1 className="text-4xl font-serif font-semibold text-luxury-charcoal tracking-tight">
                    PRESTIGE ESTATES
                  </h1>
                  <p className="text-sm text-gray-500 mt-1 tracking-wide uppercase font-light">
                    Curated Luxury Properties
                  </p>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="px-5 py-2 bg-luxury-champagne text-luxury-charcoal text-sm font-medium tracking-wide">
                  {properties.length}{" "}
                  {properties.length === 1 ? "PROPERTY" : "PROPERTIES"}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Filter Section */}
          <FilterBar onFilterChange={applyFilters} onReset={resetFilters} />

          {/* Property List */}
          <PropertyList
            properties={properties}
            isLoading={isLoading}
            isError={isError}
            error={error}
          />
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-luxury-champagne mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-center text-gray-400 text-xs tracking-wide uppercase font-light">
              © 2025 Prestige Estates · Crafted with Excellence
            </p>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;
