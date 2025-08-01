# Chhaon Rooftop Cafe 🏔️

A modern, responsive web application for a rooftop cafe located in the mountains of Shoja, Himachal Pradesh, India. This project showcases a beautiful digital menu with advanced filtering capabilities, shopping cart functionality, and a seamless user experience.

## 🌟 Features

- **Interactive Digital Menu**: Browse through different food categories with beautiful animations
- **Advanced Filtering**: Filter by dietary preferences (Vegetarian, Vegan, Non-Vegetarian, Eggetarian) and other criteria
- **Shopping Cart**: Add items to cart with quantity management and real-time price calculation
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between themes for better user experience
- **Smooth Animations**: Framer Motion powered animations for enhanced UX
- **Modern UI Components**: Built with Radix UI and custom styled components

## 🛠️ Tech Stack

### Frontend Framework

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development

### Styling & UI

- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible UI primitives
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **next-themes** - Theme management

### State Management & Forms

- **React Context API** - Cart state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Additional Libraries

- **class-variance-authority** - Component variant management
- **clsx** - Conditional className utility
- **tailwind-merge** - Tailwind class merging
- **date-fns** - Date manipulation
- **recharts** - Chart components
- **sonner** - Toast notifications

## 📦 Installation

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd chhaon
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Run the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 🚀 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 📁 Project Structure

```
chhaon/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── cart/             # Shopping cart components
│   ├── ui/               # Base UI components (Radix UI)
│   ├── animated-tabs.tsx # Custom animated tabs
│   ├── menu-filter.tsx   # Menu filtering component
│   ├── menu-section.tsx  # Menu display component
│   └── mode-toggle.tsx   # Theme toggle component
├── lib/                  # Utility functions and data
│   ├── cart-context.tsx  # Cart state management
│   ├── filter-utils.ts   # Filtering utilities
│   ├── menu-data.ts      # Menu data structure
│   └── utils.ts          # General utilities
├── hooks/                # Custom React hooks
├── public/               # Static assets
└── styles/               # Additional styles
```

## 🎨 Key Components

### Menu System

- **MenuSection**: Displays menu items with filtering
- **MenuFilter**: Advanced filtering with dietary preferences
- **AnimatedTabs**: Smooth tab transitions between categories

### Shopping Cart

- **CartSidebar**: Sliding cart panel
- **FloatingCartButton**: Mobile-friendly cart access
- **AddToCartButton**: Add items to cart
- **OrderSummary**: Cart totals and checkout

### UI Components

- **ThemeProvider**: Dark/light mode management
- **ModeToggle**: Theme toggle button
- **Various Radix UI components**: Accessible UI primitives

## 🔧 Configuration

### Environment Variables

Currently, no environment variables are required. The application uses static data for the menu.

### Tailwind Configuration

The project uses a custom Tailwind configuration with:

- Custom color schemes
- Font families (Playfair Display, Lato)
- Animation utilities
- Responsive breakpoints

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
4. **Run tests and linting**

   ```bash
   pnpm lint
   ```

5. **Commit your changes**

   ```bash
   git commit -m "feat: add your feature description"
   ```

6. **Push to your branch**

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**

### Code Style Guidelines

- Use TypeScript for all new code
- Follow the existing component structure
- Use Tailwind CSS for styling
- Ensure responsive design
- Add proper TypeScript types
- Use meaningful commit messages

---

Built with ❤️, for Amrit.
