# Loca.chat

A modern chat application built with React, TypeScript, and Vite, powered by Basic for backend services.

## Features

- 🚀 Real-time chat functionality
- 💾 Persistent message storage
- 🎨 Dark/Light mode support
- ⌨️ Keyboard shortcuts
- 📝 Markdown support in messages
- 🔐 User authentication
- 📱 Responsive design

## Tech Stack

- **Frontend Framework**: React 18.3
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Backend/Auth**: Basic Tech
- **Markdown**: React Markdown
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Basic Tech account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/loca-chat.git
cd loca-chat
```

2. Install dependencies:
```bash
npm install
```

3. Create a Basic Tech project and update the configuration in `basic.config.ts` with your project details.

4. Start the development server:
```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
loca-chat/
├── src/
│   ├── components/     # React components
│   ├── hooks/         # Custom React hooks
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── public/            # Static assets
└── basic.config.ts    # Basic Tech configuration
```

## Keyboard Shortcuts

- **Alt/Option + N**: Create new chat
- **Alt/Option + S**: Toggle sidebar
- **Enter**: Send message

## Environment Setup

The project uses several configuration files:
- `tsconfig.app.json` - TypeScript configuration for the app
- `tsconfig.node.json` - TypeScript configuration for Node.js
- `vite.config.ts` - Vite configuration
- `eslint.config.js` - ESLint configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Acknowledgments

- [Basic Tech](https://basic.tech) for database and authentication
- [Vite](https://vitejs.dev) for the build tooling
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Lucide React](https://lucide.dev) for icons