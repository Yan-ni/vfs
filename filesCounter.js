const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
/**
 *
 * @param {Number} date /DDMMYY/
 * @param {Array} fileNumberStart
 * @param {Array} fileNumberEnd
 * @returns {String} logs
 */
module.exports = async function requestVFSFiles(
  date,
  fileNumberStart,
  fileNumberEnd
) {
  let log = "";

  const IntToStringof4 = (number) => {
    number = number.toString();

    return "0000".slice(0, -number.length) + number;
  };

  for (let i = fileNumberStart[0]; i <= fileNumberEnd[0]; i++) {
    for (
      let j = i === fileNumberStart[0] ? fileNumberStart[1] : 0;
      j <= (i === fileNumberEnd[0] ? fileNumberEnd[1] : 300);
      j++
    ) {
      await fetch(
        `https://fastmaildz.com/newfastmail/public/packagestatus?searchoption=ndossier&destination=ALGI&nb=${date}/${IntToStringof4(
          j
        )}/0${i}&csrfmiddlewaretoken=F6j3a1tYNSEtc5Ppqm1AFhhedNxgNVuigoNe4wYsfPCC4BhpzdOJWrrt5eRZ9PC9`
      )
        .then((fastMailApiResponse) => {
          console.log(
            `Dossier N°${IntToStringof4(j)}/0${i} : ${
              fastMailApiResponse.status === 200 ? "trouvé" : "non trouvé"
            }`
          );

          return fastMailApiResponse;
        })
        .then((fastMailApiResponse) => {
          if (fastMailApiResponse.status === 200) {
            fastMailApiResponse.json().then((fastMailApiResponseJSON) => {
              // the fast mail api response with an array of two elements

              if (fastMailApiResponseJSON[0].length === 0)
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
