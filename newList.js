import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  get,
  getDatabase,
  ref,
  push,
  update,
  remove,
  onValue,
  child,
  set,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCbDhDiJsCSPGt4a30j5rQRQUjPmaxEZ_M",
  authDomain: "donutappjs-dcc83.firebaseapp.com",
  databaseURL:
    "https://donutappjs-dcc83-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "donutappjs-dcc83",
  storageBucket: "donutappjs-dcc83.appspot.com",
  messagingSenderId: "107684649248",
  appId: "1:107684649248:web:1f0e5d69a2165cf86b9f45",
  measurementId: "G-P2DWVH99KP",
};
const orientationMessage = document.getElementById("orientationMessage");

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

function checkOrientation() {
  if (isMobileDevice() && window.innerHeight < window.innerWidth) {
    // Strona jest otwarta na urządzeniu mobilnym i w trybie landscape
    orientationMessage.style.display = "block"; // Wyświetl komunikat
  } else {
    // Strona jest otwarta na komputerze lub w trybie portrait
    orientationMessage.style.display = "none"; // Ukryj komunikat
  }
}

// Wywołaj funkcję sprawdzania orientacji na starcie i przy zmianach orientacji
window.addEventListener("resize", checkOrientation);

// Inicjalne sprawdzenie orientacji
checkOrientation();

function odswiezStrone() {
  setTimeout(function () {
    location.reload();
  }, 1000);
}
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const dataRef = ref(database, "products");
//
const dbRef = ref(database, "lista/shopName/itemName");
onValue(dbRef, (snapshot) => {
  // Aktualizacja widoku w odpowiedzi na zmiany danych
  const data = snapshot.val();
  // Aktualizuj widok w każdym oknie przeglądarki
});

//

//

get(dataRef)
  .then((snapshot) => {
    const data = snapshot.val();
    displayData(data);
  })
  .catch((error) => {
    console.error("Error retrieving data:", error);
  });
let totalSum1 = 0;
let totalSum2 = 0;
let totalSum3 = 0;
let totalSum4 = 0;
let totalSum5 = 0;
let totalSum6 = 0;

function displayData(data) {
  const dataContainer = document.getElementById("nameContainer");
  const counterContainer1 = document.getElementById("nameContainer2");
  const counterContainer2 = document.getElementById("nameContainer3");
  const counterContainer3 = document.getElementById("nameContainer4");
  const counterContainer4 = document.getElementById("nameContainer5");
  const counterContainer5 = document.getElementById("nameContainer6");
  const counterContainer6 = document.getElementById("nameContainer7");
  const priceContainer1 = document.getElementById("price_paragraph1");
  const priceContainer2 = document.getElementById("price_paragraph2");
  const priceContainer3 = document.getElementById("price_paragraph3");
  const priceContainer4 = document.getElementById("price_paragraph4");
  const priceContainer5 = document.getElementById("price_paragraph5");
  const priceContainer6 = document.getElementById("price_paragraph6");

  //
  //
  /////// NOWE ZASYSANIE Z BAZY /////
  let html = "";
  let counter = 1;
  let lowestPriceIndex = -1;

  function setupFirebaseListeners() {
    const shopContainers = {
      Farutex: counterContainer1,
      Makro: counterContainer2,
      Kuchnie_świata: counterContainer3,
      Chefs_culinar: counterContainer4,
      Apc: counterContainer5,
      Selgros: counterContainer6,
    };

    for (const shopName in shopContainers) {
      const container = shopContainers[shopName];

      if (!container) continue;

      // Inicjalizacja Firebase i referencja do bazy dla danego sklepu
      const database = getDatabase();
      const listaRef = ref(database, `lista/${shopName}`);

      // Ustawienie nasłuchiwania na zmiany w referencji
      onValue(
        listaRef,
        (snapshot) => {
          const data = snapshot.val();
          if (!data) return;

          let html = "";

          // Iteracja po produktach w sklepie
          for (const productName in data) {
            const productCount = data[productName];

            // Tutaj możesz dostosować wygląd pojedynczego produktu
            html += `<div class="product">
                   <span class="productName" >${productName}</span>
                   <span class="productCount" style="float:right">${productCount}</span>
                 </div>`;
          }

          // Ustawienie HTML w kontenerze dla danego sklepu
          container.innerHTML = html;
        },
        (error) => {
          console.error(
            `Błąd podczas nasłuchiwania na zmiany w bazie dla ${shopName}:`,
            error
          );
        }
      );
    }
  }

  // Wywołanie funkcji do ustawienia nasłuchiwania na zmiany w bazie
  setupFirebaseListeners();

  //// KONIEC NOWEGO ///////
  //
  //

  function getLowestPrice(item) {
    const prices = [
      item.Farutex,
      item.Kuchnie_świata,
      item.Makro,
      item.Chefs_culinar,
      item.Apc,
      item.Selgros,
    ];
    const priceLabels = [
      "Farutex",
      "Kuchnie_świata",
      "Makro",
      "Chefs_culinar",
      "Apc",
      "Selgros",
    ];
    let lowestPrice = Infinity;
    let lowestPriceIndex = -1;

    for (let i = 0; i < prices.length; i++) {
      if (prices[i] !== undefined && parseFloat(prices[i]) < lowestPrice) {
        lowestPrice = parseFloat(prices[i]);
        lowestPriceIndex = i;
      }
    }

    if (lowestPriceIndex !== -1) {
      const shopName = priceLabels[lowestPriceIndex];
      if (lowestPriceIndex === 0) {
        return {
          container: counterContainer1,
          price: priceContainer1,
          lowestPrice: lowestPrice,
          lowestPriceIndex: lowestPriceIndex,
          shopName: shopName,
        };
      } else if (lowestPriceIndex === 1) {
        return {
          container: counterContainer3,
          price: priceContainer3,
          lowestPrice: lowestPrice,
          lowestPriceIndex: lowestPriceIndex,
          shopName: shopName,
        };
      } else if (lowestPriceIndex === 2) {
        return {
          container: counterContainer2,
          price: priceContainer2,
          lowestPrice: lowestPrice,
          lowestPriceIndex: lowestPriceIndex,
          shopName: shopName,
        };
      } else if (lowestPriceIndex === 3) {
        return {
          container: counterContainer4,
          price: priceContainer4,
          lowestPrice: lowestPrice,
          lowestPriceIndex: lowestPriceIndex,
          shopName: shopName,
        };
      } else if (lowestPriceIndex === 4) {
        return {
          container: counterContainer5,
          price: priceContainer5,
          lowestPrice: lowestPrice,
          lowestPriceIndex: lowestPriceIndex,
          shopName: shopName,
        };
      } else if (lowestPriceIndex === 5) {
        return {
          container: counterContainer6,
          price: priceContainer6,
          lowestPrice: lowestPrice,
          lowestPriceIndex: lowestPriceIndex,
          shopName: shopName,
        };
      }
    }

    return {
      container: null,
      lowestPrice: lowestPrice,
      lowestPriceIndex: lowestPriceIndex,
      shopName: null,
    };
  }

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const item = data[key];
      if (item.AAProduct_name) {
        const itemName =
          item.AAProduct_name.charAt(0).toUpperCase() +
          item.AAProduct_name.slice(1);
        const { message, container } = getLowestPrice(item);

        html += `<div id="${counter}" class="${
          item.Category
        }" style="margin: 10px 0 0 0;  display: flex; justify-content: space-between;">
                  <span id="item-${key}" style="width:58%; height: 29px; border-bottom: 1px lightgrey solid; font-family:arial; font-size: 12px; margin-bottom: 3px">
                    <span >${itemName.charAt(0)}</span>${itemName.slice(1)}
                  </span>
                  
                  <div id="buttons" style="display: flex; justify-content: right">
                    <button id="minus-${counter}" style="background-color: #f8d62d; color:black; border-radius: 5px; width: 24px; height:24px; margin: 0 2px" class="itemButton-" data-key="${key}">-</button>
                    <button id="plus-${counter}" style="background-color: #f8d62d; color:black; border-radius: 5px; width: 24px; height:24px; margin: 0 2px" class="itemButton+" data-key="${key}">+</button>
                    <button id="plus5-${counter}" style="background-color: #f8d62d; color:black; border-radius: 5px; width: 32px; height:24px; margin: 0 2px; " class="itemButton+" data-key="${key}">+5</button>
                    <button id="clear-${counter}" style="background-color: #ff2121d1; color:black; border-radius: 5px; width: 32px; height:24px; margin: 0 2px 0 5px" class="itemButton+" data-key="${key}"><img src="trashIcon.png" style="max-height: 18px;  "alt=""></button>
                  </div>
                </div>`;
        counter++;
      }
    }
  }

  dataContainer.innerHTML = html;

  const itemCounts = {};
  function getShopName(item) {
    // Tworzymy tablicę z dostępnymi cenami w różnych sklepach
    const prices = [
      item.Makro,
      item.Farutex,
      item.Kuchnie_świata,
      item.Apc,
      item.Selgros,
      item.Chefs_culinar,
    ];

    // Tworzymy tablicę z nazwami sklepów odpowiadającymi cenom
    const shopNames = [
      "Makro",
      "Farutex",
      "Kuchnie_świata",
      "Apc",
      "Selgros",
      "Chefs_culinar",
    ];

    let lowestPrice = Infinity;
    let lowestPriceIndex = -1;

    // Szukamy najniższej ceny i zapamiętujemy indeks
    for (let i = 0; i < prices.length; i++) {
      if (prices[i] !== undefined && parseFloat(prices[i]) < lowestPrice) {
        lowestPrice = parseFloat(prices[i]);
        lowestPriceIndex = i;
      }
    }

    // Jeśli znaleziono najniższą cenę, zwracamy nazwę sklepu
    if (lowestPriceIndex !== -1) {
      return shopNames[lowestPriceIndex];
    }

    // Jeśli nie znaleziono najniższej ceny, zwracamy null
    return null;
  }
  function addEmptyFlagToShop(shopName) {
    const database = getDatabase();
    const listaRef = ref(database, `lista/${shopName}`);

    // Użyj funkcji `update`, aby dodać węzeł `isEmpty` do sklepu
    const updates = {};
    updates[` `] = " ";

    // Zaktualizuj bazę danych Firebase
    update(listaRef, updates)
      .then(() => {
        console.log(`Dodano węzeł 'isEmpty: true' do sklepu ${shopName}`);
      })
      .catch((error) => {
        console.error(
          `Błąd podczas dodawania węzła 'isEmpty: true' do sklepu ${shopName}:`,
          error
        );
      });
  }
  function addButtonListeners(
    buttonPlus,
    buttonPlus5,
    buttonMinus,
    buttonClear,
    itemName
  ) {
    buttonPlus.addEventListener("click", function () {
      if (!itemCounts[itemName]) {
        itemCounts[itemName] = 1;
      } else {
        itemCounts[itemName]++;
      }

      const { container, price, lowestPrice } = getLowestPrice(data[itemName]);

      if (container) {
        const counterElement = document.getElementById(`counter-${itemName}`);
        if (counterElement) {
        } else {
          addToFirebase(itemName, itemCounts[itemName]);
        }

        const itemPrice = lowestPrice * itemCounts[itemName];
        console.log(itemPrice);

        price.textContent = itemPrice; // Ta linia drukuje cenę za drugim

        if (container === counterContainer1) {
          totalSum1 = selectedProducts.Farutex.reduce((sum, itemName) => {
            const item = data[itemName];
            const { lowestPrice } = getLowestPrice(item);
            return sum + lowestPrice * itemCounts[itemName];
          }, 0);
          priceContainer1.innerHTML = totalSum1;
        } else if (container === counterContainer2) {
          totalSum2 = selectedProducts.Makro.reduce((sum, itemName) => {
            const item = data[itemName];
            const { lowestPrice } = getLowestPrice(item);
            return sum + lowestPrice * itemCounts[itemName];
          }, 0);
          priceContainer2.innerHTML = totalSum2;
        } else if (container === counterContainer3) {
          totalSum3 = selectedProducts.Kuchnie_świata.reduce(
            (sum, itemName) => {
              const item = data[itemName];
              const { lowestPrice } = getLowestPrice(item);
              return sum + lowestPrice * itemCounts[itemName];
            },
            0
          );
          priceContainer3.innerHTML = totalSum3;
        } else if (container === counterContainer4) {
          totalSum4 = selectedProducts.Chefs_culinar.reduce((sum, itemName) => {
            const item = data[itemName];
            const { lowestPrice } = getLowestPrice(item);
            return sum + lowestPrice * itemCounts[itemName];
          }, 0);
          priceContainer4.innerHTML = totalSum4;
        } else if (container === counterContainer5) {
          totalSum5 = selectedProducts.Apc.reduce((sum, itemName) => {
            const item = data[itemName];
            const { lowestPrice } = getLowestPrice(item);
            return sum + lowestPrice * itemCounts[itemName];
          }, 0);
          priceContainer5.innerHTML = totalSum5;
        } else if (container === counterContainer6) {
          totalSum6 = selectedProducts.Selgros.reduce((sum, itemName) => {
            const item = data[itemName];
            const { lowestPrice } = getLowestPrice(item);
            return sum + lowestPrice * itemCounts[itemName];
          }, 0);
          priceContainer6.innerHTML = totalSum6;
        }

        const lowestPriceElement = getLowestPriceElement(lowestPriceIndex);
        if (lowestPriceElement) {
          lowestPriceElement.textContent = `${itemPrice} zł`;
        }

        //
        //// NOWE DODAWANIE DO FIREBASE //
        //
        //
        //
        function addToFirebase(itemName) {
          // Uzyskujemy nazwę sklepu na podstawie danych produktu
          const shopName = getShopName(data[itemName]);

          // Inicjalizacja Firebase i referencja do bazy
          const database = getDatabase();
          const listaRef = ref(database, `lista/${shopName}/${itemName}`);

          addEmptyFlagToShop(shopName);
          // Pobranie istniejącej ilości (jeśli istnieje)
          get(listaRef)
            .then((snapshot) => {
              const existingCount = snapshot.val() || 0;
              const updatedCount = existingCount + 1; // Increment the count

              // Aktualizacja danych w bazie Firebase
              set(listaRef, updatedCount) // Use set to update the count
                .then(() => {
                  console.log(
                    `Dodano 1 ${itemName} do bazy danych sklepu ${shopName}.`
                  );

                  // Tutaj możesz dodać kod do aktualizacji zawartości paragrafów shopName
                  // Na przykład:
                  const shopNameElement = document.querySelector(
                    `#nameContainer${shopName} p.shopName`
                  );
                  if (shopNameElement) {
                    // Jeśli istnieje, to zaktualizuj zawartość
                    shopNameElement.textContent = shopName;
                  }
                })
                .catch((error) => {
                  console.error(
                    `Błąd podczas dodawania ${itemName} do bazy danych sklepu ${shopName}:`,
                    error
                  );
                });
            })
            .catch((error) => {
              console.error(
                `Błąd podczas pobierania danych z bazy danych sklepu ${shopName}:`,
                error
              );
            });
        }

        updateSelectedProducts(itemName);
        addToFirebase(itemName, itemCounts);
      }
    });

    // KONIEC ////

    buttonPlus5.addEventListener("click", function () {
      if (!itemCounts[itemName]) {
        itemCounts[itemName] = 1 * 5;
        console.log(itemCounts);
        const { container, price, lowestPrice } = getLowestPrice(
          data[itemName]
        );
        if (container) {
          container.innerHTML += `<div style="margin: 10px 0 0 0; width: 100%; font-size:10px; font-family:arial" id="counter-${itemName}">${itemName} <span style="float:right">${itemCounts[itemName]} kg</span></div>`;
          price.innerHTML += lowestPrice * itemCounts[itemName];
        }

        const lowestPriceElement = getLowestPriceElement(lowestPriceIndex);
        if (lowestPriceElement) {
          lowestPriceElement.textContent = `${
            lowestPrice * itemCounts[itemName]
          } zł`;
        }
      } else {
        itemCounts[itemName] += 5;

        const { price, lowestPrice } = getLowestPrice(data[itemName]);
        price.innerHTML = lowestPrice * itemCounts[itemName];

        const lowestPriceElement = getLowestPriceElement(lowestPriceIndex);
        if (lowestPriceElement) {
          lowestPriceElement.textContent = `${
            lowestPrice * itemCounts[itemName]
          } zł`;
        }
      }

      function addToFirebase5(itemName) {
        // Uzyskujemy nazwę sklepu na podstawie danych produktu
        const shopName = getShopName(data[itemName]);

        // Inicjalizacja Firebase i referencja do bazy
        const database = getDatabase();
        const listaRef = ref(database, `lista/${shopName}/${itemName}`);
        addEmptyFlagToShop(shopName);
        // Pobranie istniejącej ilości (jeśli istnieje)
        get(listaRef)
          .then((snapshot) => {
            const existingCount = snapshot.val() || 0;
            const updatedCount = existingCount + 5; // Increment the count

            // Aktualizacja danych w bazie Firebase
            set(listaRef, updatedCount) // Use set to update the count
              .then(() => {
                console.log(
                  `Dodano 5 ${itemName} do bazy danych sklepu ${shopName}.`
                );
              })
              .catch((error) => {
                console.error(
                  `Błąd podczas dodawania ${itemName} do bazy danych sklepu ${shopName}:`,
                  error
                );
              });
          })
          .catch((error) => {
            console.error(
              `Błąd podczas pobierania danych z bazy danych sklepu ${shopName}:`,
              error
            );
          });
      }
      updateSelectedProducts(itemName);
      addToFirebase5(itemName, itemCounts);
    });

    buttonClear.addEventListener("click", function () {
      if (itemCounts[itemName] >= 0) {
        const counterToUpdate = document.getElementById(`counter-${itemName}`);
        const { price, lowestPrice } = getLowestPrice(data[itemName]);

        if (selectedProducts.Farutex.includes(itemName)) {
          totalSum1 -= lowestPrice * itemCounts[itemName];
        } else if (selectedProducts.Makro.includes(itemName)) {
          totalSum2 -= lowestPrice * itemCounts[itemName];
        } else if (selectedProducts.Kuchnie_świata.includes(itemName)) {
          totalSum3 -= lowestPrice * itemCounts[itemName];
        } else if (selectedProducts.Chefs_culinar.includes(itemName)) {
          totalSum4 -= lowestPrice * itemCounts[itemName];
        } else if (selectedProducts.Apc.includes(itemName)) {
          totalSum5 -= lowestPrice * itemCounts[itemName];
        } else if (selectedProducts.Selgros.includes(itemName)) {
          totalSum6 -= lowestPrice * itemCounts[itemName];
        }

        itemCounts[itemName] = 0;
        function removeItemFromFirebase(itemName) {
          //       // Uzyskujemy nazwę sklepu na podstawie danych produktu
          const shopName = getShopName(data[itemName]);

          // Inicjalizacja Firebase i referencja do bazy
          const database = getDatabase();
          const listaRef = ref(database, `lista/${shopName}/${itemName}`);

          // Usunięcie elementu z bazy Firebase
          remove(listaRef)
            .then(() => {
              console.log(
                `Usunięto ${itemName} z bazy danych sklepu ${shopName}.`
              );

              // Po usunięciu elementu z Firebase, usuń także element z DOM, jeśli istnieje
              if (counterToUpdate) {
                counterToUpdate.remove();
              }
            })
            .catch((error) => {
              console.error(
                `Błąd podczas usuwania ${itemName} z bazy danych sklepu ${shopName}:`,
                error
              );
            });
        }
        // Sprawdź, czy to ostatni produkt w sklepie
        const shopName = getShopName(data[itemName]);
        const database = getDatabase();
        const listaRef = ref(database, `lista/${shopName}`);

        get(listaRef)
          .then((snapshot) => {
            const shopData = snapshot.val();
            if (shopData) {
              // Jeśli sklep zawiera jeszcze inne produkty, usuń tylko ten produkt
              if (Object.keys(shopData).length > 1) {
                removeItemFromFirebase(itemName);
              } else {
                // Jeśli to ostatni produkt, pozostaw pusty węzeł sklepu w bazie danych
                removeItemFromFirebase(itemName);
                set(ref(database, `lista/${shopName}`), null);
              }
            }
          })
          .catch((error) => {
            console.error("Error checking shop data:", error);
          });
      }
    });

    buttonMinus.addEventListener("click", function () {
      if (!itemCounts[itemName]) {
        itemCounts[itemName] = 0;
      }

      if (itemCounts[itemName] > 0) {
        const counterToUpdate = document.getElementById(`counter-${itemName}`);

        itemCounts[itemName]--;

        const { price, lowestPrice } = getLowestPrice(data[itemName]);
        price.innerHTML = lowestPrice * itemCounts[itemName];

        const lowestPriceElement = getLowestPriceElement(lowestPriceIndex);
        if (lowestPriceElement) {
          lowestPriceElement.textContent = `${
            lowestPrice * itemCounts[itemName]
          } zł`;
        }
        function addToFirebaseMinus(itemName) {
          // Uzyskujemy nazwę sklepu na podstawie danych produktu
          const shopName = getShopName(data[itemName]);

          // Inicjalizacja Firebase i referencja do bazy
          const database = getDatabase();
          const listaRef = ref(database, `lista/${shopName}/${itemName}`);

          // Pobranie istniejącej ilości (jeśli istnieje)
          get(listaRef)
            .then((snapshot) => {
              const existingCount = snapshot.val() || 0;
              const updatedCount = existingCount - 1; // Increment the count
              // Aktualizacja danych w bazie Firebase
              set(listaRef, updatedCount) // Use set to update the count
                .then(() => {
                  console.log(
                    `Usunięto 1 ${itemName} z bazy danych sklepu ${shopName}. ${existingCount} ${updatedCount}`
                  );
                  if (updatedCount < 1) {
                    // Usuń element HTML, gdy liczba produktów wynosi zero
                    remove(listaRef)
                      .then(() => {
                        console.log(
                          `Usunięto ${itemName} z bazy danych sklepu ${shopName}.`
                        );

                        // Po usunięciu elementu z Firebase, usuń także element z DOM, jeśli istnieje
                        if (counterToUpdate) {
                          counterToUpdate.remove();
                        }
                      })
                      .catch((error) => {
                        console.error(
                          `Błąd podczas usuwania ${itemName} z bazy danych sklepu ${shopName}:`,
                          error
                        );
                      });
                  }
                })
                .catch((error) => {
                  console.error(
                    `Błąd podczas usuwania ${itemName} z bazy danych sklepu ${shopName}:`,
                    error
                  );
                });
            })
            .catch((error) => {
              console.error(
                `Błąd podczas pobierania danych z bazy danych sklepu ${shopName}:`,
                error
              );
            });
        }

        updateSelectedProducts(itemName);
        addToFirebaseMinus(itemName, itemCounts);
      }
    });
  }
  const selectedProducts = {
    Farutex: [],
    Makro: [],
    Kuchnie_świata: [],
    Chefs_culinar: [],
    Apc: [],
    Selgros: [],
  };

  function updateSelectedProducts(itemName) {
    const item = data[itemName];
    const { container, shopName } = getLowestPrice(item);

    if (shopName) {
      if (itemCounts[itemName] === 0) {
        const index = selectedProducts[shopName].indexOf(itemName);
        if (index !== -1) {
          selectedProducts[shopName].splice(index, 1);
        }
      } else if (!selectedProducts[shopName].includes(itemName)) {
        selectedProducts[shopName].push(itemName);
      }

      calculateTotalSums(selectedProducts);
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(selectedProducts)
      );
    }
  }

  function calculateTotalSums(selectedProducts) {
    totalSum1 = selectedProducts.Farutex.reduce((sum, itemName) => {
      const item = data[itemName];
      const { lowestPrice } = getLowestPrice(item);
      return sum + lowestPrice * itemCounts[itemName];
    }, 0);
    totalSum2 = selectedProducts.Makro.reduce((sum, itemName) => {
      const item = data[itemName];
      const { lowestPrice } = getLowestPrice(item);
      return sum + lowestPrice * itemCounts[itemName];
    }, 0);
    totalSum3 = selectedProducts.Kuchnie_świata.reduce((sum, itemName) => {
      const item = data[itemName];
      const { lowestPrice } = getLowestPrice(item);
      return sum + lowestPrice * itemCounts[itemName];
    }, 0);
    totalSum4 = selectedProducts.Chefs_culinar.reduce((sum, itemName) => {
      const item = data[itemName];
      const { lowestPrice } = getLowestPrice(item);
      return sum + lowestPrice * itemCounts[itemName];
    }, 0);
    totalSum5 = selectedProducts.Apc.reduce((sum, itemName) => {
      const item = data[itemName];
      const { lowestPrice } = getLowestPrice(item);
      return sum + lowestPrice * itemCounts[itemName];
    }, 0);
    totalSum6 = selectedProducts.Selgros.reduce((sum, itemName) => {
      const item = data[itemName];
      const { lowestPrice } = getLowestPrice(item);
      return sum + lowestPrice * itemCounts[itemName];
    }, 0);

    if (totalSum1 < 500) {
      priceContainer1.style.color = "red";
    } else {
      priceContainer1.style.color = "";
    }
    if (totalSum2 < 500) {
      priceContainer2.style.color = "red";
    } else {
      priceContainer2.style.color = "";
    }
    if (totalSum3 < 500) {
      priceContainer3.style.color = "red";
    } else {
      priceContainer3.style.color = "";
    }
    if (totalSum4 < 500) {
      priceContainer4.style.color = "red";
    } else {
      priceContainer4.style.color = "";
    }
    if (totalSum5 < 500) {
      priceContainer5.style.color = "red";
    } else {
      priceContainer5.style.color = "";
    }
    if (totalSum6 < 500) {
      priceContainer6.style.color = "red";
    } else {
      priceContainer6.style.color = "";
    }

    priceContainer1.innerHTML = totalSum1.toFixed(2);
    priceContainer2.innerHTML = totalSum2.toFixed(2);
    priceContainer3.innerHTML = totalSum3.toFixed(2);
    priceContainer4.innerHTML = totalSum4.toFixed(2);
    priceContainer5.innerHTML = totalSum5.toFixed(2);
    priceContainer6.innerHTML = totalSum6.toFixed(2);
  }

  function getLowestPriceElement(index) {
    if (index === 0) {
      return document.getElementById("price_paragraph1");
    } else if (index === 1) {
      return document.getElementById("price_paragraph2");
    } else if (index === 2) {
      return document.getElementById("price_paragraph3");
    } else if (index === 3) {
      return document.getElementById("price_paragraph4");
    } else if (index === 4) {
      return document.getElementById("price_paragraph5");
    } else if (index === 5) {
      return document.getElementById("price_paragraph6");
    }
    return null;
  }

  for (let i = 1; i < counter; i++) {
    const buttonPlus = document.getElementById(`plus-${i}`);
    const buttonPlus5 = document.getElementById(`plus5-${i}`);
    const buttonMinus = document.getElementById(`minus-${i}`);
    const buttonClear = document.getElementById(`clear-${i}`);
    const itemName = buttonPlus.getAttribute("data-key");

    addButtonListeners(
      buttonPlus,
      buttonPlus5,
      buttonMinus,
      buttonClear,
      itemName
    );
  }
  const buttonSummary = document.getElementById("ListSummary");
  buttonSummary.addEventListener("click", function () {
    generateSummary(selectedProducts);
  });
  ////////////////////////////////////////////////////////////////////
  //czyszczenie bazy "lista" DO ZROBIENIA ŻEBY DZIAŁAŁ LIVE
  //
  //
  function wyczyśćProdukty(shopName) {
    // Inicjalizacja Firebase i referencja do bazy
    const database = getDatabase(); // Inicjalizacja Firebase Database
    const sklepRef = ref(database, `lista/${shopName}`);

    // Sprawdzamy, czy zakładka "name" istnieje w danym sklepie
    get(child(sklepRef, "name"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(
            `Nie można usunąć zakładki "name" w sklepie ${shopName}.`
          );
        } else {
          // Usuwamy całą część danych sklepu, jeśli zakładka "name" nie istnieje
          remove(sklepRef)
            .then(() => {
              console.log(`Usunięto dane sklepu ${shopName}.`);
            })
            .catch((error) => {
              console.error(
                `Błąd podczas usuwania danych sklepu ${shopName}:`,
                error
              );
            });
        }
      })
      .catch((error) => {
        console.error(
          `Błąd podczas sprawdzania zakładki "name" w sklepie ${sklepName}:`,
          error
        );
      });
  }
  //
  //
  //button czyszczący bazę DO ZROBIENIA ŻEBY DZIAŁAŁ LIVE ///////
  //
  //
  //
  const clearListButton1 = document.getElementById("clearList");
  const clearListButton2 = document.getElementById("MobileClearList");
  const confirmModal = document.getElementById("confirmModal");
  const confirmYes = document.getElementById("confirmYes");
  const confirmNo = document.getElementById("confirmNo");

  clearListButton1.addEventListener("click", function () {
    confirmModal.style.display = "block";
  });

  confirmYes.addEventListener("click", function () {
    wyczyśćProdukty("Makro"),
      wyczyśćProdukty("Apc"),
      wyczyśćProdukty("Farutex"),
      wyczyśćProdukty("Selgros"),
      wyczyśćProdukty("Chefs_culinar"),
      wyczyśćProdukty("Kuchnie_świata"),
      odswiezStrone();
  });

  confirmNo.addEventListener("click", function () {
    setTimeout(function () {
      confirmModal.style.display = "none";
    }, 500);
  });
  clearListButton2.addEventListener("click", function () {
    confirmModal.style.display = "block";
  });
  //
  //////////////////////////////////////////////////////////
  //
  //
  //
}

const $returnHomeButton = document.getElementById("returnToHome");
$returnHomeButton.addEventListener("click", returnToHome);

// mobile version return button
const $returnHomeButton2 = document.getElementById("returnToHome2");
$returnHomeButton2.addEventListener("click", returnToHome);

function returnToHome() {
  window.location.href = "index.html";
}

const $editProducts = document.getElementById("editProducts");
$editProducts.addEventListener("click", editProducts);

function editProducts() {
  window.location.href = "editProduct.html";
}

const $addProduct = document.getElementById("addProduct");
$addProduct.addEventListener("click", addProduct);

function addProduct() {
  window.location.href = "addProduct.html";
}

//button hiding products in mobile
const $hideProductList = document.getElementById("hideProdShowList");
$hideProductList.addEventListener("click", hidingProdShowingList);

function hidingProdShowingList() {
  document.getElementById("productsContainer").style = "display: none";
  document.getElementById("productsList").style = "display: none";
  document.getElementById("shoppingListContainer").style.cssText =
    "display: flex;  max-width: 100%; max-height: 90vh margin: 10px 0";
  document.getElementById("shoppingList").style.cssText = "margin: 10px";
  document.getElementById("nameContainer2").style.cssText =
    "height:45%; width: 100%";
  document.getElementById("nameContainer3").style.cssText =
    "height:45%; width: 100%";
  document.getElementById("nameContainer4").style.cssText =
    "height:45%; width: 100%";
  document.getElementById("nameContainer5").style.cssText =
    "height:45%; width: 100%";
  document.getElementById("nameContainer6").style.cssText =
    "height:45%; width: 100%";
  document.getElementById("nameContainer7").style.cssText =
    "height:45%; width: 100%";
}

const $showProductList = document.getElementById("hideListShowProd");
$showProductList.addEventListener("click", hidingListShowingProd);

function hidingListShowingProd() {
  document.getElementById("productsContainer").style = "display: flex";
  document.getElementById("productsList").style = "display: flex";
  document.getElementById("shoppingListContainer").style.cssText =
    "display: none";
}

const buttonAllProducts = document.getElementById("allProducts");
const buttonMeat = document.getElementById("meat");
const buttonVegetables = document.getElementById("vegetables");
const buttonDairy = document.getElementById("dairy");
const buttonFruits = document.getElementById("fruits");
const buttonFish = document.getElementById("fish");
const buttonPreserves = document.getElementById("preserves");
const buttonLoose = document.getElementById("loose");
const buttonAcc = document.getElementById("acc");
const buttonFrost = document.getElementById("frost");
const buttonSummary = document.getElementById("ListSummary");

const toggleAll = function () {
  let container = document.getElementById("nameContainer");
  let elements = container.children;

  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    if (!element.classList.contains("fuck")) {
      element.style.display = "flex";
    } else {
      element.style.display = "block";
    }
  }
};

const toggleMeat = function () {
  let container = document.getElementById("nameContainer");
  let elements = container.children;

  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    if (!element.classList.contains("mięso")) {
      element.style.display = "none";
    } else {
      element.style.display = "flex";
    }
  }
};
const toggleDairy = function () {
  let container = document.getElementById("nameContainer");
  let elements = container.children;

  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    if (!element.classList.contains("nabiał")) {
      element.style.display = "none";
    } else {
      element.style.display = "flex";
    }
  }
};

const toggleVegetables = function () {
  let container = document.getElementById("nameContainer");
  let elements = container.children;

  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    if (!element.classList.contains("warzywa")) {
      element.style.display = "none";
    } else {
      element.style.display = "flex";
    }
  }
};
const toggleFruits = function () {
  let container = document.getElementById("nameContainer");
  let elements = container.children;

  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    if (!element.classList.contains("owoce")) {
      element.style.display = "none";
    } else {
      element.style.display = "flex";
    }
  }
};
const toggleFish = function () {
  let container = document.getElementById("nameContainer");
  let elements = container.children;

  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    if (!element.classList.contains("ryby")) {
      element.style.display = "none";
    } else {
      element.style.display = "flex";
    }
  }
};
const togglePreserves = function () {
  let container = document.getElementById("nameContainer");
  let elements = container.children;

  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    if (!element.classList.contains("przetwory")) {
      element.style.display = "none";
    } else {
      element.style.display = "flex";
    }
  }
};
const toggleLoose = function () {
  let container = document.getElementById("nameContainer");
  let elements = container.children;

  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    if (!element.classList.contains("sypkie")) {
      element.style.display = "none";
    } else {
      element.style.display = "flex";
    }
  }
};
const toggleAcc = function () {
  let container = document.getElementById("nameContainer");
  let elements = container.children;

  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    if (!element.classList.contains("akcesoria")) {
      element.style.display = "none";
    } else {
      element.style.display = "flex";
    }
  }
};
const toggleFrost = function () {
  let container = document.getElementById("nameContainer");
  let elements = container.children;

  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    if (!element.classList.contains("mrożonki")) {
      element.style.display = "none";
    } else {
      element.style.display = "flex";
    }
  }
};
buttonAllProducts.addEventListener("click", toggleAll);
buttonMeat.addEventListener("click", toggleMeat);
buttonVegetables.addEventListener("click", toggleVegetables);
buttonDairy.addEventListener("click", toggleDairy);
buttonFruits.addEventListener("click", toggleFruits);
buttonFish.addEventListener("click", toggleFish);
buttonPreserves.addEventListener("click", togglePreserves);
buttonLoose.addEventListener("click", toggleLoose);
buttonAcc.addEventListener("click", toggleAcc);
buttonFrost.addEventListener("click", toggleFrost);

function generateSummary(selectedProducts) {
  const summaryContainer = document.getElementById("summaryContainer");
  let summaryHtml = "<h2>Podsumowanie:</h2>";

  const shopOrder = [
    "Farutex",
    "Kuchnie_świata",
    "Makro",
    "Chefs_culinar",
    "Apc",
    "Selgros",
  ];

  for (const shopName of shopOrder) {
    const products = selectedProducts[shopName];
    if (products.length > 0) {
      summaryHtml += `<div class="summaryShop"><p><strong>${shopName}:</strong></p></div`;
      products.forEach((product) => {
        summaryHtml += `<p>${product}</p>`;
      });
    }
  }

  if (summaryHtml === "<h2>Podsumowanie:</h2>") {
    summaryHtml += "<p>Nic nie wybrałeś.</p>";
  }

  summaryHtml += `<div class="summaryShop"><p><strong>Farutex: ${totalSum1.toFixed(
    2
  )} zł</strong></p></div>`;
  summaryHtml += `<div class="summaryShop"><p><strong>Makro: ${totalSum2.toFixed(
    2
  )} zł</strong></p></div>`;
  summaryHtml += `<div class="summaryShop"><p><strong>Kuchnie świata: ${totalSum3.toFixed(
    2
  )} zł</strong></p></div>`;
  summaryHtml += `<div class="summaryShop"><p><strong>Chefs_culinar: ${totalSum4.toFixed(
    2
  )} zł</strong></p></div>`;
  summaryHtml += `<div class="summaryShop"><p><strong>Apc agra: ${totalSum5.toFixed(
    2
  )} zł</strong></p></div>`;
  summaryHtml += `<div class="summaryShop"><p><strong>Selgros: ${totalSum6.toFixed(
    2
  )} zł</strong></p></div>`;
}

/////////// czytanie listy z firebase próba ///////
