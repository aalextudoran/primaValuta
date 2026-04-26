# Prima Valuta - Currency Rate Management

Next.js App Router app for a local exchange office website, with:
- public live currency widget (EUR, USD, GBP, CHF)
- admin panel for publishing rates
- file-based storage in `data/rates.json`
- optional Vercel KV storage swap via same data interface

## Run locally

1. Install dependencies:
   - `npm install`
2. Create env file:
   - copy `.env.example` to `.env.local`
3. Start dev server:
   - `npm run dev`
4. Open:
   - public site: [http://localhost:3000](http://localhost:3000)
   - admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

## Update rates (admin flow)

1. Go to `/admin`
2. Login with `ADMIN_PASSWORD`
3. Edit `Cumpărăm` / `Vindem` for EUR, USD, GBP, CHF
4. Use BNR values shown in gray as reference hints
5. Click `Publică cursul`
6. New values are published via `POST /api/rates` and saved in `data/rates.json`

## API routes

- `GET /api/rates` - returns the current rates payload
- `POST /api/rates` - protected by `x-admin-token` middleware, saves new rates
- `GET /api/bnr` - fetches and parses BNR XML rates for EUR/USD/GBP/CHF

## Vercel KV swap (when filesystem is read-only)

By default, rates are read/written from `data/rates.json`.  
If you deploy on Vercel, set:
- `USE_VERCEL_KV=true`
- `KV_REST_API_URL=<your_kv_rest_url>`
- `KV_REST_API_TOKEN=<your_kv_rest_token>`

The storage interface remains the same (`getRates()` / `saveRates()` in `lib/rates-store.ts`), so the rest of the app code does not change.
