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
  const { title = '', genre = '', minYear = '0-01-01', maxYear = '9999-12-31', availability = '', sortField = 'rating', sortOrder = '1', page = 1, limit = 10 } = req.query;

  console.log("Sort Field:", sortField, "Sort Order:", sortOrder); // Debugging the sort field and order

  try {
    const client = await MongoClient.connect(DB_CONNECTION);
    const db = client.db('biblioteka');
    const collection = db.collection('knygos');

     // Calculate how many books to skip based on the page number
     const skip = (page - 1) * limit;
     // Get total number of books that match the filters
     const totalBooks = await collection.countDocuments({
      title: { $regex: title, $options: 'i' }, 
      genres: { $regex: genre, $options: 'i' },
      publishDate: { 
        $gte: minYear,
        $lte: maxYear
      },
      ...(availability === 'true' ? { amountOfCopies: { $gt: 0 } } : {}),
      ...(availability === 'false' ? { amountOfCopies: { $eq: 0 } } : {})
    });

    // Create the aggregation pipeline
    const pipeline = [
      {
        $match: {
          title: { $regex: title, $options: 'i' }, // Case-insensitive title match
          genres: { $regex: genre, $options: 'i' }, // Case-insensitive genre match
          publishDate: { 
            $gte: minYear,  // Compare as strings
            $lte: maxYear   // Compare as strings
          },
          ...(availability === 'true' ? { amountOfCopies: { $gt: 0 } } : {}),
          ...(availability === 'false' ? { amountOfCopies: { $eq: 0 } } : {})
        }
      },
      {
        $sort: { [sortField]: parseInt(sortOrder) } // Dynamic sorting field and order
      },
      {
        $skip: skip // Skip the appropriate number of books for pagination
      },
      {
        $limit: parseInt(limit) // Limit the number of books returned per page
      }
    ];
    // console.log("Pipeline:", JSON.stringify(pipeline, null, 2)); 

    const books = await collection.aggregate(pipeline).toArray();
    await client.close();

    res.status(200).json({ books, totalBooks }); // Return books and totalBooks
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

