# RentalCar

A web application for browsing and renting cars. Users can explore available vehicles, filter the catalog, view detailed car information, and submit rental requests.

## Demo

[View Live Demo](https://rental-car-umber.vercel.app/)

## Features

- **Home Page** – Hero section with a call-to-action button that navigates to the car catalog.
- **Car Catalog** – Displays cars fetched from the backend API.
- **Filtering** – Filter cars by brand, rental price, and mileage range.
- **Load More** – Load additional cars while preserving the selected filters.
- **Car Details** – View detailed information, specifications, rental conditions, and photos of each vehicle.
- **Booking Form** – Submit a rental request through the backend API.


## Technologies

- Next.js
- React
- TypeScript
- Next.js App Router
- TanStack Query
- Axios
- CSS Modules
- React Hook Form
- Yup
- React Hot Toast

## Pages

| Route | Description |
|---|---|
| `/` | Home page with a hero section |
| `/catalog` | Car catalog with filtering and Load More functionality |
| `/catalog/[carId]` | Individual car details and booking form |

## Backend API

The application uses the RentalCar backend API to retrieve car data, apply filters, and submit booking requests.

[API Documentation](https://car-rental-api.goit.study/api-docs/)

## Installation

1. Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

2. Navigate to the project directory:

```bash
cd rental-car
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates a production build |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint |

## Project Structure

```text
rental-car/
├── app/                  # Application pages and routing
├── components/           # Reusable UI components
├── lib/
│   └── api/              # API requests and data handling
├── public/               # Static assets
├── types/                # TypeScript types
├── package.json
└── README.md
```

## Deployment

The application is deployed on Vercel.

[Live Application](https://rental-car-umber.vercel.app/)

## Author

**DARIA DANYLKOVA**

Full-Stack Developer
