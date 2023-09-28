function getItemCountsFromFirebase() {
  // Uzyskaj referencję do gałęzi z `itemCounts` w bazie Firebase
  const itemCountsRef = firebase.database().ref("itemCounts");

  // Nasłuchuj zmian w danych
  itemCountsRef.on("value", (snapshot) => {
    // Pobierz dane ze Snapshot
    const data = snapshot.val();

    // Teraz `data` zawiera aktualny stan `itemCounts` z bazy Firebase
    // Możesz go wykorzystać do aktualizacji stanu na stronie lub w inny sposób
    console.log("Stan itemCounts z Firebase:", data);

    // Tutaj możesz umieścić kod do aktualizacji stanu na stronie
  });
}
