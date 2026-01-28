# semantic-conversation-profiling-system

# Simple Description
A chat application with front end, back end, and ML properties. 

Meant to create user profiles based on clustered message embeddings and promote user interaction with the most similar users.

# Fourth Week of January 2026 Updates

Already completed:
- most of react frontend hosted on firebase
- pipelined embeddings, cluster creation, and low dimensionality proj.
- data wiring/schemas in mongo, firebase firestore, and firebase RTDB
- deploying dockerized central expressjs api's and ml pipelines on fast api and hosting frontend on public firebase 
- centroid aggregation and cool cluster maintenance
- lots of batching and other fun optimizations (no c hot functions or optimized numpy matrix multiplications just yet)
- aws lighthouse backend API server and https for remote usage
- some other stuff I likely forgot

Currently working on (from most to least focused):
- finding bugs
- user to user matching via FAISS
- getting more user messages in messageVault for better low-dimensional proj.
- using a dataset of genres for reverse embedding cluster centroids (would replace default {Cluster 0, Cluster 1, ... , Cluster n} names and likely lead to improved FAISS implementation)
- few other nuances

Planning to work on:
- mult-line messages/inputs and better UI
- vectorized or hot c functions
- theme change or custom background stickers
- model for user interactions < --- needs more user interactions to train on

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