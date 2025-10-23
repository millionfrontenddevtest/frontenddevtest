import { ErrorBoundary } from "./components/common/ErrorBoundary";
import { FilterBar } from "./components/property/FilterBar";
import { PropertyList } from "./components/property/PropertyList";
import { useProperties } from "./hooks/useProperties";

function App() {
  const { properties, isLoading, isError, error, applyFilters, resetFilters } =
    useProperties();

  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        {/* Header */}
        <header className="relative bg-white/80 backdrop-blur-xl border-b border-luxury-gold/20 shadow-elevation-2 sticky top-0 z-50">
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-mist via-white to-luxury-champagne/30 opacity-50"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-5">
                <div className="relative w-14 h-14 bg-gradient-to-br from-luxury-gold via-luxury-darkGold to-luxury-gold rounded-lg shadow-luxury flex items-center justify-center animate-float">
                  <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold to-luxury-darkGold rounded-lg opacity-50 blur-md"></div>
                  <svg
                    className="relative w-8 h-8 text-white drop-shadow-lg"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-serif font-bold text-luxury-darkGold tracking-tight">
                    MILLION
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1 tracking-wider uppercase font-medium flex items-center gap-2">
                    <span className="inline-block w-8 h-px bg-gradient-to-r from-luxury-gold to-transparent"></span>
                    Curated Luxury Properties
                    <span className="inline-block w-8 h-px bg-gradient-to-l from-luxury-gold to-transparent"></span>
                  </p>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="relative px-6 py-3 bg-gradient-to-br from-luxury-darkGold to-luxury-gold text-white text-sm font-semibold tracking-wider shadow-elevation-2 rounded-lg overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-luxury-gold/0 via-white/20 to-luxury-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative">
                    {properties.length}{" "}
                    {properties.length === 1 ? "PROPERTY" : "PROPERTIES"}
                  </span>
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
        <footer className="relative bg-gradient-to-b from-white/50 to-luxury-champagne/30 backdrop-blur-md border-t border-luxury-gold/20 mt-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/5 to-transparent"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="inline-block w-12 h-px bg-gradient-to-r from-transparent via-luxury-gold to-transparent"></span>
              <svg
                className="w-5 h-5 text-luxury-gold"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
              </svg>
              <span className="inline-block w-12 h-px bg-gradient-to-l from-transparent via-luxury-gold to-transparent"></span>
            </div>
            <p className="text-center text-gray-500 text-xs tracking-wider uppercase font-medium">
              © 2025 Jose Benhur Florez Garcia
            </p>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;
