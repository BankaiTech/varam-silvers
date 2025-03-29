# Varam Silvers - Children's Silver Jewelry E-commerce

A modern and beautiful e-commerce website built with Next.js, Bootstrap, and Framer Motion for selling children's silver jewelry.

## Features

- 🛍️ Modern and responsive design
- 🎨 Beautiful animations and transitions
- 🔐 User authentication
- 🛒 Shopping cart functionality
- 💳 Secure payment integration
- 📱 Mobile-friendly interface
- 🔍 Product filtering and sorting
- 📦 Order tracking
- 💝 Wishlist functionality

## Tech Stack

- Next.js 14
- TypeScript
- Bootstrap 5
- Framer Motion
- React Icons
- NextAuth.js
- Stripe Payment Integration

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/varam-silvers.git
cd varam-silvers
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add the following environment variables:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
varam-silvers/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── products/
│   │   ├── [id]/
│   │   └── page.tsx
│   ├── cart/
│   │   └── page.tsx
│   ├── checkout/
│   │   └── page.tsx
│   └── page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── ProductCard.tsx
│   └── CartItem.tsx
├── lib/
│   ├── auth.ts
│   └── stripe.ts
├── public/
│   └── images/
└── styles/
    └── globals.css
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Bootstrap](https://getbootstrap.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Stripe](https://stripe.com/)
