/** @format */

import exportItems from "../components/config";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const DoctorCard = () => {
  const { GetDoctorsByHospital } = exportItems;
  const [loading, setLoading] = useState(true);
  let id = "jSEOR29kf5tjG8LvvVqD";
  const [data, setData] = useState([]);
  useEffect(() => {
    GetDoctorsByHospital(id).then((snap) => {
      setData(snap);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? (
        <p>loading...</p>
      ) : (
        Array.from(data).map((doc, index) => {
          return (
            <Link
              href={{
                pathname: `/${doc.name}`,
                query: {
                  name: `${doc.name}`,
                  specialization: `${doc.specialization}`,
                },
              }}
              key={index}
            >
              <div className={styles.card}>
                <h3>{doc.name}</h3>
                <p>{doc.specialization}</p>
              </div>
            </Link>
          );
        })
      )}
    </>
  );
};

//Work with react-bootstrap to create a card for booking appointment.

export default DoctorCard;
