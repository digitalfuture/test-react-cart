import styled from '@emotion/styled';
import type { Product } from '../../types';

const Row = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  align-items: center;
  padding: 12px 16px;
  background-color: #f8fafc;
  border-radius: 8px;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

const ProductName = styled.div`
  font-weight: 500;
  color: #1e293b;
`;

const Cell = styled.div`
  color: #64748b;
  font-size: 0.875rem;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
  }

  &::before {
    @media (max-width: 768px) {
      content: attr(data-label);
      font-weight: 500;
      color: #1e293b;
    }
  }
`;

const Subtotal = styled(Cell)`
  color: #1e293b;
  font-weight: 600;
`;

interface ProductRowProps {
  product: Product;
}

export function ProductRow({ product }: ProductRowProps) {
  return (
    <Row>
      <ProductName>{product.title}</ProductName>
      <Cell data-label="Price:">${product.price.toFixed(2)}</Cell>
      <Cell data-label="Quantity:">{product.quantity}</Cell>
      <Cell data-label="Subtotal:">${product.total.toFixed(2)}</Cell>
      <Subtotal data-label="Total:">${product.total.toFixed(2)}</Subtotal>
    </Row>
  );
}
