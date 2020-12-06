const server = require('./server');

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
