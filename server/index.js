const app = require("./app");
const PORT = process.env.PORT || 3000;
require("dotenv").config();
const connectDB = require("./config/user.config");

// Connect to database first
connectDB();

// Then start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
