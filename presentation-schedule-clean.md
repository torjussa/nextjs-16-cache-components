# Next.js 16: Data Fetching & Caching

## 15-Minute Presentation Outline

---

## SLIDE 1: Title & Agenda

**Title:** Raske nettsider med Next.js 16

**Main Points:**

- Data fetching i Next.js
- Server Components
- Next.js 16 nyheter
- Cache Components
- Live demo

---

## PART 1: Data Fetching Fundamentals

### SLIDE 2: Data Fetching in Websites

**Content:**

- Vi henter ofte data fra API, databaser, eller annet når vi lager en nettside
- Vi snakker om:
  - **Klient:** Min eller din datamaskin (browser)
  - **Server:** Der nettsiden egentlig kommer fra

---

### SLIDE 3: Short History of Web Development

**1. Enkle statiske sider**

- Klient besøker nettside
- Server returnerer hele siden som HTML-fil
- _[Infographic: HTML file being returned from server]_

**2. Dynamiske nettsider**

- Server-side scripting og databaser
- Autentisering (monoliter)
- PHP, JSP
- _[Infographic: Server returning page to client after doing work on server]_
  A user would send a request to a web server (e.g., typing a URL in the browser).
  The server would process the request, execute any necessary business logic (e.g., querying a database), and dynamically generate an HTML page.
  The server would send the complete HTML, CSS, and sometimes JavaScript back to the client (browser).
  The client would render the page, and any interactions would trigger a full-page reload by sending another request to the server.

**3. JavaScript revolusjon og SPA**

- Kraftigere browsere
- Mye client-side rammeverk og biblioteker
- _[Infographic: Server returning JSON data to client and client doing work]_

**Notes:**

- Hvorfor snakker jeg om dette?
  - I min karriere har jeg stort sett jobbet med dette tredje konseptet
  - I høst skulle jeg lage en fullstack applikasjon med Next.js for Gullbøsen
  - Da innså jeg fort at dette er noe jeg egentlig ikke forstår hvordan fungerer

---

### SLIDE 4: Modern Web Development Complexity

**Concepts:**

- Server-side rendering
- Partial prerender
- Dynamic server streamed content
- _[Infographic: Confusing pattern with server returning unknown stuff and doing server work. Separation between server and client should be non-existent]_

---

### SLIDE 5: Server Components - Hva er greia?

**Problem:**

- Vise hvordan jeg typisk hentet data før (fetch(...))

**Solution:**

- Nå lages komponenten på serveren
- Jeg trenger ikke gjøre et API-kall

**Code Example - Før:**

```typescript
export default async function Page() {
  const data = await fetch("{backendUrl}/posts");
  const posts = await data.json();
  return <Posts posts={posts} />;
}
```

**Code Example - Nå:**

```typescript
export default async function Page() {
  const allPosts = await db.select().from(posts);
  return <Posts posts={allPosts} />;
}
```

**Notes:**

- Siden server components rendres på server kan jeg trygt kalle databasen direkte

---

### SLIDE 6: Data Patterns in Next.js

**Datahenting (Reads):**

- Server Components
- `use()` hook (streaming til client component)
- Route handlers / API routes

**Datamutasjoner (Writes):**

- Server Actions
- Route handlers / API routes

**Best Practice:**

- Skillet er vanskelig å holde oversikt over
- Nyttig å skille ut all databasekobling i f.eks. en `data-access` mappe

---

## PART 2: Next.js 16 Nyheter

### SLIDE 7: Next.js 16 Improvements

**Bedre DX (Developer Experience):**

- Logging som viser hva som tar tid (compile, render)
- Next.js DevTools MCP
  - Ingen flere dumme forslag om Next.js 12-kompatibel kode

**Cache Components:**
Still et tenke-spørsmål til salen.
Still samme spørsmål til salen. 


- Opt-in caching system
- Mer kontroll og forutsigbarhet

---

### SLIDE 8: Caching in Next.js

**Historikk:**

- Lenge vært missnøye og usikkerhet om hvordan caching har fungert i Next.js
- Nå er det opt-in med Cache Components

**Hva er Cache Components?**

- Optimere dynamisk datahenting
- Partial prerendering
- `use cache`, `cacheTag()` og `cacheLife()`

---

## DEMO SECTION

### DEMO 1: Partial Prerendering

**Steps:**

1. Vis at loading tar tid
2. Sett `cacheComponents: true` i config
   - Gir oss: partial prerendering, `use cache`, `cacheTag` og `cacheLife`
3. Vis warning: Next forteller oss at vi kan gjøre dette bedre med å bruke Suspense
4. Lag en egen Categories component og bruk i `page.tsx`

**Use Cases:**

- Dette er fint å bruke for dynamisk og frekvent oppdatert data
- Et annet fint eksempel er en navbar med notifications
  - Man vil ikke at navbaren ikke skal vises fordi man må hente notifikasjoner først

---

### DEMO 2: Caching for Infrequently Updated Data

**Problem:**

- Hva med ikke såå frekvent oppdatert data?

**Solution:**

- Her kommer caching inn i bildet
- La oss se på en annen komponent (Norge vinner VM)
  - Denne dataen endrer seg sjeldent
  - Vi trenger ikke å hente den ofte
  - Brukeren skal ikke behøve å vente på den

**Implementation:**

- `'use cache'`
- `cacheTag()`: Åpner opp for manuell invalidering
- `cacheLife()`: Hvor ofte skal vi invalidere automatisk?

---

### SLIDE 9: Cache Life Explained

**Tre verdier under panseret:**

1. **Stale:** How long the client can use cached data without checking the server
2. **Revalidate:** How often the server regenerates cached content in the background
3. **Expire:** Maximum time before the server must regenerate cached content

**Presets:**

- `seconds` - Real-time data (stock prices, live scores)
- `minutes` - Frequently updated (social feeds, news)
- `hours` - Multiple daily updates (product inventory, weather)
- `days` - Daily updates (blog posts, articles)
- `weeks` - Weekly updates (podcasts, newsletters)
- `max` - Rarely changes (legal pages, archived content)

---

### DEMO 3: Common Cache Mistakes

**Feil bruk av cache kan gi feil data:**

1. Legg på en cache i notification
2. Oppdater og vis at innholdet ikke endres
   - Ettersom funksjonen bare returnerer det samme fra cachen
3. Juster cache life

**Andre patterns:**

- `'use cache: private'` - Caching som ikke skal caches på server

## summary slide?
