const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'local instance HERE', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;

// need to connect to MongoDB Atlas
// where to get mongodb local instance (ask Jen!)