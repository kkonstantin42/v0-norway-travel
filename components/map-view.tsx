'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin, Users, Navigation, Clock, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Place } from '@/config/places';

interface MapViewProps {
  places: Place[];
}

export function MapView({ places }: MapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Dynamically import Leaflet
    const loadMap = async () => {
      const L = (await import('leaflet')).default;
      await import('leaflet/dist/leaflet.css');

      if (!mapContainerRef.current || mapRef.current) return;

      // Initialize map centered on Norway
      const map = L.map(mapContainerRef.current, {
        center: [64.5, 11],
        zoom: 5,
        scrollWheelZoom: true,
      });

      // Add OpenStreetMap tiles with a clean style
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      // Custom marker icon
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="
          background-color: oklch(0.45 0.12 150);
          width: 32px;
          height: 32px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        ">
          <svg style="transform: rotate(45deg);" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      // Add markers for each place
      places.forEach((place) => {
        const marker = L.marker([place.coordinates.lat, place.coordinates.lng], {
          icon: customIcon,
        }).addTo(map);

        marker.on('click', () => {
          setSelectedPlace(place);
          map.flyTo([place.coordinates.lat, place.coordinates.lng], 8, {
            duration: 1,
          });
        });
      });

      mapRef.current = map;
      setIsLoaded(true);
    };

    loadMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isClient, places]);

  const getCrowdLevelColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'medium':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'high':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getCrowdLevelText = (level: string) => {
    switch (level) {
      case 'low':
        return 'Low Crowds';
      case 'medium':
        return 'Moderate';
      case 'high':
        return 'Popular';
      default:
        return level;
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-200px)] min-h-[500px] rounded-xl overflow-hidden border border-border">
      <div ref={mapContainerRef} className="w-full h-full z-0" />
      
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-muted-foreground text-sm">Loading map...</p>
          </div>
        </div>
      )}

      {/* Selected Place Panel */}
      {selectedPlace && (
        <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-card rounded-xl shadow-xl border border-border overflow-hidden z-[1000]">
          <div className="relative">
            <img
              src={selectedPlace.images[0]}
              alt={selectedPlace.name}
              className="w-full h-40 object-cover"
            />
            <button
              onClick={() => setSelectedPlace(null)}
              className="absolute top-3 right-3 bg-card/90 hover:bg-card p-1.5 rounded-full shadow-md transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-foreground" />
            </button>
            <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground border-0">
              {selectedPlace.category}
            </Badge>
          </div>
          
          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-serif text-lg font-medium text-foreground">{selectedPlace.name}</h3>
              <Badge variant="outline" className={`shrink-0 text-xs ${getCrowdLevelColor(selectedPlace.crowdLevel)}`}>
                <Users className="w-3 h-3 mr-1" />
                {getCrowdLevelText(selectedPlace.crowdLevel)}
              </Badge>
            </div>
            
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">
              {selectedPlace.shortDescription}
            </p>

            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Navigation className="w-3 h-3 text-primary" />
                <span>{selectedPlace.distanceFromBergen} km from Bergen</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-primary" />
                <span>{selectedPlace.bestTime}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-border">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span className="text-xs text-muted-foreground">
                {selectedPlace.coordinates.lat.toFixed(4)}° N, {selectedPlace.coordinates.lng.toFixed(4)}° E
              </span>
              <a
                href={`https://www.google.com/maps?q=${selectedPlace.coordinates.lat},${selectedPlace.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto"
              >
                <Button variant="outline" size="sm" className="text-xs h-7">
                  Open in Maps
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Place Legend */}
      <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg shadow-lg border border-border p-3 z-[1000]">
        <p className="text-xs font-medium text-foreground mb-2">{places.length} Notable Places</p>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span>Low Crowds</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span>Moderate</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <span>Popular</span>
          </div>
        </div>
      </div>
    </div>
  );
}
