const app = require("./src/app.js");
const connectDB = require("./src/config/db.js");
const dotenv = require("dotenv");

dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
