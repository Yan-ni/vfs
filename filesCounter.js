const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

module.exports = async function requestVFSFiles(date, start, end) {
  let log = "";

  const IntToStringof4 = (number) => {
    number = number.toString();

    return "0000".slice(0, -number.length) + number;
  };

  for (let i = start[0]; i <= end[0]; i++) {
    for (
      let j = i === start[0] ? start[1] : 0;
      j <= (i === end[0] ? end[1] : 300);
      j++
    ) {
      await fetch(
        `https://fastmaildz.com/newfastmail/public/packagestatus?searchoption=ndossier&destination=ALGI&nb=${date}/${IntToStringof4(
          j
        )}/0${i}&csrfmiddlewaretoken=F6j3a1tYNSEtc5Ppqm1AFhhedNxgNVuigoNe4wYsfPCC4BhpzdOJWrrt5eRZ9PC9`
      )
        .then((res) => {
          console.log(
            `Dossier N°${IntToStringof4(j)}/0${i} : ${
              res.status === 200 ? "trouvé" : "non trouvé"
            }`
          );
          if (res.status === 200) {
            res.json().then((response) => {
              if (response[0].length === 0)
                log += `ALGI/${date}/${IntToStringof4(j)}/0${i}\n`;
            });
          }
        })
        .catch((error) => console.log(new Error(error)));
    }
  }

  fs.writeFileSync(
    path.resolve(
      __dirname,
      "logs",
      `vfs ${date} ${new Date().toDateString()}.txt`
    ),
    log
  );

  return log;
};
