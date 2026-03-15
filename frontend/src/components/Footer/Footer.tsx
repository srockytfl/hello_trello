import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <p className={styles.footer__text}>
          &copy; 2026 hello_trello. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
