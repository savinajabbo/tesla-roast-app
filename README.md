# 🔥 tesla roast ai 🔥

the one and only ai that roasts your driving habits.  
yeah, your tesla’s judging you. but now it can *speak*.

---

## what this is

tesla roast ai is a chaotic fusion of openai and tesla energy.  
it’s a web app that connects (or... *tries* to connect*) to your tesla account, reads your car’s data, and generates sarcastic, gen-z-style roasts about how you drive, charge, and treat your car.  

the idea: make your tesla *talk back* to you like an overly online friend who’s had too much caffeine and too little patience.

---

## why i made this

because i think the future should be a little bit unhinged.  
everyone’s making smart cars more “serious": optimizing range, improving efficiency, blah blah blah.  
meanwhile, i wanted mine to say things like:

> “83% battery? be so fr. you charge like it’s 2013.”  
> “your regen braking arc is giving ‘panic’ not ‘energy recovery.’”  
> “you’re one supercharge away from emotional damage.”

it’s funny, it’s mildly concerning, and it’s my favorite kind of project: a mix of tech and chaos that actually says something about how we interact with machines.

---

## how i built it

i built this with:
- **next.js + typescript** — frontend & api routes  
- **tailwind css** — tesla-inspired dark ui aesthetic  
- **openai gpt-4o-mini** — for the roasts, sarcasm, and “tiktok brainrot” humor  
- **vercel** — deployment  
- **(attempted) tesla fleet api integration** — to pull real vehicle data  

the app pulls either:
- **real tesla vehicle data** (if you’re authenticated through the fleet api), or  
- **sample mock data** (if you don’t own a tesla or the api refuses to cooperate).  

each “vehicle card” shows info like your battery level and odometer, and the ai then roasts you accordingly.

---

## the struggle (aka tesla api pain chronicles)

so. the tesla fleet api.  

i have, in fact, gotten it to work *before* in this exact project.  
but this time around? absolute madness.  

- documentation? nearly nonexistent.  
- authentication? overly complicated.  
- privacy rules? blocking me left and right.  
- error logs? pure chaos.  

i spent HOURS calling endpoints and refreshing tokens...
but alas, at 3am pst on november 1st, it just wasn’t happening.  

so, as a last resort, i defaulted to **sample data** for the submission.  
but i’m not giving up. i *will* get the fleet api retrieval to work again, because i think this project is genuinely funny and weird and deserves to exist in the real world.  

(also i want my car to roast me because why not)

---

## what i learned

- integrating with a barely documented enterprise api builds character.  
- caching and handling failed oauth flows is actually kinda fun when you stop crying.  
- the tesla brand aesthetic in tailwind looks *so* clean in dark mode.  
- openai + humor + context = infinite possibilities for interactive, expressive ai.  

---

## future plans

- make the fleet api authentication rock-solid  
- pull real-time data (charging, location, drive state)  
- add voice roast mode using tts (“hey bestie, plug me in before i die”)  
- mobile responsiveness & animated roast transitions  
- more chaotic gen-z roast templates  

---

## credits

made by savina jabbo 💫  
powered by caffeine, music, and annoying tesla api errors

---

> submitted november 1st, 3am pst.  
> tesla api 1, me 0 (for now...)

[![Athena Award Badge](https://img.shields.io/endpoint?url=https%3A%2F%2Faward.athena.hackclub.com%2Fapi%2Fbadge)](https://award.athena.hackclub.com?utm_source=readme)