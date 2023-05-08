import useNetwork from '@/data/network';
import { useRouter } from 'next/router';
import styles from '@/styles/Home.module.css'

export default function Home() {
  const { network, isLoading, isError } = useNetwork()
  const router = useRouter()
 
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  const station = network.stations.find(station => station.id === router.query.stationId)

  return (
    <div>
      <h1>{station.name}</h1>
      <p className={styles.getallen}> vrije fietsen:{station.free_bikes}</p>
      <p className={styles.getallen1}> open stal plaatsen:{station.empty_slots}</p>


    </div>
  )
}
