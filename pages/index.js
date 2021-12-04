import Head from 'next/head'
import Cards from '../components/Cards'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.bg}>
      <Head>
        <title>Fab Glass and Mirror</title>
      </Head>
      <Cards />
    </div>
  )
}
