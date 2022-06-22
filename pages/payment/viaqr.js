/** @format */

import styles from "../../styles/Home.module.css";
import HeadComponent from "../../components/headComponent";
import { useRouter } from "next/router";
import QRCode from "react-qr-code";
import exportItems from "../../components/config";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import Link from "next/link";

export default function QRPaymentConfirmationPage() {
  const router = useRouter();
  const { id } = router.query;
  let hospitalID = "jSEOR29kf5tjG8LvvVqD";

  const [paymentStatus, setPaymentStatus] = useState("");

  const { db } = exportItems;

  const GetAppointmentData = (hospitalID, id) => {
    try {
      onSnapshot(
        doc(db, "hospitals", hospitalID, "appointments", id),
        (doc) => {
          setPaymentStatus(doc.data().isPaid);
        }
      );
      return paymentStatus;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    GetAppointmentData(hospitalID, id);
  });

  return (
    <div className={styles.container}>
      <HeadComponent />
      <main className={styles.main}>
        <h2
          style={{
            textAlign: "center",
          }}
        >
          इसको काउंटर पे दिखा के पैसे जमा करे।
        </h2>
        {paymentStatus === false ? (
          <ApproveText />
        ) : (
          <ConfirmationAndInvoice id={id} />
        )}
        <div className={styles.grid}>
          <div style={{ background: "white", padding: "16px" }}>
            {id === undefined || null ? <></> : <QRCode value={id} />}
          </div>
          <p
            style={{
              textAlign: "center",
            }}
          >
            Your Appointment id is <strong>{id}</strong>
          </p>
          {/* {
            On payment status successful, redirect to success page and show the invoice and print button
          } */}
        </div>
      </main>
    </div>
  );
}

const ApproveText = () => {
  return (
    <div className={styles.card}>
      <label>
        <h4
          style={{
            textAlign: "center",
            color: "red",
          }}
        >
          Your appointment is not confirmed yet.
        </h4>
      </label>
    </div>
  );
};

const ConfirmationAndInvoice = (props) => {
  return (
    <div className={styles.card}>
      <label>
        <h4>Your appointment is confirmed.</h4>
        <p>आपका अपॉइंटमेंट बुक हो गया है ।</p>
      </label>
      <Link
        href={{
          pathname: "/payment/pdf",
          query: { id: props.id },
        }}
        style={{
          textDecoration: "none",
        }}
      >
        <button
          style={{
            display: "flex",
            margin: "auto",
            background: "green",
            padding: "1rem",
            borderRadius: "12px",
            border: "none",
            fontSize: "1rem",
            color: "white",
          }}
        >
          Download करे
        </button>
      </Link>
    </div>
  );
};
