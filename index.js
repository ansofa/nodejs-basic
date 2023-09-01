const MamaliaController = require("./class/controller/mamalia.controller");

// Ini import module HTTP
const http = require("http");
const { parse } = require("querystring");

const server = http.createServer(async (req, res) => {
  const method = req.method;
  const mamaliaController = new MamaliaController();
  switch (method) {
    case "GET":
      const mamalias = await mamaliaController.getAll();
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(mamalias, null, 2));
      break;

    case "POST":
      let requestBody = "";
      req.on("data", (chunk) => {
        requestBody += chunk;
      });
      req.on("end", async () => {
        try {
          const jsonData = JSON.parse(requestBody);
          await mamaliaController.store(jsonData);
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("Mamalia Berhasil Ditambahkan");
        } catch (error) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end(error.message);
        }
      });
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
