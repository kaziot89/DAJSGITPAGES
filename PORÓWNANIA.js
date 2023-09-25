function updateUI() {
  // Pobierz referencję do elementu, w którym chcesz wyświetlić listę produktów
  const productListElement = document.getElementById("productsList");

  // Wyczyść zawartość elementu
  productListElement.innerHTML = "";

  // Iteruj przez produkty w lokalnym stanie (itemCounts) lub pobierz je z Firebase, jeśli są dostępne
  for (const itemName in itemCounts) {
    if (itemCounts.hasOwnProperty(itemName)) {
      const itemCount = itemCounts[itemName];

      // Tutaj możesz dostosować wygląd pojedynczego produktu
      const productHTML = `<div class="product">
                               <span class="productName">${itemName}</span>
                               <span class="productCount" style="float:right">${itemCount} kg</span>
                             </div>`;

      // Dodaj wygenerowany HTML do listy produktów
      productListElement.innerHTML += productHTML;
    }
  }
}
