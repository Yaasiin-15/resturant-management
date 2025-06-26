# Restaurant Management System

A comprehensive restaurant management system built with React frontend and Supabase backend.

## Project Structure

```
restaurant-management-system/
├── src/
│   ├── components/          # React components
│   │   ├── Auth/           # Authentication components
│   │   ├── Dashboard/      # Dashboard components
│   │   └── Layout/         # Layout components
│   ├── contexts/           # React contexts
│   ├── lib/               # Utility libraries
│   ├── App.jsx            # Main App component
│   └── main.jsx           # Entry point
├── supabase/
│   └── migrations/        # Database migrations
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Features

- **Role-based Authentication** (Admin, Manager, Staff)
- **Menu Management** - CRUD operations for menu items
- **Table Management** - Track table status and availability
- **Order Management** - Handle customer orders and status updates
- **Reservation System** - Manage table reservations
- **User Management** - Admin can manage staff accounts

## Tech Stack

### Frontend
- React 18 with JSX
- Tailwind CSS for styling
- React Router for navigation
- Lucide React for icons
- Vite for build tooling

### Backend
- Supabase (PostgreSQL database with built-in authentication)
- Row Level Security (RLS) for data protection
- Real-time subscriptions

### Database
- PostgreSQL via Supabase
- Comprehensive schema with proper relationships
- Row Level Security policies
- Real-time capabilities

## Getting Started

### Prerequisites
- Node.js 18+
- Supabase account

### Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Setup Supabase**
   - Create a new Supabase project at https://supabase.com
   - Copy your project URL and anon key to `.env` file
   - Run the database migrations (they will be applied automatically)

3. **Start Development Server**
   ```bash
   npm run dev
   ```

   The application will start on `http://localhost:5173`

4. **Build for Production**
   ```bash
   npm run build
   ```

## Demo Credentials

The system comes with pre-configured demo accounts:

- **Admin:** admin@restaurant.com / password123
- **Manager:** manager@restaurant.com / password123
- **Staff:** staff@restaurant.com / password123

## Database Schema

### Core Tables
- **users** - System users with authentication (via Supabase Auth)
- **user_profiles** - Extended user information with roles
- **restaurant_tables** - Physical tables in the restaurant
- **menu_items** - Restaurant menu with categories and pricing
- **orders** - Customer orders with status tracking
- **order_items** - Individual items within orders
- **reservations** - Table reservations with customer details

### Key Features
- Row Level Security (RLS) for data protection
- Real-time subscriptions for live updates
- Foreign key constraints for data integrity
- Automatic timestamp updates
- Proper normalization to reduce redundancy

## API Integration

The application uses Supabase client for all database operations:

### Authentication
- Sign in/Sign up via Supabase Auth
- Role-based access control
- Session management

### Data Operations
- Real-time data fetching
- Optimistic updates
- Automatic caching

## Development

### Project Structure
- **Components:** Organized by feature (Auth, Dashboard, Layout)
- **Contexts:** React contexts for state management
- **Lib:** Utility functions and API client setup

### Adding New Features
1. Create component in appropriate feature folder
2. Add to routing if needed
3. Integrate with Supabase client
4. Add database migrations if schema changes needed

## Security

- Row Level Security (RLS) policies for all tables
- JWT-based authentication via Supabase
- Role-based access control
- Input validation on frontend
- Secure API endpoints via Supabase

## Performance Considerations

- Component-based architecture for better rendering
- Real-time subscriptions for live data
- Optimized bundle size with Vite
- Lazy loading for better performance

## Troubleshooting

### Connection Issues
1. Ensure Supabase project is active
2. Check environment variables in `.env`
3. Verify network connectivity
4. Check browser console for errors

### Authentication Issues
1. Verify Supabase project settings
2. Check if demo users exist in auth.users
3. Ensure RLS policies are properly configured
4. Check browser network tab for API errors

### Database Issues
1. Verify database migrations have run
2. Check RLS policies are enabled
3. Use Supabase dashboard to inspect data
4. Check table permissions

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.