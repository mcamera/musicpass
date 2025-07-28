"use client";

import { useState, useMemo } from 'react';
import { Search, Filter, MapPin, Calendar, Star, Heart, ArrowLeft } from 'lucide-react';

// Types
interface Event {
  id: number;
  artist: string;
  event: string;
  date: string;
  city: string;
  venue: string;
  imageUrl: string;
  genre: string;
  price: string;
  rating: number;
  isFavorite: boolean;
}

// Mock upcoming events data
const mockUpcomingEvents: Event[] = [
  {
    id: 1,
    artist: 'Anitta',
    event: 'Funk Generation World Tour',
    date: '15 JAN 2025',
    city: 'São Paulo, SP',
    venue: 'Allianz Parque',
    imageUrl: 'https://placehold.co/300x200/FF6B6B/FFFFFF?text=Anitta',
    genre: 'Pop',
    price: 'R$ 120',
    rating: 4.8,
    isFavorite: false,
  },
  {
    id: 2,
    artist: 'Ludmilla',
    event: 'Numanice World Tour',
    date: '22 JAN 2025',
    city: 'Rio de Janeiro, RJ',
    venue: 'Maracanã',
    imageUrl: 'https://placehold.co/300x200/4ECDC4/FFFFFF?text=Ludmilla',
    genre: 'Pop',
    price: 'R$ 150',
    rating: 4.9,
    isFavorite: true,
  },
  {
    id: 3,
    artist: 'Projota',
    event: 'Projota Acústico',
    date: '28 JAN 2025',
    city: 'Belo Horizonte, MG',
    venue: 'Teatro Bradesco',
    imageUrl: 'https://placehold.co/300x200/45B7D1/FFFFFF?text=Projota',
    genre: 'Hip-Hop',
    price: 'R$ 80',
    rating: 4.7,
    isFavorite: false,
  },
  {
    id: 4,
    artist: 'Ivete Sangalo',
    event: 'Ivete Sangalo Live',
    date: '05 FEV 2025',
    city: 'Salvador, BA',
    venue: 'Arena Fonte Nova',
    imageUrl: 'https://placehold.co/300x200/96CEB4/FFFFFF?text=Ivete',
    genre: 'Axé',
    price: 'R$ 200',
    rating: 4.9,
    isFavorite: false,
  },
];

const genres = ['Todos', 'Pop', 'Hip-Hop', 'Rock', 'Eletrônica', 'Axé', 'MPB'];

interface EventDiscoveryProps {
  onEventSelect: (event: Event) => void;
  onBack: () => void;
}

export default function EventDiscovery({ onEventSelect, onBack }: EventDiscoveryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Todos');
  const [showFilters, setShowFilters] = useState(false);

  const filteredEvents = useMemo(() => {
    return mockUpcomingEvents.filter(event => {
      const matchesSearch = event.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.city.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGenre = selectedGenre === 'Todos' || event.genre === selectedGenre;
      
      return matchesSearch && matchesGenre;
    });
  }, [searchTerm, selectedGenre]);

  return (
    <div className="w-full h-screen bg-gray-100 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold text-gray-900">Explorar Eventos</h1>
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar eventos, artistas ou locais..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0052FF] focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">Filtros</span>
            <button
              onClick={() => setSelectedGenre('Todos')}
              className="flex items-center text-sm text-[#0052FF]"
            >
              <Filter className="h-4 w-4 mr-1" />
              Filtros
            </button>
          </div>
          <div className="flex overflow-x-auto space-x-2 pb-2 scrollbar-hide">
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedGenre === genre
                    ? 'bg-[#0052FF] text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Events List */}
      <main className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {filteredEvents.map(event => (
            <div
              key={event.id}
              onClick={() => onEventSelect(event)}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex">
                <img
                  src={event.imageUrl}
                  alt={`${event.artist} - ${event.event}`}
                  className="w-24 h-24 object-cover"
                />
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg">{event.artist}</h3>
                      <p className="text-gray-600 text-sm mb-2">{event.event}</p>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {event.date}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {event.city}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-400 mr-1" />
                          <span className="text-xs text-gray-600">{event.rating}</span>
                        </div>
                        <span className="font-bold text-[#0052FF]">{event.price}</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Toggle favorite logic would go here
                      }}
                      className="ml-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          event.isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Nenhum evento encontrado</h3>
            <p className="text-gray-500 text-sm">
              Tente ajustar seus filtros ou termos de busca
            </p>
          </div>
        )}
      </main>
    </div>
  );
} 