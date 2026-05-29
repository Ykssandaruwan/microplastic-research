# Microplastics Lab Website

This is a static, multi-page website prepared with HTML, CSS, JavaScript and JSON.

## Pages

- `index.html` - homepage
- `detection.html` - detection technologies and analytical workflow
- `health.html` - exposure routes and possible health relevance
- `transformation.html` - weathering, migration and transformation pathways
- `publications.html` - publication library and references
- `author.html` - author profile and contact information

## How to edit author details

Open `data/site.json` and edit the `author` section:

- `name`
- `role`
- `affiliation`
- `email`
- `location`
- `bio`
- `researchInterests`

## How to add your publications

Open `data/site.json` and add items under `userPublications`.

Example:

```json
{
  "title": "Your publication title",
  "authors": "Author 1, Author 2",
  "venue": "Journal name",
  "year": "2026",
  "url": "https://example.com",
  "summary": "One or two sentences about the publication."
}
```

## How to view locally

You can open `index.html` directly in a browser. For the JSON-driven sections to update reliably, serve the folder through a local server.

If Python is installed, open a terminal inside this folder and run:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Color palette

The site uses the uploaded palette:

- Blush: `#ecd8e0`
- Peach: `#ffd5b6`
- Aqua: `#bad8e0`
- White: `#ffffff`
- Stone: `#ccc8c8`
