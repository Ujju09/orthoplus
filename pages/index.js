/** @format */

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import DoctorCard from "../components/doctorCard";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Med-Aana</title>
        <meta
          name="Seamless hospital appointments using QR code."
          content="Get appointments in an instant. Forget the queues."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <Link href="/">OrthoPlus Hospital</Link>
        </h1>

        <div className={styles.grid}>
          <DoctorCard />
        </div>
      </main>

      <footer className={styles.footer}>
        Hassle-free healthcare{" -"}
        <span className={styles.logo}>
          <Image src="/MedAana.svg" alt="MedAana Logo" width={72} height={16} />
        </span>
      </footer>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return {
    props: {
      time: new Date().toISOString(),
    },
  };
}
