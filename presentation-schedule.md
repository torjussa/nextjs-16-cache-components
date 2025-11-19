# Next.js 16: Data Fetching & Caching Presentation Schedule

## 25-Minute Presentation

Main agenda:

Jeg fant ut at det var litt tynt å skulle snakke om Kinde i en halvtime. Det er et saas som leverer auentisering, og er veldig enkelt å bruke! Sjekk det ut hvis du vil ha login til din neste app.

### part 1

- data fetching in websites
- short history
- Hvorfor jeg snakker om dette?
- Server komponenter? Hva er egentlig greia?
  DEMO
  - Vise hvordan jeg typisk hentet data før (fetch(..))
  - Men fortelle at nå lages jo denne komponenten på serveren jeg trenger ikke gjøre et kall.

Datahenting (og -endring)

- api routes
- server components (reads)
- server actions (mutasjoner)


### part 2

Next 16 nyheter:

- Bedre DX

  - Logging som viser hva som tar tid, (compile, render)

- Next.js devtools mcp
  - Ingen flere dumme forslag om next 12 kompatibel kode.
- Cache components

- Generelt om caching
  - Caching i next
- Caching i next 16: CacheComponents
  - Lenge vært missnøye, og usikkerhet om hvordan caching har fungert i next
  - Nå er det opt-in
  - Optimere dynamisk datahenting

DEMO

- Vis at loading tar tid.
- set cache components til true i config:
  - gir oss partial prerendering, use cache, cacheTag og cacheLife
  - Vis warning. Next forteller oss at vi kan gjøre dette bedre, med å bruke suspense.
  - Lag en egen categories component, og bruke i page.tsx
  - Dette er fint å bruke for dynamisk og frekvent oppdatert data.
  - Et annet fint eksempel er en navbar med notifications. 
    - Man vil ikke at navbaren ikke skal vises fordi man må hente notifikasjoner først.


Hva med ikke såå frekvent oppdatert data?
- Her kommer caching inn i bildet. 
- La oss se på en annen kompoent, (Legg til norge vinner wc)
    - Denne dataen endrer seg sjeldent, så vi trenger ikke å hente den ofte, og brukeren skal ikke behøve å vente på den.
- 'use cache'
- cacheTag(): Åpner opp for manuell invalidering
- cacheLife(): Hvor ofte skal vi invalidere automatisk?
Tre verdier under panseret: 
(stale): How long the client can use cached data without checking the server.
(revalidate): How often the server regenerates cached content in the background.
(expire): Maximum time before the server must regenerate cached content.
Presets: 
seconds - Real-time data (stock prices, live scores)
minutes - Frequently updated (social feeds, news)
hours - Multiple daily updates (product inventory, weather)
days - Daily updates (blog posts, articles)
weeks - Weekly updates (podcasts, newsletters)
max - Rarely changes (legal pages, archived content)

Feil bruk av cache kan gi feil data: 
- Legg på en cache i notification
- Oppdater og vis at innholdet ikke endres, ettersom funksjonen bare returnerer det samme fra cachen, 
- Juster cache life

Mange av oss lager 
- 'use cache: private' (caching som ikke skal caches på server)

---

## **Part 1: Bakgrunn, historie og konsepter.**

### **1.1 What is Data Fetching? (2 minutes)**

- **Definition:** Retrieving data from local/remote sources
- **Common protocols:**
  - HTTP/HTTPS (REST APIs)
  - GraphQL (query-based)
- **Where data comes from:**
  - External APIs
  - Databases
  - File systems

### **1.2 A Short History (3 minutes)**

- **Early websites:** Static HTML
  - Pre-rendered pages
  - No dynamic content
- **Server-rendered pages:**
  - PHP, Rails, Django
  - Data fetched on server
  - HTML generated per request
- **Rise of SPAs → client-side fetching:**
  - Broswere ble kraftigere
  - AJAX
  - Fetch API
  - JavaScript frameworks (React, Vue, Angular)
- **Modern hybrid models:**
  - SSR (Server-Side Rendering)
  - SSG (Static Site Generation)
  - ISR (Incremental Static Regeneration)

### **1.4 Caching Concepts (5 minutes)**

- **Browser cache:**
  - Memory cache (temporary)
  - Disk cache (persistent)
  - HTTP cache headers (Cache-Control, ETag)
- **Server-side cache:**
  - CDN (Content Delivery Network)
  - Reverse proxies (Varnish, Cloudflare)
  - Edge caching
- **Application-level cache:**
  - Redis (distributed cache)
  - In-memory cache
  - Database query cache
- **Cache invalidation strategies:**
  - **TTL (Time To Live):** Automatic expiration
  - **SWR (Stale-While-Revalidate):** Serve stale, update in background
  - **Revalidation on access:** Check freshness before serving
  - **Event-based:** Invalidate on data changes
- **Why caching matters:**
  - User experience: Instant responses
  - Cost: Reduced API calls and bandwidth
  - Performance: Lower latency
  - Scalability: Reduced server load

---

## **Part 2: Next.js 16 News & Live Demo (13 minutes)**

### **4. Next.js 16 Overview (2 minutes)**

- **Key changes in caching and data fetching:**
  - **Cache Components** (new feature)
    - Combine static and dynamic rendering
    - Fine-grained cache control
    - `"use cache"` directive
  - **Enhanced async Server Components**
    - Improved async/await support
    - Better error boundaries
  - **New caching APIs:**
    - `cacheTag()` - Tag-based cache invalidation
    - `cacheLife()` - Time-based cache expiration
    - `"use cache: private"` - Runtime prefetching
    - `"use cache: remote"` - Remote caching support
  - **Improved fetch caching:**
    - Better default caching behavior
    - Enhanced revalidation options

### **5. Live Demo Setup (1 minute)**

- Show current project structure
- Explain what we'll build:
  - Multiple examples demonstrating different caching strategies
  - Real-time comparison of cached vs. fresh data
  - Developer experience improvements

### **6. Live Demo: Building Examples (8 minutes)**

#### **Example 1: Basic Server Component Data Fetching (2.5 min)**

- Create async Server Component
- Demonstrate automatic request deduplication
- Show zero client-side JavaScript for data fetching
- Highlight the simplicity: just `async/await` and `fetch`
- **Key takeaway:** Server Components make data fetching trivial

#### **Example 2: Cache Configuration & Control (2.5 min)**

- Show `cache: 'force-cache'` vs `cache: 'no-store'`
- Demonstrate `revalidate` options (time-based)
- Use `cacheTag()` for tag-based invalidation
- Show `revalidateTag()` in action
- **Key takeaway:** Fine-grained control over caching behavior

#### **Example 3: Cache Components & Advanced Patterns (3 min)**

- Demonstrate `"use cache"` directive
- Show `cacheLife()` for expiration control
- Compare static vs. dynamic rendering
- Real-time cache invalidation demo
- Show developer experience improvements
- **Key takeaway:** Next.js 16 gives you powerful tools for optimal caching

### **7. Q&A & Wrap-up (2 minutes)**

- **Key takeaways:**
  - Server Components simplify data fetching
  - Next.js 16 provides powerful caching tools
  - Cache Components enable fine-grained control
  - Better developer experience with less boilerplate
- **Resources for further learning:**
  - Next.js 16 documentation
  - Cache Components guide
  - Caching and revalidating patterns
- Open for questions

---

## **Timing Breakdown:**

- **Part 1 (Foundations):** 12 minutes
- **Part 2 (Next.js 16 + Demo):** 13 minutes
- **Total:** 25 minutes

---

## **Demo Preparation Notes:**

### **What to Build:**

1. **Basic Server Component** (`/examples/basic`)

   - Simple async component fetching data
   - Show automatic caching

2. **Cache Control Examples** (`/examples/cache-control`)

   - Force cache vs. no-store
   - Revalidation examples
   - Cache tags demo

3. **Cache Components Demo** (`/examples/cache-components`)
   - `"use cache"` directive
   - `cacheLife()` usage
   - Real-time invalidation

### **Key Features to Highlight:**

- Zero client JavaScript for data fetching
- Automatic request deduplication
- Simple async/await syntax
- Powerful cache control APIs
- Developer-friendly error handling
- Performance benefits visible in DevTools

---

## **Presentation Tips:**

- **Part 1:** Keep it framework-agnostic and relatable
  - Use real-world examples everyone can relate to
  - Draw connections between general concepts and web development history
  - Visual aids help explain caching layers
- **Part 2:** Connect general concepts to Next.js 16
  - Reference Part 1 concepts when showing Next.js features
  - Show how Next.js solves the challenges mentioned in Part 1
  - Use browser DevTools to show network requests and caching in action
- **General:**
  - Start with relatable problems (slow sites, complex caching logic)
  - Show before/after comparisons when possible
  - Emphasize the simplicity of the new APIs
  - Keep demo code simple and readable
  - Have backup slides for technical difficulties
