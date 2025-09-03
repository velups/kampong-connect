# Kampong Connect

A community platform connecting elderly individuals with volunteers in Singapore, fostering meaningful connections and mutual support.

## Features

- **User Authentication**: Separate registration flows for Elders and Volunteers
- **Bilingual Support**: English and Mandarin language options
- **Accessibility Features**: High contrast mode, large text, and keyboard navigation
- **Assistance Requests**: Elders can post requests for help with daily tasks
- **Volunteer Matching**: Browse and accept assistance requests
- **Messaging System**: Secure in-app communication
- **Rating & Reviews**: Mutual feedback system
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Testing**: Jest + React Testing Library, Cypress

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd kampong-connect
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Run ESLint

## User Roles

### Elder
- Post assistance requests (shopping, errands, companionship)
- Browse volunteer offers
- Communicate with matched volunteers
- Rate and review volunteers

### Volunteer  
- Browse assistance requests
- Offer help to elders
- Communicate with elders
- Rate and review elders

## Assistance Categories

1. **General Assistance** - Doctor appointments, errands, general help
2. **Household Chores** - Cleaning, cooking, home maintenance
3. **Shopping** - Grocery shopping, pharmacy runs
4. **Wellbeing** - Coffee chats, walks, companionship, games

## Accessibility Features

- High contrast mode for better visibility
- Large text option for improved readability  
- Keyboard navigation support
- Screen reader friendly
- Skip to main content links
- Proper ARIA labels

## Language Support

The application supports:
- English
- Mandarin Chinese (中文)

Language preference is saved locally and persists across sessions.

## Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
# Start the dev server first
npm run dev

# In another terminal
npm run test:e2e
```

## Project Structure

```
src/
├── components/         # Reusable UI components
├── contexts/          # React context providers
├── pages/             # Main application pages
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── assets/            # Static assets
```

## Contributing

1. Follow the existing code style
2. Write tests for new features
3. Update documentation as needed
4. Ensure accessibility standards are met

## License

This project is licensed under the MIT License.

## Support

For questions or support, please contact the development team.