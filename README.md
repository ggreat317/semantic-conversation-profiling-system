# semantic-conversation-profiling-system

# Simple Description
An online chat application with front end, back end, and ML properties. 

Meant to create user profiles based on clustered message embeddings and promotes user interaction with the similar cluster profiles.

# Fourth Week of January 2026 Updates

Already completed:
- most of react frontend hosted on firebase
- pipelined embeddings, cluster creation, and low dimensionality proj.
- data wiring/schemas in mongo, firebase firestore, and firebase RTDB
- deploying dockerized central expressjs api's and ml pipelines on fast api and hosting frontend on public firebase 
- time-decayed centroid aggregation (like weighing the importance of clusters), cluster maintenance (since clusters evolve), and "ramp up" batch ingestion pipelines 
- lots of batching and other fun optimizations (no c hot functions or optimized numpy matrix multiplications just yet)
- aws lighthouse backend API server and https for remote usage
- user to user matching via FAISS
- some other stuff I likely forgot

Currently working on (prioritized and will likely be done by 2/14):
- finding foundational bugs
- normalizing user cluster time-weights
- getting more user messages in messageVault for better low-dimensional proj.
- using a dataset of genres for reverse embedding cluster centroids (would replace default {Cluster 0, Cluster 1, ... , Cluster n} names and likely lead to improved FAISS implementation)

Planning to work on (not prioritized but wanted done by 3/1):
- mult-line messages/inputs and better UI
- vectorized or hot c functions (optimizes python scripts)
- custom background stickers (allows for cool looking setups)
- theme change (thinking of changing the entire theme, but i like the potential of a default environment, for customizing it to your liking)
- ci/cd pipeline (currently manually going into server and pushing updates since its in prod mode and not dev mode, so its easier)
- finding more bugs (the eternal strive to removing weaknesses)
- adding cool stuff (the eternal strive to implement strengths)

Hope To Work On:
- model for user interactions < --- needs user interactions to train on

# Remote Usage
To use the latest push online:
 - go to "https://murmurs.web.app"
 - tell your friends, and their friends/family, to join you
 - be sure to spread the word, so I can getter better data to work with!
 - maybe dont do the two things above just yet, give it a month or two

# Local Usage
 To run the latest push locally:
 - clone the repo
 - get your own mongo URI and firebase server SDK
 - change the frontend api url in /frontend/src/app/components/main/api/token to "http://localhost:5000" 
 - change port stuff at bottom of /api/backend/index.js
 - run "docker compose up --build" in /api directory
 - wait for two locked and loaded messages, the ML takes about a minute to load up
 - run "npm run dev" in /frontend directory
 - go to "localhost:3000" (or whatever port npm run dev finds available)

# Author Note
Test it out and tell me how to improve it.
The old frontend is under another repo titled "murmur", if you want to see progress.
Usually busy with other stuff, you could probably tell from how frequent this is updated (started in July 2025 for reference), but this is a project I like working on in my free time.