(async function () {
  "use strict";
  const main = {};
  document.addEventListener("DOMContentLoaded", onLoad);
  async function onLoad() {
    await getData("travel_recommendation_api.json");
  }
  function getData(url) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => (main.data = data));
  }
  async function loadData(keyword) {
    const sectoin = document.querySelector("#search-result");
    const cards = [];
    sectoin.innerHTML = "";
    if (main.data == undefined || !keyword) {
      sectoin.innerHTML = "";
      return;
    } else if (keyword.toLowerCase().startsWith("bea")) {
      for (let i of main.data["beaches"]) {
        let card = new item(
          i["name"],
          i["imageUrl"],
          i["description"],
          i["id"]
        );
        cards.push(card);
      }
    } else if (keyword.toLowerCase().startsWith("temp")) {
      for (let i of main.data["temples"]) {
        let card = new item(
          i["name"],
          i["imageUrl"],
          i["description"],
          i["id"]
        );
        cards.push(card);
      }
    } else {
      try {
        for (let i of main.data["countries"]) {
          if (i["name"].toLowerCase().startsWith(keyword)) {
            for (let j of i["cities"]) {
              let card = new item(
                j["name"],
                j["imageUrl"],
                j["description"],
                i["id"]
              );
              cards.push(card);
            }
          }
        }
      } catch {
        // sectoin.innerHTML = "<p>Not Found!</p>";
      }
    }
    // const filtered = main.data["countries"].filter;
    if (cards.length != 0) {
      for (let i = 0; i < cards.length; i++) {
        sectoin.appendChild(cards[i].getCard());
      }
      return;
    }
    return;
  }
  const searchElement = document.querySelector("#search-element");
  const searchBtn = document.querySelector("#search-btn");
  const clearBtn = document.querySelector("#clear-btn");
  searchElement.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      loadData(searchElement.value);
    }
  });
  clearBtn.addEventListener("click", (e) => {
    searchElement.value = "";
    loadData();
  });
  searchBtn.addEventListener("click", (e) => {
    console.log(searchElement.value);
    loadData(searchElement.value);
  });
})();
class item {
  constructor(title, imgUrl, description, id) {
    this.title = title;
    this.imgUrl = imgUrl;
    this.description = description;
    this.id = id;

    this.card = document.createElement("div");
    this.card.className = "card";
    this.card.dataset.id = this.id;

    this.card.innerHTML = `
          <img
            src="${this.imgUrl}"
            alt=""
          />
          <div class="card-body">
            <h3>${this.title}</h3>
            <p>
            ${this.description}
            </p>
            <button class="btn">Visit</button>
          </div>
    `;
  }
  getCard() {
    return this.card;
  }
}
