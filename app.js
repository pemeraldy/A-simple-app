const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

// Search Json data
const searchDb = async text => {
  const res = await fetch("./data/data.json");
  const datas = await res.json();
  console.log(typeof datas);
  let matches = datas.filter(data => {
    const regEx = new RegExp(`^${text}`, "gi");
    // const latlng = `${data.lat.match(regEx)},${data.long.match(regEx)} `;
    console.log(data);
    return data.name.match(regEx) || data.lat.match(regEx);
  });
  if (text.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }
  console.log(typeof matches, matches);
  outputResult(matches);
};

const outputResult = matches => {
  if (matches.length > 0) {
    const result = matches
      .map(
        match => `
            <div class="search-res card card-body mb-1">
                <h4>${match.name}</h4>
                <small class="text-primary">${match.lat}, ${match.long}</small>
            </div>
        `
      )
      .join("");

    matchList.innerHTML = result;
  }
};

search.addEventListener("input", () => searchDb(search.value));
