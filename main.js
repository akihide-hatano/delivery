// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const storage = getStorage(app); // app は initializeApp() で初期化したもの
    // ラーメン画像 URL の取得と表示
    const imageRefRamen = ref(storage, 'ramen1.jpg');
  
    getDownloadURL(imageRefRamen)
      .then((url) => {
        const imgElement = document.getElementById('ramen-image');
        imgElement.src = url;
        
      })
      .catch((error) => {
        console.error("Error getting download URL:", error);
      });
  
    // 玉子ラーメン画像 URL の取得と表示
    const imageRefEgg = ref(storage, 'ramen2.png');
  
    getDownloadURL(imageRefEgg)
      .then((url) => {
        const imgElement = document.getElementById('egg-men-img');
        imgElement.src = url;
        
      })
      .catch((error) => {
        console.error("Error getting download URL:", error);
      });

    // チャーシューラーメン画像 URL の取得と表示
    const imageRefTyashu = ref(storage, 'ramen3.png');
  
    getDownloadURL(imageRefTyashu)
      .then((url) => {
        const imgElement = document.getElementById('tyashu-men-img');
        imgElement.src = url;
        
      })
      .catch((error) => {
        console.error("Error getting download URL:", error);
      });



const items = document.querySelectorAll('.item');

items.forEach(item=>{
    const decrementButton = item.querySelector('.decrement');
    const numberSpan = item.querySelector('.number');
    const incrementButton = item.querySelector('.increment');

    let number = 0;

    decrementButton.addEventListener('click',()=>{
        if(number>0){
            number --;
            numberSpan.textContent = number;
        }
    });

    incrementButton.addEventListener('click',()=>{
            number ++;
            numberSpan.textContent = number;

    });
});