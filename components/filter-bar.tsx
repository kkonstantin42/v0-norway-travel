'use client';

import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categoryFilter: string;
  onCategoryChange: (category: string) => void;
  crowdFilter: string;
  onCrowdChange: (crowd: string) => void;
  categories: string[];
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  crowdFilter,
  onCrowdChange,
  categories,
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search places..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-card border-border"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <Select value={categoryFilter} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[140px] bg-card border-border">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={crowdFilter} onValueChange={onCrowdChange}>
          <SelectTrigger className="w-[130px] bg-card border-border">
            <SelectValue placeholder="Crowds" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Crowds</SelectItem>
            <SelectItem value="low">Low Crowds</SelectItem>
            <SelectItem value="medium">Moderate</SelectItem>
            <SelectItem value="high">Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
