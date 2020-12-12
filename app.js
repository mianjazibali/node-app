const app = require('./server');
const dotenv = require('dotenv');
dotenv.config();

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

module.exports = app;
