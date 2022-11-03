const express = require("express")
const cors = require("cors")
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config()
const app = express()
const port = process.env.PORT || 5000;

// middle wire
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
	res.send("Ema John simple server is running")
})

// connect to mongodb

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.rgyxe1r.mongodb.net/?retryWrites=true&w=majority`;

console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run(){
	try{
		const productsCollection = client.db("emaJohn").collection("products")
		
		// get data from db
		app.get("/products", async (req, res) => {
			const query = {}
			const cursor = productsCollection.find(query)
			const storedProducts = await cursor.toArray()
			res.send(storedProducts)
		})
	}
	finally{

	}
}
run().catch(err => console.log(err))


app.listen(port, () => {
	console.log(`Ema John simple server is running  or port ${port}`)
})
