const mongoose = require("mongoose");

async function connect() {
  // connect to database
  try {
    await mongoose.connect(
      "mongodb+srv://vietnhgch210639:zeuscon3@cluster0.zqy8pum.mongodb.net/Shop?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
      }
    );
    console.log("Connect successfully!!!");
  } catch (error) {
    console.log("Connect failure!!!");
  } 
}

module.exports = { connect };
