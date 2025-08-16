# 🚀 FastURL - Modern URL Shortener

A modern, fast, and secure URL shortening service built with React, Vite, and Supabase. Create short, memorable links with advanced features like click tracking, expiration dates, and plan-based limitations.

![FastURL](https://img.shields.io/badge/FastURL-URL%20Shortener-blue)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB)
![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.12-38B2AC)

## ✨ Features

### 🔗 **URL Shortening**
- **4-character short codes** for clean, memorable URLs
- **Custom aliases** for branded links
- **Instant generation** using nanoid
- **Clean URL format**: `yoursite.com/s/abcd`

### 📊 **Analytics & Tracking**
- **Real-time click tracking** for each link
- **Comprehensive dashboard** with statistics
- **Link performance insights**
- **Export and share analytics**

### ⏰ **Expiration Management**
- **Plan-based expiration**:
  - **Free Plan**: 1 Hour, 1 Day, 1 Week options
  - **Premium Plan**: Custom dates up to 1 year + Permanent links
- **Automatic expiration** handling
- **Visual indicators** for expired links

### 👤 **User Management**
- **User authentication** with Supabase Auth
- **Profile management** with Gravatar integration
- **Plan-based features** and limitations
- **Secure logout** functionality

### �� **Modern UI/UX**
- **Clean, minimal design** with Tailwind CSS
- **Responsive layout** for all devices
- **Dark/light theme** support
- **Smooth animations** and transitions
- **Professional dashboard** interface

## 🛠️ Tech Stack

### **Frontend**
- **React 19.1.1** - Modern React with latest features
- **Vite 7.1.2** - Fast build tool and dev server
- **React Router 7.8.1** - Client-side routing
- **Tailwind CSS 4.1.12** - Utility-first CSS framework
- **Nanoid 5.1.5** - Secure short ID generation

### **Backend & Database**
- **Supabase** - Backend-as-a-Service
  - **PostgreSQL Database** - Reliable data storage
  - **Row Level Security** - Secure data access
  - **Real-time subscriptions** - Live updates
  - **Authentication** - User management

### **Development Tools**
- **ESLint** - Code linting and formatting
- **TypeScript** - Type safety (optional)
- **Vercel** - Deployment platform

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

## �� Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/madvith-d/fst-url.git
cd fst-url
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. **Create a Supabase project** at [supabase.com](https://supabase.com)
2. **Set up your database tables** (see Database Schema below)
3. **Get your project credentials**

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## ��️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  plan TEXT DEFAULT 'Free',
  plan_expiry TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### URLs Table
```sql
CREATE TABLE urls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  short_code TEXT UNIQUE NOT NULL,
  original_url TEXT NOT NULL,
  expires_at TIMESTAMP,
  click_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Row Level Security Policies
```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE urls ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- URLs policies
CREATE POLICY "Users can view own URLs" ON urls
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own URLs" ON urls
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own URLs" ON urls
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own URLs" ON urls
  FOR DELETE USING (auth.uid() = user_id);

-- Public access for redirects
CREATE POLICY "Public can view URLs for redirects" ON urls
  FOR SELECT USING (true);
```

## ��️ Project Structure
fasturl/
├── public/ # Static assets
├── src/
│ ├── assets/ # Images and static files
│ ├── pages/ # Page components
│ │ ├── home.jsx # Main dashboard
│ │ ├── landing.jsx # Landing page
│ │ ├── login.jsx # Login page
│ │ ├── signup.jsx # Signup page
│ │ └── redirect.jsx # URL redirect handler
│ ├── Supabase/ # Supabase configuration
│ │ └── supabaseClient.js
│ ├── App.jsx # Main app component
│ ├── main.jsx # App entry point
│ └── index.css # Global styles
├── package.json # Dependencies and scripts
├── vite.config.js # Vite configuration
├── tailwind.config.js # Tailwind CSS configuration


## �� Deployment

### Deploy to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Configure environment variables** in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### Deploy to Other Platforms

The app can be deployed to any static hosting platform:
- **Netlify**
- **GitHub Pages**
- **Firebase Hosting**
- **AWS S3 + CloudFront**

## 🎯 Usage

### Creating Short Links

1. **Sign up** or **log in** to your account
2. **Enter the long URL** you want to shorten
3. **Choose expiration** based on your plan
4. **Add custom alias** (optional)
5. **Click "Create Link"**

### Managing Links

- **View all your links** in the dashboard
- **Track click counts** in real-time
- **Copy short URLs** with one click
- **Delete expired links** easily
- **Monitor link performance**

### Plans & Limitations

#### Free Plan
- ✅ Create unlimited links
- ✅ 1 Hour, 1 Day, 1 Week expiration options
- ✅ Basic analytics
- ✅ Custom aliases

#### Premium Plan
- ✅ All Free features
- ✅ Custom expiration dates (up to 1 year)
- ✅ Permanent links (no expiration)
- ✅ Advanced analytics
- ✅ Priority support

## �� Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key | Yes |

### Customization

#### Styling
- Modify `tailwind.config.js` for theme customization
- Update `src/index.css` for global styles
- Customize components in `src/pages/`

#### Features
- Adjust expiration options in `src/pages/home.jsx`
- Modify short code length in the `generateShortCode` function
- Update URL format in routing configuration

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## �� Acknowledgments

- **Supabase** for the amazing backend-as-a-service
- **Vite** for the fast build tool
- **Tailwind CSS** for the utility-first CSS framework
- **React** for the amazing frontend library

## 📞 Support

If you have any questions or need help:



---

**Made with ❤️ by [Madvith]**

