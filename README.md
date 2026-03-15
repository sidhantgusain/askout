# Cute Date Invite (Frontend Only)

A tiny React + TypeScript app that playfully asks for a date:

- The home page shows a message, a big GIF, and **Yes / No** buttons.
- The **No** button runs away on hover, so it is never clicked.
- The **Yes** button leads to a confirmation page with another GIF.
- A Yes click can notify a webhook-style endpoint so you can see when it happened.

## 1. Setup

Make sure you have **Node 18+** and **npm** installed.

Install dependencies:

```bash
npm install
```

## 2. Run the app in development

```bash
npm run dev
```

Then open the URL shown in the terminal (usually `http://localhost:5173`).

## 3. Build for production

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

You can then deploy the `dist` folder to any static host (Netlify, Vercel, GitHub Pages, etc.).

## 4. Configuring messages, GIFs, and webhook

All user-facing messages, GIF URLs, and the Yes-click endpoint are defined in `src/config.ts`.

- **Messages**:
  - `title`: main question on the home page.
  - `subtitle`: playful subline under the main question.
  - `yesButton` / `noButton`: button labels.
  - `yesPageTitle` / `yesPageSubtitle`: texts on the Yes page.
- **GIFs**:
  - `home`: URL of the main invitation GIF.
  - `yes`: URL of the celebratory GIF.
- **Yes-click service**:
  - `yesClickService.endpoint`: URL to which the app will `POST` when the user clicks **Yes**.

### Example webhook ideas

- A personal endpoint you create on a free service (e.g. Pipedream, Make, or Toolkit.app’s webhook-to-email converter).
- A tiny serverless function you host elsewhere that then sends you an email or DM.

The payload sent on Yes click looks like this:

```json
{
  "clickedAt": "2026-03-15T20:34:12.000Z",
  "userAgent": "Mozilla/5.0 ..."
}
```

If `yesClickService.endpoint` is left as an empty string, the app silently skips the network call and still navigates to the Yes page.

## 5. How the experience works (brief)

- **Home page**:
  - Renders the main text and GIF.
  - Shows the Yes button and an evasive No button.
  - On hover, the No button jumps to a random position inside its container, making it effectively unclickable.
  - On Yes click:
    - Optionally sends a POST to your configured `yesClickService.endpoint`.
    - Navigates to `/yes` and passes the timestamp in navigation state.
- **Yes page**:
  - Displays the confirmation text and a celebratory GIF.
  - Has a small collapsible “admin info” section that shows when Yes was clicked (based on the navigation state), mainly for you when testing.

## 6. Suggestions to tune it for your date

- Adjust the wording in `src/config.ts` to match your style and any inside jokes.
- Swap GIF URLs for something that fits both of your personalities (e.g. cute anime, cats, or whatever she likes).
- If you want to be extra smooth, set up a webhook endpoint that sends **you** an email or message when she clicks Yes.

