import styled from '@emotion/styled';
import { useCartStore } from '../../store/useCartStore';
import { useCarts } from '../../hooks/useCarts';
import { CartCard } from './CartCard';
import { Pagination } from './Pagination';
import { LoadingSpinner, Spinner } from '../ui/Loading';
import { Error } from '../ui/Error';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #1e293b;
  margin-bottom: 24px;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
`;

export function CartList() {
  const { currentPage, limit, setPage } = useCartStore();
  const skip = currentPage * limit;
  const { data, isLoading, isError, error } = useCarts(skip, limit);

  if (isLoading) {
    return (
      <LoadingSpinner>
        <Spinner />
      </LoadingSpinner>
    );
  }

  if (isError || !data) {
    return (
      <Error
        message={error instanceof Error ? error.message : 'Failed to load carts'}
      />
    );
  }

  const totalPages = Math.ceil(data.total / limit);

  return (
    <Container>
      <Title>Shopping Carts</Title>
      <Grid>
        {data.carts.map((cart) => (
          <CartCard key={cart.id} cart={cart} />
        ))}
      </Grid>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </Container>
  );
}
