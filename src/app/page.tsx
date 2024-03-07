import Image from 'next/image'
import styles from './page.module.css'
import Card from '@/components/Card'

export default function Home() {
  return (
    <main className={styles.main}>
      <Card />
    </main>
  )
}
