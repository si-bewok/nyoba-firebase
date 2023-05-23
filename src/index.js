import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, update, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDVAXLL9X7AY2prTxpXKuUQZ7EhsuPJ9XM",
  authDomain: "learn-and-explore-54478.firebaseapp.com",
  databaseURL: "https://learn-and-explore-54478-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "learn-and-explore-54478",
  storageBucket: "learn-and-explore-54478.appspot.com",
  messagingSenderId: "891306912975",
  appId: "1:891306912975:web:6403872d3ed29b081f1bba",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const db = getDatabase(app);

// Produk Reference
const produkRef = ref(db, "/produk");

// Get All Produk (Listener)
let produk;

onValue(produkRef, (snapshot) => {
  produk = snapshot.val();
  console.log(produk);
});

// Add New Produk
const addForm = document.querySelector(".add");
addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newProduk = {
    nama: addForm.produk.value,
    merek: addForm.merek.value,
    jumlah: parseInt(addForm.jumlah.value),
  };

  update(ref(db, "/produk/" + produk.length), newProduk)
    .then(() => addForm.reset())
    .catch((err) => console.log("Create Error : ", err.message));
});

// Update Produk
const updateForm = document.querySelector(".update");
updateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const updateProduk = {
    jumlah: parseInt(updateForm.jumlah.value),
  };

  update(ref(db, "/produk/" + updateForm.id.value), updateProduk)
    .then(() => updateForm.reset())
    .catch((err) => console.log("Update Error : ", err.message));
});

// Delete Produk
const deleteForm = document.querySelector(".delete");
deleteForm.addEventListener("submit", (e) => {
  e.preventDefault();

  remove(ref(db, "/produk/" + deleteForm.id.value))
    .then(() => deleteForm.reset())
    .catch((err) => console.log("Delete Error : ", err.message));
});
