const express = require(`express`);
const app = express();
////Routes Import
const BooksAdmin=require(`./Routes/Books.route`)
require('./db/db')
const cors = require("cors");
app.use(express.json());
app.use('/books',BooksAdmin)
app.use(cors());
app.listen(3000, () => {
  console.log("application servered");
});
