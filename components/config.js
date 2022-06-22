/** @format */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, addDoc, getDocs, doc, getDoc ,getFirestore} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyATmk9lDf2ZJ5kOO4Nt7W4ZkDuGCfbYSSw",
  authDomain: "pilot-2067d.firebaseapp.com",
  projectId: "pilot-2067d",
  storageBucket: "pilot-2067d.appspot.com",
  messagingSenderId: "626074760511",
  appId: "1:626074760511:web:c9026ecb712206e9088f8a",
  measurementId: "G-5EBBTPKFY1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

const AddHospitals = async () => {
  try {
    const docRef = await addDoc(collection(db, "hospitals"), {
      name: "Devkamal Hospital",
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const GetDoctorsByHospital = async (id) => {
  var data = [];
  try {
    const querysnapshots = await getDocs(
      collection(db, "hospitals", id, "doctors")
    )
      .then((snap) => {
        snap.forEach((doc) => {
          data.push(doc.data());
        });
      })
      .catch((err) => {
        console.log(err);
      });
    return data;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const GethospitalData = async (id) => {
  try {
    const querysnapshots = await getDocs(collection(db, "hospitals"), id);
    // console.log(querysnapshots.docs[0].data());
    return querysnapshots.docs[0].data("name");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const CreateAppointments = async (id, props) => {
  try {
    const docRef = await addDoc(
      collection(db, "hospitals", id, "appointments"),
      {
        doctor: props.doctor,
        patient: props.patient,
        date: props.date,
        mobile: props.mobile,
        age: props.age,
        isPaid: false,
        gender: props.gender,
      }
    );
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const FetchConfirmedAppointmentData = async (hospitalID, id) => {

  try {
    const docRef = doc(db, `hospitals/${hospitalID}/appointments/${id}`);
   
    const snapshot = await getDoc(docRef);
    return snapshot;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const exportItems = {
  db,
  AddHospitals,
  GetDoctorsByHospital,
  GethospitalData,
  CreateAppointments,
  FetchConfirmedAppointmentData,
};

export default exportItems;
