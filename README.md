# Shopping Cart Manager

A Single Page Application (SPA) for managing user shopping carts based on the DummyJSON API.

## 🚀 Quick Start

### Prerequisites

- Node.js 20.17+ (recommended: 20.19+ or 22.12+)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 18 + Vite |
| Language | TypeScript |
| Data Fetching | @tanstack/react-query v5 |
| Styling | @emotion/styled |
| State Management | Zustand |
| Routing | react-router-dom v6 |

## 📐 Architecture

### Project Structure

```
src/
├── api/           # API functions (fetchCarts, fetchCart, updateCart)
├── components/    # Reusable UI components
│   ├── CartList/     # Cart list page components
│   ├── CartDetails/  # Cart details page components
│   └── ui/           # Generic UI components (Loading, Error)
├── hooks/         # Custom React Query hooks
├── pages/         # Page wrappers with layout
├── store/         # Zustand global state
├── types/         # TypeScript type definitions
├── App.tsx        # Main app with routing
└── main.tsx       # Entry point
```

### State Management

- **Zustand**: Global pagination state (currentPage, limit, skip)
- **React Query**: Server state caching, mutations, and data synchronization

### Routing

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | CartListPage | List of all carts with pagination |
| `/carts/:id` | CartDetailsPage | Single cart details with edit capability |

## ✨ Features

### Cart List Page
- Display cart summary (ID, user ID, products count, total price)
- Pagination with configurable page size (default: 10 items)
- Loading and error states
- State persistence when navigating back from details

### Cart Details Page
- Full cart information with product list
- Edit product quantity
- Remove products from cart
- Real-time data updates after mutations
- Responsive design

## 🎨 UI States

- **Loading**: Spinner animation during data fetching
- **Error**: Error message with retry button
- **Hover**: Interactive feedback on buttons and cards
- **Disabled**: During mutations (update/remove)

## 🔌 API

Uses [DummyJSON Carts API](https://dummyjson.com/docs/carts):

- `GET /carts?limit=:limit&skip=:skip` - Fetch carts list
- `GET /carts/:id` - Fetch single cart
- `PUT /carts/:id` - Update cart (merge mode)

## 📦 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🌐 Deployment

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts to deploy

### Netlify

1. Build: `npm run build`
2. Deploy `dist` folder to Netlify

### GitHub Pages

1. Install: `npm i -D gh-pages`
2. Add to `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/shop",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run: `npm run deploy`

## 📝 Notes

- Pagination state is preserved in Zustand store
- React Query handles caching and background refetching
- All API requests use native fetch (no additional HTTP library)
- Responsive design works on mobile and desktop
