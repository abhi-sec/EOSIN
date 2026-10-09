# EOSIN

EOSIN is a responsive frontend concept for an AI-powered farming intelligence platform. It helps farmers understand current weather conditions, spot disruption from seasonal patterns, and act on location-aware crop recommendations.

## Run locally

```bash
npm install
npm run dev
```

Open the local Vite URL in your browser. To create a production build:

```bash
npm run build
```

## Included in this preview

- Responsive EOSIN farm dashboard with weather, pattern disruption, crop context, and 7-day outlook.
- Mock location data for Pune, Nashik, and Indore.
- Interactive location switching, 7/14-day tabs, checklist actions, and recommendation detail modal.
- Accessible form labels, semantic sections, keyboard-friendly buttons, and mobile layout.

The current weather and farm values are simulated in `src/main.jsx`. A production version can replace the `locations` and `forecast` objects with weather, satellite, soil, and farm-management APIs.
