// const { MongoClient } = require('mongodb');
// require('dotenv').config();
// async function runGetStarted() {
//   // Replace the uri string with your connection string

//   const uri = process.env.MONGODB_URL;
//   const client = new MongoClient(uri);

//   try {
//       await client.connect();
//     const database = client.db('namasteNodejs');
//     const users = database.collection('user');

//     // Queries for a movie that has a title value of 'Back to the Future'
//    console.log("Connected successfully to database");
//    const findResult = await users.find({ name: "Riya" }).toArray();
//    console.log('Found documents =>', findResult);
//     console.log(users);
//     console.log("end")
//   } finally {
//     await client.close();
//   }
// }
// runGetStarted().catch(console.dir);



require('dotenv').config();
const { MongoClient } = require('mongodb');

async function run() {
  const uri = process.env.MONGODB_URL;

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Connected");


    const db = client.db("namasteNodejs");
    const users = db.collection("user");
    const userData = {
        "firstName":"Himanshi",
        "lastName":"Sharma",
        "city":"Dehradoon",
        "phone no." : 1234567890
    }
    // const insertUserData = await users.insertOne(userData);
    // console.log("Inserted document ID:", insertUserData.insertedId);


    // const updateQuery = {"firstName":"Himanshi"};
    // const updateData = {
    //     $set:{
    //         "phoneno" : 8750498869
    //     }
    // }
    // await users.updateOne(updateQuery, updateData,{});

    // await users.deleteOne({"firstName":"Himanshi"});


    // await users.updateMany({$or: [{'firstName':"Himanshi"}, {'firstName':"Riya"}]}, {$set: {"city": "Delhi"}});

    const data = await users.find({}).toArray();
    console.log(data);
    const countDocuements = await users.countDocuments({});
    console.log("Total documents in collection:", countDocuements);

  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
  }
}

run();