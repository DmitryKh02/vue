import { initializeApp } from "firebase/app";
import { getDatabase,  ref, set, get, push, onValue, off} from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCd-MYBp81zMfbUoGlckGzPQP4foeambk0",
    authDomain: "vue-calculate-khokhlov.firebaseapp.com",
    projectId: "vue-calculate-khokhlov",
    storageBucket: "vue-calculate-khokhlov.appspot.com",
    messagingSenderId: "198636986113",
    appId: "1:198636986113:web:44652bcbab59602c858500",
    measurementId: "G-LSX1TF4KJ4",
    };

    function writeToFirebase(expression, result, date) {
        const currentDate = date;
        const formattedDate = `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`; // форматируем дату в формате дд.мм.гггг
        const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`; // форматируем время в формате чч:мм
        const timestamp = formattedDate + " " + formattedTime;
    
        const newPostRef = push(dbRef);
      
        set(newPostRef,{
            expression: expression,
            result: result,
            timestamp : timestamp
          });
          
          getRecords();
        }
    
      // Функция для получения данных из базы данных
      function readFromFirebase() {
        return listOfRecords.reverse();
      }
    
      function getRecords(){
        listOfRecords = [];
        onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            listOfRecords.push(childData.timestamp + " "
                            + childData.expression + "="
                            +childData.result);
            });
          }, {
             onlyOnce: true
          });
      }
    
      export { writeToFirebase, readFromFirebase };

  // Initialize Firebase and Database
const app = initializeApp(firebaseConfig);
const databaseURL ="https://vue-calculate-khokhlov-default-rtdb.firebaseio.com"
const db = getDatabase(app,databaseURL);
const dbRef = ref(db, 'posts');
let listOfRecords = [];
getRecords();

