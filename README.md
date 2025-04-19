# Mystery Chat

A real-time anonymous chat app where users connect and chat without names or avatars—just vibes. Names can be revealed after a timer or mutual agreement.

## Features
- Anonymous chat rooms (1-on-1 or group)
- Real-time messaging (WebSockets)
- Message history (PostgreSQL)
- Redis Pub/Sub for real-time delivery
- Option to reveal names after timer or mutual consent

## Tech Stack
- Backend: FastAPI, PostgreSQL, Redis, Docker
- Frontend: React

## Quick Start

### Prerequisites
- Docker & Docker Compose

### Run Locally
```sh
git clone https://github.com/YOUR_USERNAME/mystery-chat.git
cd mystery-chat
docker-compose up --build
```

Frontend: http://localhost:3000  
Backend: http://localhost:8000/docs

---

Author: Ameen Vadakkekara (av2851@nyu.edu)
