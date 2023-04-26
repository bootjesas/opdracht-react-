import {useState, useEffect} from 'react';
import useNetwork from '@/data/network';
import {getDistance} from '@/utils/_getDistance';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const [filter, setFilter] = useState('');
  const [location, setLocation] = useState({});
  const { network, isLoading, isError } = useNetwork();
  // use effect gebruiken om bv iets op te roepen enkel bij opstart van de app
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);
 
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  const stations = network.stations.filter(station => station.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0);

  // map stations to add disrance to current location
  stations.map(station => {
    station.distance = getDistance(location.latitude, location.longitude, station.latitude, station.longitude).distance/1000;
  });

  // sort stations by distance
  stations.sort((a, b) => a.distance - b.distance);

  function handleFilterChange(e) {
    setFilter(e.target.value);
  }
  console.log(stations)
  return (
    <>
      <h1 className={styles.title}>Choose your station</h1>
      <div className={styles.card}>
       {stations.slice(0,7).map(station => 
        <div key={station.id} className={styles.station}>
          <div className={styles.info}>
          <Link href={`/stations/${station.id}`}>{station.name}: {getDistance(location.latitude, location.longitude, station.latitude, station.longitude).distance/1000}km</Link>
          </div>
          <div className={styles.details}>
            <Image className={styles.Image} src="/fiets.png" alt="fiets" width={50} height={50} />
            <div className={styles.distance}>
              <Image className={styles.Image} src="/location.png" alt="fiets" width={50} height={50} />
              <span>{getDistance(location.latitude, location.longitude, station.latitude, station.longitude).distance/1000}km</span>
            </div>
          </div>
        </div>
       )}
      </div>
    </>
  )
}

