import express from "express";
import { MongoClient } from "mongodb";
import cors from 'cors';
import 'dotenv/config';

const app = express();
const corsOptions = {
  origin: `http://localhost:${process.env.FRONT_PORT}`
};
const PORT = process.env.SERVER_PORT;
const DB_CONNECTION = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.${process.env.CLUSTER_ID}.mongodb.net/`;

app.use(express.json());
app.use(cors(corsOptions));

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));

// all gifts route
app.get('/books', async (req, res) => {
  const client = await MongoClient.connect(DB_CONNECTION);
  const data = await client.db('biblioteka').collection('knygos').find({}).toArray();
  await client.close();
  res.send(data);
});

