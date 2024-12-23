# wut2pack

A smart packing list generator that helps you pack exactly what you need for your next trip.

## Motivation

I built wut2pack because I was tired of:
1. Creating new packing lists from scratch for every trip
2. Always forgetting something important
3. Overpacking "just in case"
4. Having multiple packing lists scattered across different notes apps

Plus, I wanted to experiment with AI-assisted development using tools like Cursor and Windsurf. This entire project was built using these AI coding assistants, which helped me move faster and focus on the user experience rather than boilerplate code. It was done in a weekend.

## Features

- Generate personalized packing lists based on:
  - Trip duration
  - Weather at destination
  - Activities planned
  - Accommodation type
  - Special needs (medical, tech, etc.)
- Save and manage multiple packing lists
- Share lists with travel companions
- Dark/light mode support
- Mobile-friendly interface

## Getting Started

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`
4. Open the app in your browser at `http://localhost:3000`


## How to Use

1. **Create a New List**
   - Enter your trip details (origin, destination, dates)
   - Answer a few questions about your trip
   - Get a personalized packing list

2. **Customize Your List**
   - Add/remove items
   - Adjust quantities
   - Mark items as packed
   - Save for future reference

3. **Share with Others**
   - Generate a share link
   - Collaborators can view and edit the list
   - Changes sync in real-time

## Tech Stack

- Next.js
- Supabase
- TailwindCSS
- TypeScript
- next-themes