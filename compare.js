const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

// Search Json data
const searchDb = async text => {
  //   const res = await fetch("./data/data.json");
  const res = await fetch("./data/laboratory.geojson");
  const datas = await res.json();
  const dataArray = [];
  let latlng = "";
  datas.features.forEach(feat => {
    // console.log(feat.properties);
    feat.properties.latitude = feat.properties.latitude.toString();
    feat.properties.longitude = feat.properties.longitude.toString();
    console.log(feat.properties.latitude);
    dataArray.push(feat.properties);
  });
  const props = datas.features; //an array of
  console.log(dataArray);
  let matches = dataArray.filter(data => {
    const regEx = new RegExp(`^${text}`, "gi");
    const regExLat = Number(text);

    console.log(data);

    if (Number(text)) {
      console.log(`${data.latitude},${data.longitude}`);
      latlng = `${data.latitude},${data.longitude}`;
    }

    return data.name.match(regEx) || latlng.match(regEx);
    // data.name.match(regEx) || data.lat.match(regEx);
  });

  if (text.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }
  console.log(matches);
  outputResult(matches);
};

const outputResult = matches => {
  if (matches.length > 0) {
    const result = matches
      .map(
        match => `
            <div class="search-res card card-body mb-1">
                <h4>${match.name}</h4>
                <small class="text-primary">${match.latitude}, ${match.longitude}</small>
            </div>
        `
      )
      .join("");

    matchList.innerHTML = result;
  }
};

search.addEventListener("input", () => searchDb(search.value));
