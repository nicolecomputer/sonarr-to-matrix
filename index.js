import {
    MatrixAuth
} from "matrix-bot-sdk";

import express, { json } from 'express';
import 'dotenv/config'

// Utiltiy Functions
function messageForData(data) {
    const { eventType } = data;

    if (eventType === "Test") {
        return "Connected Successfully! Ready to roll."
    } else if (eventType === "Download") {
        return data.episodes.map(episode => {
            return `✅ Downloaded ${data.series.title}: S${episode.seasonNumber}E${episode.episodeNumber} - ${episode.title}`
        }).join("\n");
    }

    return null;
}

// Connect the bot
const homeserverUrl = process.env.HOMESERVER_URL;
const password = process.env.MATRIX_PASSWORD;
const username = process.env.MATRIX_USERNAME;
const roomId = process.env.MATRIX_ROOMID;

const auth = new MatrixAuth(homeserverUrl);
const client = await auth.passwordLogin(username, password);

console.log(`Authenticated to homeserver ${homeserverUrl}`);

// Boot webhook server
const app = express();
app.use(json());

// Receive requests
app.post('/', (req, res) => {
    console.log(req.body);

    const message = messageForData(req.body);

    if (message !== null){
        client.sendMessage(roomId, {
            "msgtype": "m.text",
            "body": message
        });
    }

    res.sendStatus(200);
});

app.listen(9000, () => console.log('Starting webhook server on port 9000'));
