# Girish M - Portfolio Website

This repository contains the source code for my personal portfolio website, overhauled with a modern tech stack.

## Tech Stack

- **Framework:** React 19 (TypeScript)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Content:** Markdown (processed via `react-markdown`)
- **Math Rendering:** MathJax 3
- **Deployment:** GitHub Pages (automated via GitHub Actions)

## Key Features

- **Responsive Design:** Optimized for both mobile and desktop reading.
- **Markdown-Based Blog:** Content is managed via Markdown files in `src/posts/`.
- **LaTeX Support:** Full support for mathematical equations and symbols in blog entries.
- **Antilibrary:** A searchable/categorized collection of books I own or recommend.
- **Handwritten Notes:** Integrated gallery with lightbox navigation for study notes.
- **SPA Routing:** Seamless navigation using `HashRouter` for reliable deployment.

## Project Structure

- `src/pages/`: Main application pages (Home, Blog, Projects, etc.)
- `src/posts/`: Markdown files for all blog entries.
- `src/data/`: Data definitions for posts and library items.
- `public/assets/img/`: Optimized images and assets for production.
- `.github/workflows/`: Automated deployment configuration.

## Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/girish17/girish17.github.io.git
   cd girish17.github.io
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:3000`.

## Deployment

The website is automatically built and deployed to the `gh-pages` branch whenever changes are pushed to the `master` branch.

- **URL:** [https://girishm.info](https://girishm.info)

## License

This website is free software: you can redistribute it and/or modify it under the terms of the Creative Commons Attribution 4.0 International License.
