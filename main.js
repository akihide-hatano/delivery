// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSM-frtSb-NaaWw7CZJxg8h3mJ2A_3u1A",
  authDomain: "delivery-report-bb0cc.firebaseapp.com",
  projectId: "delivery-report-bb0cc",
  storageBucket: "delivery-report-bb0cc.firebasestorage.app",
  messagingSenderId: "368618365165",
  appId: "1:368618365165:web:f3d6e16cdba51ee670ace4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

// 商品情報の取得
getDocs(collection(db, 'items'))
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const itemData = doc.data();
      const itemId = doc.id;

      // 商品情報を表示
      const itemElement = document.getElementById(itemId);
      const imgElement = itemElement.querySelector('img');
      const nameElement = itemElement.querySelector('.itemName');
      const priceElement = itemElement.querySelector('.itemPrice');

      imgElement.src = itemData.imageUrl;
      nameElement.textContent = itemData.name;
      priceElement.textContent = `値段${itemData.price}円`;
    });
  })
  .catch((error) => {
    console.error("Error getting documents:", error);
  });



// submitButton のクリックイベントリスナー
const submitButton = document.getElementById('buttonSubmit');
submitButton.addEventListener('click', async () => {
  // 氏名と電話番号の入力値を取得git 
  const name = document.querySelector('input[type="text"]').value;
  const telephone = document.querySelector('input[type="tel"]').value;

  // 各商品の数量を取得
  const ramenQuantity = document.getElementById('ramen').querySelector('.number').textContent;
  const eggMenQuantity = document.getElementById('egg-men').querySelector('.number').textContent;
  const tyashuMenQuantity = document.getElementById('tyashu-men').querySelector('.number').textContent;

  try {
    // 顧客情報を Firestore に保存
    const customerRef = await addDoc(collection(db, "customers"), {
      name: name,
      telephone: telephone,
    });
    const customerId = customerRef.id;

    // 注文情報を Firestore に保存
    await addDoc(collection(db, "orders"), {
      customerId: customerId,
      orderDate: new Date(),
      items: [
        { name: 'ラーメン', quantity: ramenQuantity },
        { name: '玉子ラーメン', quantity: eggMenQuantity },
        { name: 'チャーシューメン', quantity: tyashuMenQuantity }
      ],
      totalPrice: calculateTotalPrice([
        { name: 'ラーメン', quantity: ramenQuantity, price: 600 },
        { name: '玉子ラーメン', quantity: eggMenQuantity, price: 800 },
        { name: 'チャーシューメン', quantity: tyashuMenQuantity, price: 800 }
      ])
    });
    console.log("注文情報を送信しました");
  } catch (error) {
    console.error("注文情報の送信に失敗しました:", error);
  }
});

// 合計金額を計算する関数
const calculateTotalPrice = (items) => {
  let totalPrice = 0;
  items.forEach(item => {
    totalPrice += item.quantity * item.price;
  });
  return totalPrice;
};

// 数量調整
const items = document.querySelectorAll('.item');

items.forEach(item => {
  const decrementButton = item.querySelector('.decrement');
  const numberSpan = item.querySelector('.number');
  const incrementButton = item.querySelector('.increment');

  let number = 0;

  decrementButton.addEventListener('click', () => {
    if (number > 0) {
      number--;
      numberSpan.textContent = number;
    }
  });

  incrementButton.addEventListener('click', () => {
    number++;
    numberSpan.textContent = number;
  });
});