# MusicPass - Blockchain-Based Event Ticketing Platform

A revolutionary blockchain-based ticketing platform built on BASE (Coinbase's Layer 2 Ethereum solution) that transforms traditional tickets into secure, programmable NFTs.

## 🎵 Mission

"O acesso que todo fã deveria ter!" - To provide the access that every fan deserves through secure, transparent, and fair event ticketing.

## ✨ Features

### Core Functionality
- **Secure NFT Tickets**: Each ticket is a unique NFT on the BASE blockchain
- **Wallet Integration**: Seamless connection with Coinbase Wallet and other Web3 wallets
- **Event Discovery**: Browse and search upcoming events by genre, location, and artist
- **Ticket Management**: View, share, and transfer your NFT tickets
- **Rewards System**: Earn points and unlock exclusive benefits based on your attendance
- **QR Code Check-in**: Secure event entry with dynamic QR codes

### Technical Features
- **BASE Network Integration**: Built on Coinbase's Layer 2 solution for low fees and fast transactions
- **Smart Contract Architecture**: ERC-721 tickets with EIP-2981 royalty support
- **Mobile-First Design**: Optimized for mobile devices with responsive UI
- **Real-time Updates**: Live ticket availability and price updates
- **Offline Support**: Local validation with blockchain synchronization

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- A Web3 wallet (Coinbase Wallet recommended)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/musicpass.git
cd musicpass
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Connecting Your Wallet

1. Click "Conectar Carteira" on the login screen
2. Choose your preferred wallet (Coinbase Wallet, MetaMask, etc.)
3. Approve the connection to access your MusicPass tickets

## 📱 App Structure

### Screens

#### 1. Login Screen
- BASE branding with official logo
- Wallet connection interface
- Secure authentication flow

#### 2. Tickets Screen ("Meus Ingressos")
- Genre-organized ticket collections
- Horizontal scrolling carousels
- Quick access to ticket details
- Event discovery integration

#### 3. Event Discovery
- Search functionality for artists, events, and cities
- Genre-based filtering
- Event ratings and pricing
- Favorite events management

#### 4. Ticket Details
- Comprehensive event information
- QR code generation for check-in
- Share and transfer options
- Venue and timing details

#### 5. Rewards Center ("Central de Vantagens")
- User reputation system
- Progress tracking to next level
- Unlocked and locked benefits
- Points-based rewards

### Components

- `TicketDetail.tsx`: Detailed ticket view with QR code
- `EventDiscovery.tsx`: Event browsing and search interface
- `DemoComponents.tsx`: Reusable UI components with BASE styling

## 🎨 Design System

### BASE Brand Integration
- **Primary Color**: `#0052FF` (BASE Blue)
- **Secondary Color**: `#0043CC` (BASE Dark Blue)
- **Typography**: Clean, modern sans-serif fonts
- **Icons**: Lucide React icon library
- **Layout**: Mobile-first responsive design

### Color Palette
```css
--base-blue: #0052FF
--base-dark-blue: #0043CC
--gray-100: #f3f4f6
--gray-200: #e5e7eb
--gray-500: #6b7280
--gray-800: #1f2937
--gray-900: #111827
```

## 🔧 Technical Architecture

### Frontend
- **Framework**: Next.js 15 with React 18
- **Styling**: Tailwind CSS with custom utilities
- **State Management**: React hooks and context
- **Wallet Integration**: @coinbase/onchainkit
- **Icons**: Lucide React

### Blockchain Integration
- **Network**: BASE (Chain ID: 8453)
- **Smart Contracts**: ERC-721 with EIP-2981 royalties
- **Wallet Support**: Coinbase Wallet, MetaMask, WalletConnect
- **Transaction Handling**: Viem and Wagmi

### Key Dependencies
```json
{
  "@coinbase/onchainkit": "latest",
  "next": "^15.3.3",
  "react": "^18",
  "tailwindcss": "^3.4.1",
  "lucide-react": "latest",
  "viem": "^2.27.2",
  "wagmi": "^2.14.11"
}
```

## 🎯 User Flows

### 1. Event Discovery & Purchase
1. Browse events in the discovery tab
2. Filter by genre, location, or search terms
3. Select desired event
4. Connect wallet and approve transaction
5. Receive NFT ticket in wallet

### 2. Ticket Management
1. View tickets organized by genre
2. Tap ticket for detailed information
3. Generate QR code for event entry
4. Share or transfer tickets as needed

### 3. Rewards & Loyalty
1. Attend events to earn points
2. Track progress toward next level
3. Unlock exclusive benefits
4. Access pre-sales and special offers

## 🔒 Security Features

- **Smart Contract Audits**: Regular security reviews
- **Multi-signature Support**: For high-value operations
- **Dynamic QR Codes**: Time-based, cryptographically signed
- **Anti-replay Protection**: Prevent duplicate check-ins
- **Emergency Pause**: Ability to halt operations if needed

## 📊 Business Model

### Revenue Streams
- **Primary Market**: 5% platform fee on ticket sales
- **Secondary Market**: 2.5% transaction fee + 10% royalties
- **Premium Features**: Analytics, marketing tools, VIP services

### Cost Structure
- **Development**: Smart contracts, mobile app, backend
- **Operations**: Infrastructure, support, marketing
- **Security**: Audits, bug bounties, insurance

## 🚧 Development Roadmap

### Phase 1: MVP (Months 1-3)
- [x] Smart contract development
- [x] Basic mobile app with wallet integration
- [x] Event creation and ticket minting
- [x] Simple marketplace functionality
- [x] Basic check-in system

### Phase 2: Beta (Months 3-6)
- [ ] Security audit completion
- [ ] Advanced marketplace features
- [ ] Analytics dashboard for organizers
- [ ] POAP integration
- [ ] Performance optimization

### Phase 3: Production (Months 6-9)
- [ ] Full feature set deployment
- [ ] Advanced security features
- [ ] Scalability improvements
- [ ] API documentation and SDK
- [ ] Third-party integrations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.musicpass.com](https://docs.musicpass.com)
- **Discord**: [discord.gg/musicpass](https://discord.gg/musicpass)
- **Email**: support@musicpass.com
- **Twitter**: [@MusicPassApp](https://twitter.com/MusicPassApp)

## 🙏 Acknowledgments

- Built on [BASE](https://base.org) by Coinbase
- Powered by [OnchainKit](https://onchainkit.com)
- Icons by [Lucide](https://lucide.dev)
- Styling with [Tailwind CSS](https://tailwindcss.com)

---

**MusicPass** - O acesso que todo fã deveria ter! 🎵✨
