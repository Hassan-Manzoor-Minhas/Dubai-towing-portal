# Dubai Towing Management Portal — Merged MVP

Yeh dono files (Claude-wala version + ChatGPT-wala `dubai-towing-portal-complete-frontend-fixed`) ko merge karke banaya gaya ek single working frontend hai, jis mein login/auth system aur form validation add ki gayi hai.

## Stack
React + TypeScript + Vite + Tailwind CSS + React Router + Lucide + Recharts

## Run karne ka tareeqa
1. Terminal is folder mein open karein
2. `npm install`
3. `npm run dev`
4. Vite jo local URL de (default `http://localhost:5173`) usay browser mein open karein

## Login credentials (MVP demo)

**Business Admin**
- Email: `admin@dubaitowing.ae`
- Password: `Admin@123`

**Drivers** (pehle se maujood 5 seed drivers, sab ka ek hi demo password hai)
- Password: `Driver@123`
- Emails: `ahmed.ali@dubaitowing.ae`, `mohammed.k@dubaitowing.ae`, `khalid.h@dubaitowing.ae`, `usman.r@dubaitowing.ae`, `bilal.a@dubaitowing.ae`

**Naya driver approve hone par**: Jab Admin `Drivers → Applications` mein kisi application ko **Approve** karta hai, system khud-bakhud ek email + temporary password generate kar deta hai aur ek popup mein dikhata hai — wahi credentials driver ko login ke liye di jayengi.

## Is round mein kya kaam hua hai

1. **Dono files merge ki gayin** — base Claude-wala (feature-rich) version rakha gaya (Pagination, date filters, empty states, revenue chart), aur ChatGPT-wale version ka Login page design aur Admin Dashboard ka simpler layout liya gaya.

2. **Real login/auth flow add kiya** (`src/lib/auth.tsx`):
   - `/admin/*` aur `/driver/*` — dono ab bina login open nahi hote, seedha `/login` pe redirect hote hain.
   - Driver "Add New Job" pe click karega to pehle login mangega, uske baad hi form dikhega — jaisa aap ne bola tha.
   - Login session `localStorage` mein rehta hai (browser refresh pe bhi logged-in rehta hai) jab tak Logout na kiya jaye (Topbar mein logout button hai).

3. **Form validation add ki**:
   - Har zaroori (required) field ke label ke sath laal `*` laga diya hai.
   - Empty required field ke sath form submit nahi hota — error message dikhta hai.
   - Agar text field (jaise Customer Name, Full Name, Make, Model, Pickup Location) mein koi sirf numbers likh de, to warning aati hai: *"...looks like a number — please enter text"*.
   - Phone number field mein letters daalne pe bhi warning aati hai, aur Fare (number) field mein letters daalne pe bhi.
   - Yeh sab `AddJob.tsx` (driver job form) aur `Registration.tsx` (driver application form) dono mein lagaya gaya hai.

4. **Admin → Driver approval se credentials generate hona**:
   - `Drivers → Applications` tab mein Approve dabane par naya driver record ban jata hai (Pending status ke sath) aur login email/password generate ho kar screen pe dikhta hai.
   - Yeh ek MVP mock hai — real backend nahi hai, sab kuch is session ke memory mein hai (page reload/refresh karne se navigation state theek rehti hai kyunke login `localStorage` mein hai, lekin naye approved drivers/jobs data refresh pe reset ho jayega kyunke abhi koi database nahi hai).

5. **Admin Dashboard** ko ChatGPT-wale version jaisa simple layout diya gaya hai (4 stat cards + Recent Jobs table + Driver Activity list) — lekin numbers ab **live data se calculate** hote hain, hardcoded nahi hain jaisa ChatGPT wale version mein thay.

## MVP scope — kya abhi backend se connect nahi hai
Jaisa aap ne kaha tha "sara backend nahi banana" — is liye yeh sab abhi frontend-only hai:
- Sara data (`src/data/mockData.ts`) mein hai, koi real database/API nahi hai.
- Job submit karna, truck add karna, driver approve karna — sab sirf is browser session ki memory mein reflect hota hai; page fully reload/refresh karne par yeh naya data wapis mock state pe chala jayega (sirf login session persist rehta hai).
- Jab real backend banega, in jagah par sirf API calls lagani hongi (`src/lib/auth.tsx` aur `src/data/mockData.ts` ke functions ko backend calls se replace karna hoga) — baqi UI/validation waisi hi rahegi.

## Routes

**Public**
- `/` — Landing page
- `/login` — Login (role toggle: Business Admin / Driver)
- `/register` — Driver application form (login ki zaroorat nahi)

**Business Admin** (`/admin/*`, login required — role: admin)
- `/admin`, `/admin/drivers`, `/admin/drivers/:id`, `/admin/jobs`, `/admin/jobs/:id`, `/admin/trucks`, `/admin/reports`, `/admin/settings`

**Driver Portal** (`/driver/*`, login required — role: driver)
- `/driver`, `/driver/profile`, `/driver/add-job`, `/driver/jobs`, `/driver/jobs/:id`
