# 🚗 Car Management System

A modern Vue.js application for managing vehicles with user authentication and CRUD operations.

## 📁 Project Structure

```
car-management-system/
├── README.md
├── eslint.config.js          # ESLint configuration
├── index.html               # Entry HTML file
├── jsconfig.json            # JavaScript configuration
├── package-lock.json        # NPM lock file
├── package.json            # Project dependencies and scripts
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.js          # Vite configuration
│
├── public/                 # Public assets
│   └── favicon.ico        # Site favicon
│
└── src/                   # Source code
    ├── App.vue            # Root Vue component
    ├── main.js            # Application entry point
    ├── store.js           # Vuex store configuration
    │
    ├── assets/           # Static assets
    │   ├── base.css      # Base styles
    │   ├── main.css      # Main stylesheet
    │   └── logo.svg      # Logo asset
    │
    ├── components/       # Reusable components
    │   ├── HelloWorld.vue
    │   ├── TheWelcome.vue
    │   ├── WelcomeItem.vue
    │   └── icons/        # Icon components
    │       ├── IconCommunity.vue
    │       ├── IconDocumentation.vue
    │       ├── IconEcosystem.vue
    │       ├── IconSupport.vue
    │       └── IconTooling.vue
    │
    ├── router/          # Vue Router configuration
    │   └── index.js     # Route definitions
    │
    └── views/           # Page components
        ├── HomeView.vue        # Home page
        ├── AboutView.vue       # About page
        ├── LoginView.vue       # Login page
        ├── RegisterView.vue    # Registration page
        ├── CreateCarView.vue   # Car creation page
        └── EditCarView.vue     # Car editing page
```

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   Access the application at `http://localhost:5173`

3. **Build for Production**
   ```bash
   npm run build
   ```

## 🛠️ Technology Stack

- **Framework:** Vue.js 3
- **Build Tool:** Vite
- **CSS Framework:** Tailwind CSS
- **State Management:** Vuex
- **Routing:** Vue Router
- **Linting:** ESLint

## 📋 Available Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs --fix --ignore-path .gitignore"
  }
}
```

## 🔐 Application Routes

| Route | View Component | Description |
|-------|---------------|-------------|
| `/` | `HomeView.vue` | Landing page |
| `/about` | `AboutView.vue` | About page |
| `/login` | `LoginView.vue` | User login |
| `/register` | `RegisterView.vue` | User registration |
| `/car` | `CreateCarView.vue` | Create new car |
| `/car/:id` | `EditCarView.vue` | Edit existing car |

## 💅 Styling

The project uses a combination of:
- Tailwind CSS for utility-first styling
- Base CSS (`assets/base.css`)
- Main CSS (`assets/main.css`)

Configure Tailwind using `tailwind.config.js`

## 🔧 Configuration Files

- **vite.config.js**: Vite bundler configuration
- **eslint.config.js**: ESLint rules and settings
- **postcss.config.js**: PostCSS plugins (including Tailwind)
- **jsconfig.json**: JavaScript compilation settings

## 📦 Components Structure

### Icons
Located in `src/components/icons/`:
- `IconCommunity.vue`
- `IconDocumentation.vue`
- `IconEcosystem.vue`
- `IconSupport.vue`
- `IconTooling.vue`

### Core Components
Located in `src/components/`:
- `HelloWorld.vue`
- `TheWelcome.vue`
- `WelcomeItem.vue`

## 🔄 State Management

The application uses Vuex for state management, configured in `src/store.js`

## 📱 Views

All page components are located in `src/views/`:
- `HomeView.vue`: Main landing page
- `AboutView.vue`: Information page
- `LoginView.vue`: User authentication
- `RegisterView.vue`: New user registration
- `CreateCarView.vue`: Car creation form
- `EditCarView.vue`: Car editing interface

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📜 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Kuldeep Raj Gour
Email: kuldeepgour002@gmail.com

