// const clearListButton = document.getElementById("clearListButton");
const confirmModal = document.getElementById("confirmModal");
const confirmYes = document.getElementById("confirmYes");
const confirmNo = document.getElementById("confirmNo");

clearListButton.addEventListener("click", function () {
  // Pokaż niestandardowe okno dialogowe (modal)
  confirmModal.style.display = "block";
});

confirmYes.addEventListener("click", function () {
  // Kontynuuj odświeżaniewyczyśćProdukty("Makro"),
  wyczyśćProdukty("Apc"),
    wyczyśćProdukty("Farutex"),
    wyczyśćProdukty("Selgros"),
    wyczyśćProdukty("Chefs_culinar"),
    wyczyśćProdukty("Kuchnie_świata"),
    odswiezStrone();
  location.reload();
});

confirmNo.addEventListener("click", function () {
  // Zamknij niestandardowe okno dialogowe (modal)
  confirmModal.style.display = "none";
});
transition: transform 0.5s;
