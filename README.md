# 🚗 Car Management System

A modern, responsive web application for managing vehicle inventory with user authentication, CRUD operations, and search functionality.

## 🌟 Features

- **🔐 Authentication**
  - User registration and login
  - Secure session management
  - Protected routes

- **🚘 Car Management**
  - Create new car listings
  - View car details
  - Edit existing cars
  - Delete car listings
  - Image upload with preview

- **🔍 Advanced Features**
  - Search functionality
  - Filtering options
  - Responsive design
  - Form validation

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **State Management:** React Context
- **Routing:** React Router v6
- **Form Handling:** React Hook Form
- **HTTP Client:** Axios
- **Icons:** Lucide React

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16.0 or higher)
- npm or yarn
- Git

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/car-management-frontend.git
   cd car-management-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration:
   ```
   REACT_APP_API_URL=your_api_url
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── auth/            # Authentication related components
│   ├── cars/            # Car management components
│   └── shared/          # Shared/common components
├── contexts/            # React contexts
├── hooks/               # Custom hooks
├── pages/               # Page components
├── services/           # API services
├── styles/             # Global styles
└── utils/              # Utility functions
```

## 🔐 Authentication

The application uses JWT-based authentication. Protected routes require valid authentication tokens.

### Available Routes

| Route | Access | Description |
|-------|---------|------------|
| `/` | Public | Home page |
| `/login` | Public | User login |
| `/register` | Public | New user registration |
| `/cars` | Protected | Car listing page |
| `/cars/new` | Protected | Create new car |
| `/cars/:id` | Protected | Edit car details |

## 🚗 Car Management

### Car Object Structure

```typescript
interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  description: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🔍 Search and Filter

Users can search cars by:
- Make
- Model
- Year
- Price range

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1024px and above)
- Tablet (768px to 1023px)
- Mobile (below 768px)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👨‍💻 Author

Your Name  
Email: your.email@example.com  
GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- shadcn/ui for the beautiful UI components
- The React team for the amazing framework
- All contributors who helped with the project

## 📞 Support

For support, email support@example.com or create an issue in the GitHub repository.