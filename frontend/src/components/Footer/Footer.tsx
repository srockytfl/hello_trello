import styles from './Footer.module.scss'

export default function Footer() {
  const today = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <p className={styles.footer__text}>
          powered by Fusion AI &mdash; {today}
        </p>
      </div>
    </footer>
  )
}
