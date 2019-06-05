const PORT = process.env.PORT || 3300;

const server = require("./server");

server.listen(PORT, () => {
  console.log(`The server is listening on Port: ${PORT}`);
});
