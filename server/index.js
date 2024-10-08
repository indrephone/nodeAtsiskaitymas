import express from "express";
import { MongoClient} from "mongodb";
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

// all books route with aggregate pipeline sorting and filtering
app.get('/books', async (req, res) => {
  const { title = '', genre = '', minYear = 0, maxYear = 9999, availability = '', sortField = 'rating', sortOrder = '1' } = req.query;

  try {
    const client = await MongoClient.connect(DB_CONNECTION);
    const db = client.db('biblioteka');
    const collection = db.collection('knygos');

    const pipeline = [
      {
        $match: {
          title: { $regex: title, $options: 'i' }, // Case-insensitive title match
          genres: { $regex: genre, $options: 'i' }, // Case-insensitive genre match
          publishDate: { $gte: new Date(`${minYear}-01-01`), $lte: new Date(`${maxYear}-12-31`) },
          ...(availability === 'available' ? { amountOfCopies: { $gt: 0 } } : {}), // Only include books with copies if 'available'
          ...(availability === 'notAvailable' ? { amountOfCopies: { $eq: 0 } } : {}) // No copies if 'notAvailable'
        }
      },
      { 
        $sort: { [sortField]: parseInt(sortOrder) } // Dynamic sorting field and order
      }
    ];

    const books = await collection.aggregate(pipeline).toArray();
    await client.close();
    res.status(200).json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching filtered books' });
  }
});



// route to get one specific book
app.get('/books/:id', async (req, res) => {
  let filter = {"_id": req.params.id};
  const client = await MongoClient.connect(DB_CONNECTION);
  const data = await client.db('biblioteka').collection('knygos').findOne(filter);
  await client.close();
  res.send(data);
});

