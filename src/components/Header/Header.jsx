import { Container } from '../Container/Container';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <h2>Valantis App</h2>
      </Container>
    </header>
  );
};
