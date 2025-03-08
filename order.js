// import { initializeApp } from "firebase/app";
// import { getFirestore, collection ,getDocs } from "firebase/firestore";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyDSM-frtSb-NaaWw7CZJxg8h3mJ2A_3u1A",
//     authDomain: "delivery-report-bb0cc.firebaseapp.com",
//     projectId: "delivery-report-bb0cc",
//     storageBucket: "delivery-report-bb0cc.firebasestorage.app",
//     messagingSenderId: "368618365165",
//     appId: "1:368618365165:web:f3d6e16cdba51ee670ace4"
//   };


//   const app = initializeApp(firebaseConfig);
//   const db = getFirestore(app);

//   async function getCustomers() {
//     const querySnapshot = await getDocs(collection(db, "customers"));
//     const customers = [];
//     querySnapshot.forEach((doc) => {
//       customers.push({ id: doc.id, ...doc.data() });
//     });
//     return customers;
//   }

//   async function getOrders() {
//     const querySnapshot = await getDocs(collection(db,"orders"));
//     const orders =[];
//     querySnapshot.forEach((doc) =>{
//         orders.push({ id: doc.id, ...doc.data() });
//     });
//     return orders;
//   }

//   async function displayOrderDetails(){
//     const customers = await getCustomers();
//     const orders = await getOrders();

//     // URLから注文IDを取得（例：order.html?orderId=YOUR_ORDER_ID）
//     const urlParams = new URLSearchParams(window.location.search);
//     const orderId = urlParams.get("orderId");

//     if (!orderId) {
//         console.error("注文IDがURLにありません。");
//         return; // ここに移動
//     }

//     const order = orders.find((order) => order.id === orderId);

//     if (!order) {
//         console.error("指定された注文IDの注文が見つかりません。");
//         return; // ここに移動
//     }

//     const customer = customers.find((customer) => customer.id === order.customerId);

//     if (!customer) {
//         console.error("注文に対応する顧客情報が見つかりません。");
//         return; // ここに移動
//     }

//     // 顧客情報を表示
//     document.getElementById("order-name").textContent = customer.name;
//     document.getElementById("order-telephone").textContent = customer.telephone;

//     // 注文内容を表示
//     const orderItemsList = document.getElementById("order-items");
//     order.orderItems.forEach((item) => {
//         const listItem = document.createElement("li");
//         listItem.textContent = `${item.name} x ${item.quantity} = ${item.price * item.quantity}円`;
//         orderItemsList.appendChild(listItem);
//     });
// }
 
 
//  displayOrderDetails();


import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDSM-frtSb-NaaWw7CZJxg8h3mJ2A_3u1A",
    authDomain: "delivery-report-bb0cc.firebaseapp.com",
    projectId: "delivery-report-bb0cc",
    storageBucket: "delivery-report-bb0cc.firebasestorage.app",
    messagingSenderId: "368618365165",
    appId: "1:368618365165:web:f3d6e16cdba51ee670ace4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getCustomers() {
    try {
        const querySnapshot = await getDocs(collection(db, "customers"));
        const customers = [];
        querySnapshot.forEach((doc) => {
            customers.push({ id: doc.id, ...doc.data() });
        });
        
        const orderTableBody = document.querySelector("#order-table tbody");
        orderTableBody.innerHTML = ""; // 既存の内容をクリア

        customers.forEach((customer) => {
            const row = document.createElement("tr");

            // 氏名
            const nameCell = document.createElement("td");
            nameCell.textContent = customer.name;
            row.appendChild(nameCell);

            // 電話番号
            const telephoneCell = document.createElement("td");
            telephoneCell.textContent = customer.telephone;
            row.appendChild(telephoneCell);

            orderTableBody.appendChild(row);
        });

        return customers;
    } catch (error) {
        console.error("Error getting all customers:", error);
        return [];      
    }
}

// async function getOders() {
//     try {
//         const querySnapshot = await getDocs(collection(db, "orders"));
//         const orders = [];
//         querySnapshot.forEach((doc) => {
//             orders.push({ id: doc.id, ...doc.data() });
//         });

//         const orderItemsList = document.getElementById("order-items");
//         orderItemsList.innerHTML = ""; // 既存の内容をクリア

//         // orders.forEach((order) => {
//         //     if (order.items && order.items.length > 0) {
//         //         order.items.forEach((item) => {
//         //             const listItem = document.createElement("li");
//         //             // 注文日時を表示
//         //             listItem.textContent = `注文日時: ${order.orderDate.toLocaleString()}`;
//         //             // 商品情報を表示
//         //             listItem.textContent += ` / ${item.name} x ${item.quantity}`;
//         //             orderItemsList.appendChild(listItem);
//         //         });
//         //     }
//         // });

//         orders.forEach((order) => {
//             if (order.items && order.items.length > 0) {
//                 order.items.forEach((item) => {
//                     const listItem = document.createElement("li");
//                     // 注文日時を表示 (toLocaleString() を使用)
//                     if (order.orderDate) {
//                         const date = order.orderDate.toDate();
//                         const formattedDate = date.toLocaleString(); // ロケールに合わせた日時を表示
//                         listItem.textContent = `注文日時: ${formattedDate} / ${item.name} x ${item.quantity}`;
//                     } else {
//                         listItem.textContent = `注文日時: データなし / ${item.name} x ${item.quantity}`;
//                     }
//                     orderItemsList.appendChild(listItem);
//                 });
//             }
//         });

//         return orders;
//     } catch (error) {
//         console.error("Error getting all orders:", error);
//         return [];
//     }
// }


async function getOders() {
    try {
        const querySnapshot = await getDocs(collection(db, "orders"));
        const orders = [];
        querySnapshot.forEach((doc) => {
            orders.push({ id: doc.id, ...doc.data() });
        });

        const orderTableBody = document.querySelector("#order-table tbody");
        orderTableBody.innerHTML = ""; // 既存の内容をクリア

        // 顧客情報を取得
        const customers = await getCustomers();

        orders.forEach((order) => {
            const customer = customers.find((c) => c.id === order.customerId);

            if (order.items && order.items.length > 0) {
                order.items.forEach((item) => {
                    const row = document.createElement("tr");

                    // 氏名
                    const nameCell = document.createElement("td");
                    nameCell.textContent = customer ? customer.name : "顧客情報なし";
                    row.appendChild(nameCell);

                    // 電話番号
                    const telephoneCell = document.createElement("td");
                    telephoneCell.textContent = customer ? customer.telephone : "顧客情報なし";
                    row.appendChild(telephoneCell);

                    // 注文日時
                    const dateCell = document.createElement("td");
                    if (order.orderDate) {
                        const date = order.orderDate.toDate();
                        dateCell.textContent = date.toLocaleString();
                    } else {
                        dateCell.textContent = "データなし";
                    }
                    row.appendChild(dateCell);

                    // 商品名
                    const itemNameCell = document.createElement("td");
                    itemNameCell.textContent = item.name;
                    row.appendChild(itemNameCell);

                    // 数量
                    const quantityCell = document.createElement("td");
                    quantityCell.textContent = item.quantity;
                    row.appendChild(quantityCell);

                    orderTableBody.appendChild(row);
                });
            }
        });

        return orders;
    } catch (error) {
        console.error("Error getting all orders:", error);
        return [];
    }
}


getCustomers();
getOders();