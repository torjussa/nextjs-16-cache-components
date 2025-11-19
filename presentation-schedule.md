# Next.js 16: Data Fetching & Caching Presentation Schedule

## 15-Minute Presentation

Slide 1:
Main agenda:

Jeg fant ut at det var litt tynt å skulle snakke om Kinde i en halvtime. Det er et SaaS som leverer auentisering, og er veldig enkelt å bruke! Sjekk det ut hvis du vil ha login til din neste app.
*Stryk over kinde og vis "raske nettsider med next 16" *

### part 1

slide 2:
- data fetching in websites
    - Vi henter of data fra api, databser, eller annet, når vi lager en nettside.
    - Vi snakker ofte om klient (min eller din datamaskin (browser)) og server (der nettsiden egentlig kommer fra. )

slide 3:
- short history of web development
    - Enkle statiske sider
        - Klient besøker nettside, server returnerer hele siden som html fil.
        - *Add infographic showing html file being returned from server*
    - Dynamiske nettsider
        - Server side scripting og databaser. Autentisering  (monoliter?) PHP, JSP
        *Add infographic showing sever returning page to client after doing work on server*
    - JavaScript revolusjon og SPA
        - Kraftigere browsere: mye client side rammeverk og biblioteker. 
        - *Add infographic showing sever returning json data to client and client doing work*

Notes: 
  Hvorfor jeg snakker om dette?
    I min karriere har jeg stort sett jobbet med dette tredje konseptet. 
    I Høst skulle jeg lage en fullstack applikasjon med Next.js for Gullbøsen. Da innså jeg fort at dette er noe jeg egentlig ikke forstår hvordan fungerer. 

- Server side rendering, partial prerender, dynamic server streamed content.
    *Add infographic showing a cofusing pattern with sever returning unknwon stuff and doing server work, maybe. Also, the separation between server and client should be non existant*


- Server komponenter? Hva er egentlig greia?
  - Vise hvordan jeg typisk hentet data før (fetch(..))
  - Men fortelle at nå lages jo denne komponenten på serveren jeg trenger ikke gjøre et kall.

Tidligere ville jeg typisk gjort noe slikt:
````
export default async function Page() {
  const data = await fetch('{backendUrl}/posts')
  const posts = await data.json()
  return (
    <Posts posts={posts}/>
  )
}
````

Notes: Siden server components rendres på server kan jeg trygt kalle databasen direkte.
````
export default async function Page() {
  const allPosts = await db.select().from(posts)
  return (
    <Posts posts={posts}/>
  )
}
````

Datahenting i Next:
- server components (reads)
- (streaming til client component) use() hook
- (route handlers / api routes)

Datamutasjoner i Next
- server actions
- (route handlers / api routes)

Skillet er litt vankelig å holde oversikt over, så det kan være nyttig å skille ut all databasekobling
i f.eks en data-access mappe.

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

Quick summary:
- summer presentasjonen.