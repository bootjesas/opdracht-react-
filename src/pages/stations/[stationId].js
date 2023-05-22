/* eslint-disable @next/next/no-img-element */
import useNetwork from '@/data/network';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBicycle } from '@fortawesome/free-solid-svg-icons';
import { faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons';
import { faRoute } from '@fortawesome/free-solid-svg-icons';
import { getDistance } from '@/utils/_getDistance';
import { pointToLocation } from '@/utils/point-to-location';


export default function StationDetail() {
  const { network, isLoading, isError } = useNetwork();
  const [location, setLocation] = useState({});
  const [showRequestPermissions, setShowRequestPermissions] = useState(false);
  const router = useRouter();

  const station = network?.stations.find(
    (station) => station.id === router.query.stationId,
  );

  function error(error) {
    console.log(error);
  }
  const options = {
    enableHighAccuracy: true,
    maximumAge: 0,
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          pointToLocation(
            position.coords.latitude,
            position.coords.longitude,
            station?.latitude,
            station?.longitude,
            '#point-to-location',
            '#request-permissions-button',
            () => setShowRequestPermissions(true),
            () => setShowRequestPermissions(false),
          );
        },
        (error) => {
          console.error(error);
        },
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !station) return <div>Error</div>;

  const distance =
    getDistance(
      location.latitude,
      location.longitude,
      station.latitude,
      station.longitude,
    ).distance / 100;

  function correctName() {
    return station.name.split('-').join(' ');
  }

  return (
    <div>
      <div className={styles.stationcard}>
        <div className={styles.whiteboard}>
          <p>
            {' '}
            <FontAwesomeIcon size="xl" className="icon" icon={faBicycle} />
            {station.free_bikes}
          </p>
          <p>
            {' '}
            <FontAwesomeIcon
              size="xl"
              className="icon"
              icon={faUnlockKeyhole}
            />
            {station.empty_slots}
          </p>
          <p className="number">
            <FontAwesomeIcon size="xl" className="icon" icon={faRoute} />
            {distance} km
          </p>
        </div>
      </div>
      <div className={styles.wrap}>
        <img
          src="/arrow.png"
          alt="volg mij"
          id="point-to-location"
          className="arrow"
        />
        {showRequestPermissions && (
          <div>
            Mogen we je kompas gebruiken om je naar de juiste locatie te gidsen?
            <button
              id="request-permissions-button"
              onClick={() => setShowRequestPermissions(false)}
            >
              Geef goedkeuring
            </button>
          </div>
        )}
      </div>
    </div>
  );
}