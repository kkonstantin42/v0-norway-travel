'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Users, Clock, ChevronDown, ChevronUp, Navigation, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Place } from '@/config/places';

interface PlaceCardProps {
  place: Place;
}

function EmbeddedMap({ lat, lng, name }: { lat: number; lng: number; name: string }) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !mapContainerRef.current || mapRef.current) return;

    const initMap = async () => {
      const L = (await import('leaflet')).default;
      await import('leaflet/dist/leaflet.css');

      if (!mapContainerRef.current || mapRef.current) return;

      const map = L.map(mapContainerRef.current, {
        center: [lat, lng],
        zoom: 10,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="width: 32px; height: 32px; background: #3d7a4a; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.3); border: 2px solid white;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });

      L.marker([lat, lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(name);

      mapRef.current = map;
    };

    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isClient, lat, lng, name]);

  if (!isClient) {
    return (
      <div className="h-48 w-full rounded-lg overflow-hidden bg-muted flex items-center justify-center">
        <span className="text-muted-foreground text-sm">Loading map...</span>
      </div>
    );
  }

  return (
    <div 
      ref={mapContainerRef} 
      className="h-48 w-full rounded-lg overflow-hidden z-0"
    />
  );
}

export function PlaceCard({ place }: PlaceCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToImage = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const imageWidth = container.offsetWidth;
      container.scrollTo({ left: imageWidth * index, behavior: 'smooth' });
      setCurrentImageIndex(index);
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const index = Math.round(container.scrollLeft / container.offsetWidth);
      setCurrentImageIndex(index);
    }
  };

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
    <Card className="overflow-hidden bg-card border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Image Carousel */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          onScroll={handleScroll}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {place.images.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-full snap-center">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={image}
                  alt={`${place.name} - Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {place.images.length > 1 && (
          <>
            <button
              onClick={() => scrollToImage(Math.max(0, currentImageIndex - 1))}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-card/90 hover:bg-card p-1.5 rounded-full shadow-md transition-colors disabled:opacity-50"
              disabled={currentImageIndex === 0}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4 text-foreground" />
            </button>
            <button
              onClick={() => scrollToImage(Math.min(place.images.length - 1, currentImageIndex + 1))}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-card/90 hover:bg-card p-1.5 rounded-full shadow-md transition-colors disabled:opacity-50"
              disabled={currentImageIndex === place.images.length - 1}
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4 text-foreground" />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {place.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {place.images.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToImage(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-card' : 'bg-card/50'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Category Badge */}
        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground border-0">
          {place.category}
        </Badge>
      </div>

      {/* Content */}
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-serif text-xl font-medium text-foreground">{place.name}</h3>
          <Badge variant="outline" className={`shrink-0 ${getCrowdLevelColor(place.crowdLevel)}`}>
            <Users className="w-3 h-3 mr-1" />
            {getCrowdLevelText(place.crowdLevel)}
          </Badge>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {place.shortDescription}
        </p>

        {/* Info Row */}
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1.5">
            <Navigation className="w-4 h-4 text-primary" />
            <span>{place.distanceFromBergen} km from Bergen</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-primary" />
            <span>{place.bestTime}</span>
          </div>
        </div>

        {/* Expandable Section */}
        <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[500px]' : 'max-h-0'}`}>
          <div className="pt-4 border-t border-border">
            <p className="text-foreground text-sm leading-relaxed mb-4">
              {place.description}
            </p>
            
            {/* Embedded Map */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    {place.coordinates.lat.toFixed(4)}° N, {place.coordinates.lng.toFixed(4)}° E
                  </span>
                </div>
                <a
                  href={`https://www.google.com/maps?q=${place.coordinates.lat},${place.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm" className="text-xs gap-1.5">
                    <ExternalLink className="w-3 h-3" />
                    Google Maps
                  </Button>
                </a>
              </div>
              {isExpanded && (
                <EmbeddedMap 
                  lat={place.coordinates.lat} 
                  lng={place.coordinates.lng} 
                  name={place.name} 
                />
              )}
            </div>
          </div>
        </div>

        {/* Expand/Collapse Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-3 text-primary hover:text-primary hover:bg-primary/5"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4 mr-1" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-1" />
              Show More Details
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
