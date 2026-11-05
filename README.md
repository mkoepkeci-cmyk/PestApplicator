# Pest Prep

Mobile-first study app for the California pesticide applicator exam. React + Vite, no backend.
Progress (quiz scores, missed questions, game bests) is saved in the browser's localStorage and can be reset from the Progress tab.

## Run locally

```
npm install
npm run dev
```

## Publish

```
npm run build
```

Pushing to `main` deploys automatically to GitHub Pages: https://mkoepkeci-cmyk.github.io/PestApplicator/ (workflow in `.github/workflows/deploy.yml`).
You can also upload the `dist/` folder to any other static host.
The build uses relative paths, so it works from a subfolder too.

## Where things live

- `src/data/topics.js`: all study content and memory hooks (also powers the flashcards)
- `src/data/questions.js`: the quiz bank (add questions here)
- `src/interactive/`: hands-on activities (Kitchen Lab, Sprayer Builder, Label Explorer, PPE Dress-Up, Family Sort, LD50 Golf, Step Sorter, Pump Picker)
- `src/screens/`: Home, Learn, Flashcards, Quiz, Progress
