import styles from './Footer.module.scss'

export function getCopyrightYear(): number {
  return new Date().getFullYear()
}

export default function Footer() {
  const currentYear = getCopyrightYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <p className={styles.footer__text}>
          &copy; {currentYear} Fusion AI
        </p>
      </div>
    </footer>
  )
}
