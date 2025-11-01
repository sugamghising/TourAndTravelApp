# 🏔️ Himalayan Tours & Travels

A modern, full-featured tour booking web application with a beautiful green and white theme. Built with React, TypeScript, Express, and MongoDB. Includes advanced search, filtering, flexible date selection, and a comprehensive admin dashboard.

![Theme Colors](https://via.placeholder.com/800x100/2d5016/ffffff?text=Himalayan+Tours+%26+Travels)

## ✨ Key Features

### For Travelers

- 🏠 **Beautiful Landing Page** - Hero section with stunning mountain imagery
- 🗺️ **Advanced Tour Browsing** - View all available Himalayan tours with filters
- � **Smart Search** - Search tours by title with instant results
- 🎛️ **Price & Duration Filters** - Filter by budget and trip length
- 📅 **Flexible Date Selection** - Book any future date (not limited to predefined dates)
- 👤 **Secure Authentication** - JWT-based login and registration
- 📋 **Booking Management** - View and cancel your bookings
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile
- 🎨 **Nature-Inspired Design** - Clean green & white minimalistic theme

### For Admins

- 🛡️ **Admin Dashboard** - Complete tour management system
- ➕ **Create Tours** - Add new tours with all details
- ✏️ **Edit Tours** - Update existing tour information
- 🗑️ **Delete Tours** - Remove tours with confirmation
- 📊 **Booking Overview** - View all customer bookings
- 🔐 **Role-Based Access** - Secure admin-only features
- 💼 **Professional UI** - Tables, modals, and status badges

## 🚀 Quick Start

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation & Running

1. **Clone the repository**

```powershell
git clone https://github.com/sugamghising/TourAndTravelApp.git
cd TourAndTravel
```

2. **Setup Backend**

```powershell
cd server
npm install

# Create .env file with:
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
# PORT=5000

npm run dev
```

3. **Setup Frontend** (in new terminal)

```powershell
cd client
npm install
npm start
```

4. **Create Admin User** (in new terminal)

```powershell
cd server
npm run create-admin
```

**Default Admin Credentials:**

- Email: `admin@himalayan.com`
- Password: `admin123`

5. **Access the Application**

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Admin Dashboard: Login and click "Admin" in navbar

## 📁 Project Structure

```
TourAndTravel/
├── client/                        # React TypeScript frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx        # Navigation with auth
│   │   │   ├── Home.tsx          # Landing page
│   │   │   ├── Tours.tsx         # Tours with search/filter
│   │   │   ├── Auth.tsx          # Login/Register
│   │   │   ├── Bookings.tsx      # User bookings
│   │   │   ├── AdminDashboard.tsx # Admin panel ⭐
│   │   │   └── Footer.tsx        # Footer
│   │   ├── context/
│   │   │   └── AuthContext.tsx   # Global auth state
│   │   ├── services/
│   │   │   └── api.ts            # API integration
│   │   ├── types/
│   │   │   └── index.ts          # TypeScript interfaces
│   │   └── App.tsx               # Main app
│   └── package.json
│
├── server/                        # Express backend
│   ├── src/
│   │   ├── controllers/          # Request handlers
│   │   ├── models/               # MongoDB schemas
│   │   ├── routes/               # API routes
│   │   ├── middleware/           # Auth & validation
│   │   ├── scripts/
│   │   │   └── createAdmin.ts    # Admin user script ⭐
│   │   └── index.ts              # Server entry
│   └── package.json
│
├── .gitignore                    # Git ignore rules
└── README.md                     # This file
```

⭐ = New features added

## 🎨 Screenshots & Features

### 🏠 Home Page

Beautiful hero section showcasing Himalayan mountains with featured services (adventure tours, expert guides, safe travel, best prices).

### 🗺️ Tours Page with Search & Filters

- **Search Bar**: Find tours by title
- **Price Filter**: Low (<$500) / Medium ($500-$1500) / High (>$1500)
- **Duration Filter**: Short (<5 days) / Medium (5-10 days) / Long (>10 days)
- **Results Count**: Shows number of filtered tours
- **Flexible Date Picker**: Select any future date for booking

### 📋 My Bookings Page

Manage your bookings with:

- Tour details and dates
- Status tracking (Pending/Confirmed/Cancelled)
- Payment status
- Cancel booking option

### 🛡️ Admin Dashboard (Admin Only)

**Tours Management Tab:**

- View all tours in table format
- Create new tours with detailed forms
- Edit existing tours
- Delete tours with confirmation
- Form fields: Title, Description, Location, Price, Duration, Max Group Size, Images, Available Dates

**All Bookings Tab:**

- View all customer bookings
- User and tour information
- Status badges (color-coded)
- Payment status tracking
- Booking timestamps

## 🛠️ Technology Stack

### Frontend

- React 19
- TypeScript
- Axios
- Context API
- CSS3

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

## 🎨 Theme Colors

| Color           | Hex       | Usage                              |
| --------------- | --------- | ---------------------------------- |
| Primary Green   | `#2d5016` | Headers, buttons, primary elements |
| Secondary Green | `#3a6b1f` | Hover effects, accents             |
| White           | `#ffffff` | Text, cards, backgrounds           |
| Light Gray      | `#f8f9fa` | Page background                    |

## 🧪 Testing Guide

### User Features Testing

1. **Create Account & Login**

   - Navigate to http://localhost:3000
   - Register a new account
   - Login with credentials

2. **Search & Filter Tours**

   - Go to Tours page
   - Try text search (e.g., "Everest")
   - Use price filter (Low/Medium/High)
   - Use duration filter (Short/Medium/Long)
   - Verify results count updates

3. **Book a Tour with Flexible Date**

   - Select any tour
   - Click "Book Now"
   - Choose any future date from date picker
   - Verify you cannot select past dates
   - Complete booking

4. **Manage Bookings**
   - Go to "My Bookings"
   - View booking details
   - Cancel a booking if needed

### Admin Features Testing

1. **Login as Admin**

   - Use credentials: `admin@himalayan.com` / `admin123`
   - Click "Admin" button in navbar

2. **Create Tour**

   - Click "+ Create New Tour"
   - Fill form with sample data
   - Submit and verify success message

3. **Edit Tour**

   - Click "Edit" on any tour
   - Modify details
   - Submit and verify update

4. **Delete Tour**

   - Click "Delete" on any tour
   - Confirm deletion
   - Verify tour is removed

5. **View All Bookings**
   - Switch to "All Bookings" tab
   - Verify booking data displays correctly

## 🔐 Environment Variables

### Backend (.env in server folder)

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

## 📝 API Endpoints

### Authentication

| Method | Endpoint             | Description       | Auth Required |
| ------ | -------------------- | ----------------- | ------------- |
| POST   | `/api/auth/register` | Register new user | No            |
| POST   | `/api/auth/login`    | Login user        | No            |

### Tours

| Method | Endpoint         | Description    | Auth Required | Admin Only |
| ------ | ---------------- | -------------- | ------------- | ---------- |
| GET    | `/api/tours`     | Get all tours  | No            | No         |
| GET    | `/api/tours/:id` | Get tour by ID | No            | No         |
| POST   | `/api/tours`     | Create tour    | Yes           | Yes ⭐     |
| PUT    | `/api/tours/:id` | Update tour    | Yes           | Yes ⭐     |
| DELETE | `/api/tours/:id` | Delete tour    | Yes           | Yes ⭐     |

### Bookings

| Method | Endpoint                  | Description       | Auth Required | Admin Only |
| ------ | ------------------------- | ----------------- | ------------- | ---------- |
| POST   | `/api/bookings`           | Create booking    | Yes           | No         |
| GET    | `/api/bookings`           | Get user bookings | Yes           | No         |
| PUT    | `/api/bookings/:id`       | Cancel booking    | Yes           | No         |
| GET    | `/api/bookings/admin/all` | Get all bookings  | Yes           | Yes ⭐     |

⭐ = Admin-only endpoints (requires `role: "admin"` in JWT)

## 🎯 User Flow

### Regular User Journey

1. **Register/Login** → Create account or sign in
2. **Search & Filter** → Find perfect tour using search and filters
3. **Browse Tours** → View available Himalayan tours with details
4. **Book Tour** → Select any future date and confirm booking
5. **Manage Bookings** → View bookings, track status, cancel if needed

### Admin Journey

1. **Login as Admin** → Use admin credentials
2. **Access Dashboard** → Click "Admin" in navigation
3. **Manage Tours** → Create, edit, or delete tours
4. **Monitor Bookings** → View all customer bookings and statuses

## 🔮 Future Enhancements

### Completed ✅

- [x] Admin dashboard for tour management
- [x] Search and filter tours
- [x] Flexible date selection

### Planned 📋

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications for bookings
- [ ] Reviews and ratings system
- [ ] Image upload functionality
- [ ] Multi-language support
- [ ] Revenue analytics dashboard
- [ ] Export bookings to CSV
- [ ] Calendar view for tour dates
- [ ] Tour popularity metrics
- [ ] Bulk tour operations

## 🐛 Troubleshooting

**Can't see tours?**

- Add sample tours using the admin dashboard or MongoDB directly

**Login not working?**

- Check MongoDB connection
- Verify user exists in database

**CORS errors?**

- Ensure backend CORS allows localhost:3000

**Token expired?**

- Logout and login again

## 📄 License

This is a demonstration project for tour booking functionality.

## 👥 Contributing

This project is in the developing phase. Feel free to fork and customize for your needs.

---

## ✅ Project Status

**Status**: 🚧 Developing

### Core Features

- [x] Frontend design and implementation
- [x] Backend API integration
- [x] JWT authentication system
- [x] Tour booking system
- [x] Booking management
- [x] Responsive design (mobile, tablet, desktop)
- [x] Comprehensive documentation

### Advanced Features ⭐

- [x] Search functionality
- [x] Price and duration filters
- [x] Flexible date selection (any future date)
- [x] Admin dashboard
- [x] Tour CRUD operations
- [x] Admin booking overview
- [x] Role-based access control
- [x] Professional UI with modals and tables

### Code Quality

- [x] TypeScript for type safety
- [x] Clean, maintainable code structure
- [x] Error handling and validation
- [x] Security best practices (JWT, bcrypt)
- [x] RESTful API design
- [x] Component-based architecture

---

## 🚀 Live Demo

**Local Development:**

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

**Test Accounts:**

- **Admin**: admin@himalayan.com / admin123
- **User**: Register your own account

---

## 📜 License

This project is open source and available for educational and commercial use.

---

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by beautiful Himalayan landscapes
- Designed for seamless user experience

---

**Built with ❤️ for adventure seekers worldwide! 🏔️⛰️**

**Start your Himalayan adventure today at http://localhost:3000** 🚀
