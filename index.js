const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oyvr00h.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const userCollection = client.db("social-book").collection("users");

        //We will write all the APIs here
        app.get('/users', async (req, res) => {
            const users = await userCollection.find().toArray();
            res.send(users);
        })

        // app.post('/products', async (req, res) => {
        //     const newProduct = req.body;
        //     const result = await productCollection.insertOne(newProduct);
        //     res.send(result);
        // })

        // app.delete('/product/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: new ObjectId(id) };
        //     const result = await productCollection.deleteOne(query);
        //     res.send(result);

        // })

    }
    finally {

    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('SocialBook Homepage')
});


app.listen(port, () => {
    console.log('port is running')
})