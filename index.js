const MamaliaController = require("./class/controller/mamalia.controller");

// Ini import module HTTP
const http = require("http");

const server = http.createServer(async (req, res) => {
  const method = req.method;
  switch (method) {
    case "GET":
      const mamaliaController = new MamaliaController();
      const mamalias = await mamaliaController.getAll();
      // console.log(mamalias);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(mamalias, null, 2));
      break;

    case "POST":
      const body = req.body;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(body, null, 2));
      break;

    default:
      break;
  }
});

server.listen(3000, () => {
  console.log("Server Berjalan di Port 3000!");
});

// async function main() {
//   try {
//     const mamalia = { name: "Lumba-lumba", type: "Mamalia", habitat: "Laut" };
//     const mamaliaController = new MamaliaController();
//     // mamaliaController.getSuara();
//     // await mamaliaController.store(mamalia);
//     const mamalias = await mamaliaController.getAll();
//     console.log(mamalias);
//   } catch (error) {
//     console.error(error);
//   }
// }
// main();
