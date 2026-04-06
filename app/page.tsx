'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/header';
import { ViewToggle } from '@/components/view-toggle';
import { FilterBar } from '@/components/filter-bar';
import { PlaceCard } from '@/components/place-card';
import { MapView } from '@/components/map-view';
import { places } from '@/config/places';

export default function HomePage() {
  const [view, setView] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [crowdFilter, setCrowdFilter] = useState('all');

  // Get unique categories
  const categories = useMemo(() => {
    return [...new Set(places.map((place) => place.category))];
  }, []);

  // Filter places
  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
      const matchesSearch =
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || place.category === categoryFilter;
      const matchesCrowd = crowdFilter === 'all' || place.crowdLevel === crowdFilter;
      return matchesSearch && matchesCategory && matchesCrowd;
    });
  }, [searchQuery, categoryFilter, crowdFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,100 L0,60 Q25,40 50,60 T100,60 L100,100 Z" fill="currentColor" />
            <path d="M0,100 L0,70 Q35,50 70,70 T100,70 L100,100 Z" fill="currentColor" opacity="0.5" />
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-primary-foreground mb-4 text-balance">
              Explore the Wonders of Norway
            </h2>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              From dramatic fjords to the northern lights, discover the most breathtaking 
              destinations Norway has to offer. Plan your perfect Norwegian adventure.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <ViewToggle view={view} onViewChange={setView} />
            <p className="text-sm text-muted-foreground">
              {filteredPlaces.length} {filteredPlaces.length === 1 ? 'place' : 'places'} found
            </p>
          </div>
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            crowdFilter={crowdFilter}
            onCrowdChange={setCrowdFilter}
            categories={categories}
          />
        </div>

        {/* Content */}
        {view === 'list' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
            {filteredPlaces.length === 0 && (
              <div className="col-span-full py-16 text-center">
                <p className="text-muted-foreground">No places match your search criteria.</p>
              </div>
            )}
          </div>
        ) : (
          <MapView places={filteredPlaces} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Discover Norway - Your guide to notable places
            </p>
            <p className="text-sm text-muted-foreground">
              Data curated with love for Norwegian nature
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
