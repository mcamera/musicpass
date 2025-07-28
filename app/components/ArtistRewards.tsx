"use client";

import { Gift, Mic, Music, DiscAlbum, Badge, Star, Trophy } from 'lucide-react';

interface ArtistReward {
  id: string;
  title: string;
  description: string;
  icon: any;
  type: 'unlocked' | 'locked';
  pointsRequired?: number;
  isSpecial?: boolean;
}

interface ArtistRewardsProps {
  artistName: string;
  userPoints: number;
}

export default function ArtistRewards({ artistName, userPoints }: ArtistRewardsProps) {
  // Mock artist-specific rewards data
  const getArtistRewards = (artist: string): ArtistReward[] => {
    const baseRewards: ArtistReward[] = [
      {
        id: '1',
        title: '10% de Desconto em Merch',
        description: 'Desconto exclusivo na loja oficial',
        icon: Gift,
        type: 'unlocked'
      },
      {
        id: '2',
        title: 'Badge Exclusivo',
        description: 'Badge especial no seu perfil',
        icon: Badge,
        type: 'unlocked'
      },
      {
        id: '4',
        title: 'Votar no Setlist',
        description: 'Ajude a escolher as músicas do show',
        icon: Music,
        type: 'locked',
        pointsRequired: 1500
      },
      {
        id: '5',
        title: 'Audição Antecipada',
        description: 'Ouça o novo álbum antes do lançamento',
        icon: DiscAlbum,
        type: 'locked',
        pointsRequired: 2000
      },
      {
        id: '3',
        title: 'Meet & Greet',
        description: 'Encontro exclusivo com o artista',
        icon: Mic,
        type: 'locked',
        pointsRequired: 1200,
        isSpecial: true
      }
    ];

    // Add artist-specific rewards at the end (most important)
    if (artist.toLowerCase().includes('pitty')) {
      baseRewards.push({
        id: '6',
        title: 'Backstage VIP',
        description: 'Acesso exclusivo ao backstage',
        icon: Star,
        type: 'locked',
        pointsRequired: 2500,
        isSpecial: true
      });
    }

    if (artist.toLowerCase().includes('titãs')) {
      baseRewards.push({
        id: '7',
        title: 'Sessão de Fotos',
        description: 'Foto oficial com a banda',
        icon: Trophy,
        type: 'locked',
        pointsRequired: 1800,
        isSpecial: true
      });
    }

    return baseRewards;
  };

  const artistRewards = getArtistRewards(artistName);
  const unlockedRewards = artistRewards.filter(reward => reward.type === 'unlocked');
  const lockedRewards = artistRewards.filter(reward => reward.type === 'locked');

  return (
    <div className="bg-white mt-4 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recompensas do {artistName}</h3>
        <div className="flex items-center text-sm text-gray-500">
          <Star className="h-4 w-4 mr-1 text-yellow-400" />
          <span>{userPoints} pontos</span>
        </div>
      </div>

      {/* Unlocked Rewards */}
      {unlockedRewards.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-green-600 mb-3 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Desbloqueadas
          </h4>
          <div className="space-y-3">
            {unlockedRewards.map((reward) => (
              <div key={reward.id} className="bg-green-50 border border-green-200 p-4 rounded-lg flex items-center">
                <reward.icon className="h-6 w-6 mr-3 text-green-600" />
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900 text-sm">{reward.title}</h5>
                  <p className="text-xs text-gray-600">{reward.description}</p>
                </div>
                <div className="text-green-600">
                  <span className="text-xs font-semibold">✓ ATIVO</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Locked Rewards */}
      {lockedRewards.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-600 mb-3 flex items-center">
            <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
            Próximas Recompensas
          </h4>
          <div className="space-y-3">
            {lockedRewards.map((reward) => {
              const canUnlock = userPoints >= (reward.pointsRequired || 0);
              const progressPercentage = Math.min((userPoints / (reward.pointsRequired || 1)) * 100, 100);
              
              return (
                <div 
                  key={reward.id} 
                  className={`border p-4 rounded-lg flex items-center ${
                    reward.isSpecial 
                      ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200' 
                      : 'bg-gray-50 border-gray-200'
                  } ${canUnlock ? 'opacity-100' : 'opacity-80'}`}
                >
                  <reward.icon className={`h-6 w-6 mr-3 ${
                    reward.isSpecial ? 'text-purple-600' : 'text-gray-400'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <h5 className={`font-semibold text-sm ${
                        reward.isSpecial ? 'text-purple-900' : 'text-gray-700'
                      }`}>
                        {reward.title}
                      </h5>
                      {reward.isSpecial && (
                        <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full font-semibold">
                          ESPECIAL
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{reward.description}</p>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                      <div 
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          canUnlock 
                            ? 'bg-green-500' 
                            : reward.isSpecial 
                              ? 'bg-purple-400' 
                              : 'bg-blue-400'
                        }`}
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        {userPoints} / {reward.pointsRequired} pontos
                      </span>
                      {canUnlock && (
                        <span className="text-xs font-semibold text-green-600">
                          PRONTO PARA DESBLOQUEAR
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Progress Summary */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-blue-900">Progresso Geral</span>
          <span className="text-sm text-blue-700">{unlockedRewards.length} / {artistRewards.length} recompensas</span>
        </div>
        <div className="w-full bg-blue-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(unlockedRewards.length / artistRewards.length) * 100}%` }}
          ></div>
        </div>
        <p className="text-xs text-blue-600 mt-2">
          Continue participando de shows do {artistName} para desbloquear mais recompensas!
        </p>
      </div>
    </div>
  );
} 