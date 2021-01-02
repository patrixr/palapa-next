import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function InternalError() {
  return (
    <div className={styles.container}>
      <Head>
        <title>500</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="https://nextjs.org">404</a>
        </h1>
      </main>
    </div>
  )
}
