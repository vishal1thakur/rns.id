# Task for rns.id

This app fetches the Medium gas price every 30 mins from https://snowtrace.io/
and shows it in a table

## Features

-   Get Medium Gas Prices every 30 mins
-   Table to view Medium Gas Prices in a chronological order with createdAt sort
    (Ascending or Descinding)
-   Fetch current price irrespective of the timer (In Dev mode only)

## Tech Stack

-   **Client:** React, Vite, TailwindCSS, Shadcn ui, TanStack Query
-   **Server:** Node, Express, Cron, Puppeteer
-   **Typescript**

## Environment Variables

Environment variables are pushed to the git repo for the purpose of this task
only

## Run Locally

Clone the project: git clone https://github.com/vishal1thakur/rns.id.git

## Client

-   cd client
-   npm install
-   npm run dev

## Server

-   cd server
-   npm install
-   npm run dev

## Client App Structure

-   The frontend app is structured in a modular way which makes it scale easily.
-   The app is structured as follows:

<!-- prettier-ignore-start -->
  src/
  ├── assets/
  ├── components/
  │ └── ui/
  ├── lib/
  ├── pages/
  │ └── medgas/
  |   └── components/
  |   └── enums/
  ├── App.tsx
  ├── index.css
  ├── main.tsx
  └── vite-env.d.ts
<!-- prettier-ignore-end -->

-   App wide ui components are stored in the components folder in src.
-   Pages rendered are stored in src/pages, it has its own components folder
    which breaks the pages into smaller parts. The types used are saved in
    components/enums

## Server Structure

-   The Server follows the MVC pattern and the files of a feature reflects it in
    its folder structure.

<!-- prettier-ignore-start -->
  src/
  ├── database/
  ├── medgas/
  │ └── controller/
  │ └── model/
  | └── routes/
  | └── store/
  | └── utils/
  └── server.ts
<!-- prettier-ignore-end -->

-   The scrape logic and cron job can be found in the utils, the main apis is
    controllers, the schema in model and enums in store.
