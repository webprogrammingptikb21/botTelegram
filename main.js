const TelegramBot = require("node-telegram-bot-api");

const token = "7014866976:AAG6TDYJaKLo_mzepuS4Toltw0I1XaASj-c";
const option = {
  polling: true,
};

const Cuybot = new TelegramBot(token, option);

const prefix = ".";

const sayHi = new RegExp(`^${prefix}halo$`);
const gempa = new RegExp(`^${prefix}gempa$`);

Cuybot.onText(sayHi, (callback) => {
  Cuybot.sendMessage(callback.from.id, "halo juga!");
});

Cuybot.onText(gempa, async (callback) => {
  const BMKG_ENDPOINT = "https://data.bmkg.go.id/DataMKG/TEWS/";

  const apiCall = await fetch(BMKG_ENDPOINT + "autogempa.json");
  const {
    Infogempa: {
      gempa: { Jam, Magnitude, Tanggal, Wilayah, Potensi, Kedalaman, Shakemap },
    },
  } = await apiCall.json();
  const BMKGImage = BMKG_ENDPOINT + Shakemap;
  const resultText = `
  Waktu: ${Tanggal} | ${Jam}
  Besaran: ${Magnitude} SR
  Wilayah: ${Wilayah}
  Potensi: ${Potensi}
  Kedalaman: ${Kedalaman}
  `;

  Cuybot.sendPhoto(callback.from.id, BMKGImage, {
    caption: resultText,
  });
});
