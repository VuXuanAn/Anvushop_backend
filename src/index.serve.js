const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors")
const path = require('path')
const useRoute = require('./routes/auth')
const adminRoutes = require("./routes/admin/auth");
const categoryRoute = require('./routes/category')
const productRouter = require('./routes/product')
const initalRouter = require('./routes/admin/initialData')
const cartRouter = require('./routes/cart')
env.config();

// monggo db connection 
//mongodb+srv://root:<password>@cluster0.d2adw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//mongodb+srv://root:<password>@cluster0.d2adw.mongodb.net/test
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.d2adw.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("Database connected");
  });
app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')))
app.use('/api', useRoute)
app.use("/api", adminRoutes);
app.use('/api', categoryRoute)
app.use('/api', productRouter)
app.use('/api', cartRouter)
app.use('/api', initalRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});