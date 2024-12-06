# Mela Multiplayer Backend

A Node.js-based multiplayer game backend using WebSockets and Redis for matchmaking, real-time updates, scoring, and leaderboard management.

## Features

- Matchmaking and room creation
- Real-time updates for player actions
- Scoring and leaderboard management
- Session management and Redis integration

## Technologies

- **Node.js**: Backend server
- **Socket.io**: WebSocket implementation for real-time communication
- **Redis**: In-memory data store for session management and leaderboard persistence

## Setup

### Prerequisites

- Node.js (>= 14.x)
- Redis server installed and running

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/<your-username>/mela-multi-player.git
   cd mela-multi-player
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run Redis Server**
   Ensure Redis is running on your local machine or provide a Redis connection URL in the `.env` file.

4. **Start the Server**

   ```bash
   node index.js
   ```

5. **Access the Backend**
   Open your browser and navigate to `http://localhost:3000` to confirm the server is running.

## Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
PORT=3000
REDIS_URL=redis://localhost:6379
```

## API Endpoints

### WebSocket Events

- `join_or_create_room`: Join an existing room or create a new one.
  - **Data**: `{ username: string }`
- `player_action`: Broadcast player actions to the room.
  - **Data**: `{ room: string, action: object }`
- `update_score`: Update player score in the room.
  - **Data**: `{ room: string, score: number }`
- `room_update`: Notify all clients in the room about updated player data.

## Deployment

### Platforms

- **Heroku**
  - Add the Redis add-on and configure environment variables.
- **AWS EC2**
  - Install Node.js and Redis, deploy the code, and run the server.
- **Railway** or **Render**
  - Use simple deployment pipelines with Redis integration.

### Deployment Steps

1. Configure environment variables on your hosting platform.
2. Push the code to your deployment platform.
3. Verify the server is running and WebSocket connections are active.

## Testing

1. Use WebSocket testing tools (e.g., Postman or a custom frontend) to verify events.
2. Connect multiple clients to simulate real-time gameplay.

## Contributing

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

Happy coding and gaming! 🎮
