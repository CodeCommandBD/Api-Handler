const app = require("./app");
require("dotenv").config();
const connectDB = require("./config/user.config");
const PORT = process.env.PORT || 3000;

// Connect to database first
connectDB();

// Then start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
