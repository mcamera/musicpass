"use client";

import { useState, useMemo } from 'react';
import { Ticket, Star, Gift, Music, Mic, DiscAlbum, Badge, Search } from 'lucide-react';

import TicketDetail from './components/TicketDetail';
import EventDiscovery from './components/EventDiscovery';

// Types
interface Ticket {
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
}

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

// Mock Data for Tickets with Genre - Reduced to only Pitty and Titãs
const mockTickets: Ticket[] = [
  // Rock
  { id: 8, artist: 'Pitty', event: 'ACNXX', date: '05 OUT 2025', city: 'Porto Alegre, RS', imageUrl: 'https://placehold.co/200x200/ef4444/FFFFFF?text=Pitty', genre: 'Rock', venue: 'Arena do Grêmio', time: '21:30', price: 'R$ 100' },
  { id: 9, artist: 'Titãs', event: 'Encontro', date: '19 OUT 2025', city: 'Brasília, DF', imageUrl: 'https://placehold.co/200x200/78716c/FFFFFF?text=Tit%C3%A3s', genre: 'Rock', venue: 'Arena BRB', time: '20:00', price: 'R$ 90' },
];

// Mock Data for Rewards
const mockRewards = {
  unlocked: [
    { icon: Gift, text: '10% de Desconto em Merch' },
    { icon: Ticket, text: 'Acesso à Pré-venda Exclusiva' },
    { icon: Badge, text: 'Badge Exclusivo no Perfil' },
  ],
  locked: [
    { icon: Mic, text: 'Acesso a Meet & Greet', points: 1200 },
    { icon: Music, text: 'Votar no Setlist do Show', points: 1500 },
    { icon: DiscAlbum, text: 'Audição Antecipada de Álbum', points: 2000 },
  ],
};

// Mock NFT Collection Data
const mockNFTs = [
  // Pitty NFTs
  {
    id: 1,
    artist: 'Pitty',
    name: 'Pitty #001 - ACNXX Tour',
    description: 'NFT exclusivo da turnê ACNXX',
    imageUrl: 'https://placehold.co/300x300/ef4444/FFFFFF?text=Pitty+NFT+001',
    rarity: 'Raro',
    collection: 'ACNXX Collection',
    mintDate: '2024-03-15',
    tokenId: '0x1234...5678'
  },
  {
    id: 2,
    artist: 'Pitty',
    name: 'Pitty #002 - Backstage Pass',
    description: 'Acesso exclusivo ao backstage',
    imageUrl: 'https://placehold.co/300x300/dc2626/FFFFFF?text=Pitty+NFT+002',
    rarity: 'Épico',
    collection: 'ACNXX Collection',
    mintDate: '2024-04-20',
    tokenId: '0x2345...6789'
  },
  {
    id: 3,
    artist: 'Pitty',
    name: 'Pitty #003 - Meet & Greet',
    description: 'Encontro exclusivo com Pitty',
    imageUrl: 'https://placehold.co/300x300/b91c1c/FFFFFF?text=Pitty+NFT+003',
    rarity: 'Lendário',
    collection: 'ACNXX Collection',
    mintDate: '2024-05-10',
    tokenId: '0x3456...7890'
  },
  {
    id: 4,
    artist: 'Pitty',
    name: 'Pitty #004 - Setlist Vote',
    description: 'Direito de votar no setlist',
    imageUrl: 'https://placehold.co/300x300/991b1b/FFFFFF?text=Pitty+NFT+004',
    rarity: 'Raro',
    collection: 'ACNXX Collection',
    mintDate: '2024-06-05',
    tokenId: '0x4567...8901'
  },
  // Titãs NFTs
  {
    id: 5,
    artist: 'Titãs',
    name: 'Titãs #001 - Encontro Tour',
    description: 'NFT exclusivo da turnê Encontro',
    imageUrl: 'https://placehold.co/300x300/78716c/FFFFFF?text=Tit%C3%A3s+NFT+001',
    rarity: 'Raro',
    collection: 'Encontro Collection',
    mintDate: '2024-02-28',
    tokenId: '0x5678...9012'
  },
  {
    id: 6,
    artist: 'Titãs',
    name: 'Titãs #002 - Sessão de Fotos',
    description: 'Foto oficial com a banda',
    imageUrl: 'https://placehold.co/300x300/57534e/FFFFFF?text=Tit%C3%A3s+NFT+002',
    rarity: 'Épico',
    collection: 'Encontro Collection',
    mintDate: '2024-03-30',
    tokenId: '0x6789...0123'
  },
  {
    id: 7,
    artist: 'Titãs',
    name: 'Titãs #003 - Soundcheck VIP',
    description: 'Acesso ao soundcheck exclusivo',
    imageUrl: 'https://placehold.co/300x300/44403c/FFFFFF?text=Tit%C3%A3s+NFT+003',
    rarity: 'Lendário',
    collection: 'Encontro Collection',
    mintDate: '2024-04-15',
    tokenId: '0x7890...1234'
  },
  {
    id: 8,
    artist: 'Titãs',
    name: 'Titãs #004 - Merch Exclusivo',
    description: 'Produtos exclusivos da banda',
    imageUrl: 'https://placehold.co/300x300/292524/FFFFFF?text=Tit%C3%A3s+NFT+004',
    rarity: 'Raro',
    collection: 'Encontro Collection',
    mintDate: '2024-05-22',
    tokenId: '0x8901...2345'
  }
];

// Mock User Reputation Data
const userReputation = {
    currentPoints: 750,
    nextLevelPoints: 1000,
    currentLevel: 'Fã Lendário',
    nextLevel: 'Ícone Musical',
};

// Main App Component
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return <MainAppScreen />;
}

// 1. Login Screen Component - UPDATED to Light Theme with BASE branding
const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
  return (
    <div className="w-full h-screen bg-gray-100 text-gray-800 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-sm text-center">
        <img 
          src="/musicpass-logo-v2.png" 
          alt="MusicPass Logo" 
          className="w-140 h-140 mx-auto mb-8 object-contain"
        />
        <p className="text-gray-600 mb-8 text-lg font-medium">O acesso que todo fã deveria ter!</p>
        <button
          onClick={onLogin}
          className="w-full bg-[#0052FF] hover:bg-[#0043CC] text-white text-lg font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg shadow-[#0052FF]/30"
        >
          Entrar
        </button>
      </div>
    </div>
  );
};

// Main container for the app after login - UPDATED to Light Theme
const MainAppScreen = () => {
  const [activeTab, setActiveTab] = useState('tickets');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  if (selectedTicket) {
    return (
      <TicketDetail
        ticket={selectedTicket}
        onBack={() => setSelectedTicket(null)}
      />
    );
  }

  return (
    <div className="w-full h-screen bg-gray-100 font-sans flex flex-col">
       <header className="p-4 text-gray-900 text-center border-b border-gray-200 bg-white">
        <div className="flex items-center justify-center space-x-3">
          <img 
            src="/musicpass-logo-v2.png" 
            alt="MusicPass Logo" 
            className="w-8 h-8 object-contain"
          />
          <h1 className="text-xl font-bold">MusicPass</h1>
        </div>
      </header>
      <main className="flex-grow overflow-y-auto">
        {activeTab === 'tickets' && (
          <TicketsScreen
            onTicketSelect={setSelectedTicket}
          />
        )}
        {activeTab === 'rewards' && <RewardsScreen />}
        {activeTab === 'discover' && (
          <EventDiscovery
            onEventSelect={(event: Event) => {
              // Handle event selection - could navigate to purchase flow
              console.log('Selected event:', event);
            }}
            onBack={() => setActiveTab('tickets')}
          />
        )}
      </main>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

// 2. "Meus Ingressos" Screen Component - UPDATED to Light Theme
const TicketsScreen = ({ 
  onTicketSelect
}: { 
  onTicketSelect: (ticket: Ticket) => void;
}) => {
  const groupedTickets = useMemo(() => {
    return mockTickets.reduce((acc: Record<string, Ticket[]>, ticket) => {
      const genre = ticket.genre || 'Outros';
      if (!acc[genre]) {
        acc[genre] = [];
      }
      acc[genre].push(ticket);
      return acc;
    }, {});
  }, []);

  const genreOrder = ['Rock'];

  return (
    <div className="text-gray-900">
      <div className="text-center p-4">
        <h2 className="text-2xl font-bold">Meus Ingressos</h2>
        <p className="text-gray-500 max-w-xs mx-auto text-sm mt-2">
          Sua coleção de memórias que contam a sua história de fã.
        </p>
      </div>
      
      <div className="space-y-8 py-4">
        {genreOrder.map(genre => (
          groupedTickets[genre] && (
            <TicketCategoryCarousel 
              key={genre} 
              genre={genre} 
              tickets={groupedTickets[genre]}
              onTicketSelect={onTicketSelect}
            />
          )
        ))}
      </div>
    </div>
  );
};

// New component for the category carousel
const TicketCategoryCarousel = ({ 
  genre, 
  tickets, 
  onTicketSelect 
}: { 
  genre: string; 
  tickets: Ticket[];
  onTicketSelect: (ticket: Ticket) => void;
}) => {
  return (
    <section>
      <h3 className="text-xl font-bold px-4 mb-3">{genre}</h3>
      <div className="flex overflow-x-auto space-x-4 px-4 pb-4 scrollbar-hide">
        {tickets.map(ticket => (
          <TicketCarouselItem 
            key={ticket.id} 
            ticket={ticket} 
            onSelect={onTicketSelect}
          />
        ))}
      </div>
    </section>
  );
};

// New component for the carousel item - UPDATED to Light Theme
const TicketCarouselItem = ({ 
  ticket, 
  onSelect 
}: { 
  ticket: Ticket;
  onSelect: (ticket: Ticket) => void;
}) => {
  return (
    <div 
      className="w-44 flex-shrink-0 cursor-pointer" 
      onClick={() => onSelect(ticket)}
    > 
      <img src={ticket.imageUrl} alt={`Arte para ${ticket.artist}`} className="w-full h-44 rounded-lg object-cover mb-2 shadow-lg" />
      <h4 className="font-bold truncate text-sm text-gray-800">{ticket.artist}</h4>
      <p className="text-xs text-gray-500 truncate">{ticket.event}</p>
    </div>
  );
};

// 3. Rewards Screen Component - UPDATED to Light Theme
const RewardsScreen = () => {
  const progressPercentage = (userReputation.currentPoints / userReputation.nextLevelPoints) * 100;

  // Group NFTs by artist
  const nftsByArtist = mockNFTs.reduce((acc, nft) => {
    if (!acc[nft.artist]) {
      acc[nft.artist] = [];
    }
    acc[nft.artist].push(nft);
    return acc;
  }, {} as Record<string, typeof mockNFTs>);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Lendário':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
      case 'Épico':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      case 'Raro':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="p-4 text-gray-800">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Central de Vantagens</h2>
        <p className="text-gray-500 max-w-md mx-auto text-sm mt-2">
          Sua coleção de NFTs alimenta sua reputação. Quanto mais shows, mais sua lealdade é reconhecida com benefícios reais.
        </p>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
        <div className="flex justify-between items-center mb-1">
            <p className="text-sm text-blue-700 uppercase font-semibold">Nível Atual</p>
            <p className="text-sm text-blue-700 uppercase font-semibold">Próximo Nível</p>
        </div>
        <div className="flex justify-between items-center mb-4">
            <p className="text-xl font-bold text-gray-900">{userReputation.currentLevel}</p>
            <p className="text-xl font-bold text-gray-500">{userReputation.nextLevel}</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
        </div>
        <p className="text-center text-sm text-gray-600 font-medium">
            {userReputation.currentPoints} / {userReputation.nextLevelPoints} Pontos
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">NFTs Desbloqueados</h3>
        <div className="space-y-6">
          {Object.entries(nftsByArtist).map(([artist, nfts]) => (
            <div key={artist} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 border-b border-gray-200">
                <h4 className="font-semibold text-gray-900">{artist}</h4>
                <p className="text-sm text-gray-600">{nfts.length} NFTs na coleção</p>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  {nfts.map((nft) => (
                    <div key={nft.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="relative mb-3">
                        <img 
                          src={nft.imageUrl} 
                          alt={nft.name}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${getRarityColor(nft.rarity)}`}>
                          {nft.rarity}
                        </div>
                      </div>
                      <h5 className="font-semibold text-sm text-gray-900 mb-1 truncate">{nft.name}</h5>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">{nft.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{nft.collection}</span>
                        <div className="text-xs text-gray-400 font-mono">{nft.tokenId}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Bottom Navigation Component - UPDATED to Light Theme with 3 tabs
const BottomNav = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
  const navItems = [
    { id: 'tickets', label: 'Ingressos', icon: Ticket },
    { id: 'discover', label: 'Descobrir', icon: Search },
    { id: 'rewards', label: 'Recompensas', icon: Star },
  ];

  return (
    <nav className="flex-shrink-0 bg-white p-2 border-t border-gray-200">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center w-20 py-2 rounded-lg transition-colors duration-200 ${
              activeTab === item.id ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <item.icon className="h-6 w-6 mb-1" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
