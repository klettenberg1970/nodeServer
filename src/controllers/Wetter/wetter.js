const url = "https://api.open-meteo.com/v1/forecast" +
  "?latitude=50.94" +
  "&longitude=6.96" +
  "&hourly=temperature_2m,rain,precipitation" +
  "&timezone=Europe%2FBerlin";

export const temperaturen = async () => {
  const response = await fetch(url);
  const temperaturen = await response.json();
  const length = temperaturen.hourly.time.length;
  const wetterarray = [];

 for (let i = 0; i < length; i++) {
  
const isoZeit = temperaturen.hourly.time[i];  // "2026-02-20T10:00"
const datum = new Date(isoZeit);

// Sauberes 20/02-10:00 Format
const day = String(datum.getDate()).padStart(2, '0');           // "20"
const month = String(datum.getMonth() + 1).padStart(2, '0');    // "02"
const hours = String(datum.getHours()).padStart(2, '0');        // "10"
const minutes = String(datum.getMinutes()).padStart(2, '0');    // "00"

const datumFormat = `${day}/${month}-${hours}:${minutes}`;     // "20/02-10:00"


  const array = [
    datumFormat,                           // "19/02" (perfekt sauber)
    temperaturen.hourly.temperature_2m[i],
    temperaturen.hourly.rain[i],
    temperaturen.hourly.precipitation[i]
  ];
  
  wetterarray.push(array);
}

  
  return wetterarray;
};
