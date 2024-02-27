import { Container } from './components/Container/Container';
import { Header } from './components/Header/Header';
import { Products } from './components/Products/Products';
import './App.css';

export const App = () => {
  return (
    <>
      <Header />
      <Container>
        <Products />
      </Container>
    </>
  );
};
