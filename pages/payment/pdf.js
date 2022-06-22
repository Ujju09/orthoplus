/** @format */

import { jsPDF } from "jspdf";
import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import exportItems from "../../components/config";
import autoTable from "jspdf-autotable";
import Head from "next/head";

// Default export is a4 paper, portrait, using millimeters for units

export default function PDF() {
  const router = useRouter();
  const { id } = router.query;
  let hospitalID = "jSEOR29kf5tjG8LvvVqD";

  const { FetchConfirmedAppointmentData } = exportItems;

  const [name, setName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    const docSnap = FetchConfirmedAppointmentData(hospitalID, id);
    docSnap.then((snapshot) => {
      setName(snapshot.data().patient);
      setDoctor(snapshot.data().doctor);
      setDate(snapshot.data().date);
      setAge(snapshot.data().age);
      setGender(snapshot.data().gender);
    });
  }, []);

  const docs = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "a4",
    putOnlyUsedFonts: true,
  });
  docs.setFontSize(24);
  docs.text("OrthoPlus Hospital", 10, 10);
  docs.setFontSize(12);
  docs.text(
    "9843+9MM, Harmu Rd, Near Patel Chowk,\nHarmu Housing Colony, Delatoli,\nRanchi, Jharkhand 834012",
    10,
    20
  );
  docs.text("09934104777", 10, 40);
  docs.line(10, 45, 200, 45);

  docs.text(`Your appointment with ${doctor} is confirmed.`, 10, 50);

  autoTable(docs, {
    margin: { top: 65, left: 10, right: 10, bottom: 10 },
    body: [
      [`Name`, `${name}`],
      [`Age`, `${age}`],
      [`Gender`, `${gender}`],
      [`Date`, `${date}`],
      [`Appointment ID`, `${id}`],
    ],
  });
  docs.line(10, 270, 200, 270);
  docs.text("Appointment enabled by MedAana", 105, 280, "center");
  docs.setFontSize(10);
  docs.text("--- Making healthcare hassle free ---", 105, 285, "center");

  const downloadPDF = () => {
    docs.save(`${id}.pdf`);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Download</title>
      </Head>
      <main className={styles.main}>
        <h2>Your appointment slip &darr;</h2>
        <div className={styles.grid}>
          <button className={styles.button} onClick={downloadPDF}>
            Download
          </button>
        </div>
      </main>
    </div>
  );
}
