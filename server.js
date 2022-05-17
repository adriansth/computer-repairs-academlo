const { app } = require('./app');

// Models
const { User } = require('./models/user.model');
const { Repair } = require('./models/repair.model');

// Utils
const { db } = require('./utils/database');
const { prototype } = require('events');

// Authenticate database credentials
db.authenticate()
  .then(() => console.log('Database authenticated'))
  .catch((err) => console.log(err));

// Establish models relations
User.hasMany(Repair);
Repair.belongsTo(User);

// Sync sequelize model
db.sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.log(err));

// Spin up server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
