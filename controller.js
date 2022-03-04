const requestVFSFiles = require("./filesCounter");

module.exports = {
  view: (req, res) =>
    res.sendFile(path.resolve(__dirname, "views", "index.html")),

  api: async (req, res) => {
    const dateDepot = req.params.date;

    try {
      const dossiersRestants = fs.readFileSync(
        path.resolve(
          __dirname,
          "logs",
          `vfs ${dateDepot} ${new Date().toDateString()}.txt`
        ),
        { encoding: "utf-8" }
      );

      res.json({
        dossiersRestants,
      });
    } catch (error) {
      const dossiersRestants = await requestVFSFiles(
        dateDepot,
        [1, 1],
        [2, 100]
      );

      res.json({
        dossiersRestants,
      });
    }
  },
};
