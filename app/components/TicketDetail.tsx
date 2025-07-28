"use client";

import { useState } from 'react';
import { Calendar, MapPin, Clock, QrCode, Share2, ArrowLeft } from 'lucide-react';
import ArtistRewards from './ArtistRewards';

interface TicketDetailProps {
  ticket: {
    id: number;
    artist: string;
    event: string;
    date: string;
    city: string;
    imageUrl: string;
    genre: string;
    venue?: string;
    time?: string;
    price?: string;
  };
  onBack: () => void;
}

export default function TicketDetail({ ticket, onBack }: TicketDetailProps) {
  const [showQR, setShowQR] = useState(false);

  // Determine if this ticket can be sold (both Pitty and Titãs tickets can be sold)
  const canSellTicket = ticket.id === 8 || ticket.id === 9;

  // Mock user points for this specific artist
  const getUserPointsForArtist = (artistName: string) => {
    if (artistName.toLowerCase().includes('pitty')) {
      return 850; // Pitty has more points
    } else if (artistName.toLowerCase().includes('titãs')) {
      return 650; // Titãs has fewer points
    }
    return 500; // Default points
  };

  const userPoints = getUserPointsForArtist(ticket.artist);

  return (
    <div className="w-full h-screen bg-gray-100 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white p-4 border-b border-gray-200 flex items-center">
        <button
          onClick={onBack}
          className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
        <div className="flex items-center space-x-2">
          <img 
            src="/musicpass-logo-v2.png" 
            alt="MusicPass Logo" 
            className="w-6 h-6 object-contain"
          />
          <h1 className="text-lg font-semibold text-gray-900">Detalhes do Ingresso</h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        {/* Hero Image */}
        <div className="relative h-64 bg-gradient-to-br from-[#0052FF] to-[#0043CC]">
          <img
            src={ticket.imageUrl}
            alt={`${ticket.artist} - ${ticket.event}`}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
            <div className="p-6 text-white">
              <h2 className="text-2xl font-bold mb-1">{ticket.artist}</h2>
              <p className="text-lg opacity-90">{ticket.event}</p>
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="bg-white p-6 space-y-4">
          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-[#0052FF]" />
            <div>
              <p className="text-sm text-gray-500">Data</p>
              <p className="font-semibold text-gray-900">{ticket.date}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-[#0052FF]" />
            <div>
              <p className="text-sm text-gray-500">Local</p>
              <p className="font-semibold text-gray-900">{ticket.city}</p>
              {ticket.venue && (
                <p className="text-sm text-gray-600">{ticket.venue}</p>
              )}
            </div>
          </div>

          {ticket.time && (
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-[#0052FF]" />
              <div>
                <p className="text-sm text-gray-500">Horário</p>
                <p className="font-semibold text-gray-900">{ticket.time}</p>
              </div>
            </div>
          )}

          {ticket.price && (
            <div className="flex items-center space-x-3">
              <div className="h-5 w-5 bg-[#0052FF] rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">R$</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Valor</p>
                <p className="font-semibold text-gray-900">{ticket.price}</p>
              </div>
            </div>
          )}
        </div>

        {/* QR Code Section - Only show for tickets the user owns */}
        {canSellTicket && (
          <div className="bg-white mt-4 p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Check-in</h3>
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              {showQR ? (
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg inline-block">
                    <QrCode className="h-32 w-32 text-gray-900" />
                  </div>
                  <p className="text-sm text-gray-600">
                    Apresente este QR code na entrada do evento
                  </p>
                </div>
              ) : (
                <button
                  onClick={() => setShowQR(true)}
                  className="bg-[#0052FF] hover:bg-[#0043CC] text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center mx-auto"
                >
                  <QrCode className="h-5 w-5 mr-2" />
                  Mostrar QR Code
                </button>
              )}
            </div>
          </div>
        )}

        {/* Artist Rewards Section */}
        <ArtistRewards 
          artistName={ticket.artist} 
          userPoints={userPoints}
        />

        {/* Action Buttons */}
        <div className="bg-white mt-4 p-6 space-y-3">
          <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center">
            <Share2 className="h-5 w-5 mr-2" />
            Compartilhar Evento
          </button>
          
          {canSellTicket ? (
            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg shadow-red-500/30">
              Vender Ingresso
            </button>
          ) : (
            <button className="w-full bg-[#0052FF] hover:bg-[#0043CC] text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg shadow-[#0052FF]/30">
              Comprar Ingresso
            </button>
          )}
        </div>
      </main>
    </div>
  );
} 