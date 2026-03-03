import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import type { Cart } from '../../types';

const Card = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const CartId = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  color: #1e293b;
`;

const UserId = styled.span`
  font-size: 0.875rem;
  color: #64748b;
`;

const InfoRow = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 12px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoLabel = styled.span`
  font-size: 0.75rem;
  color: #94a3b8;
  text-transform: uppercase;
`;

const InfoValue = styled.span`
  font-size: 1rem;
  color: #1e293b;
  font-weight: 500;
`;

const ViewButton = styled.button`
  width: 100%;
  padding: 10px 16px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }
`;

interface CartCardProps {
  cart: Cart;
}

export function CartCard({ cart }: CartCardProps) {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/carts/${cart.id}`)}>
      <CardHeader>
        <CartId>Cart #{cart.id}</CartId>
        <UserId>User #{cart.userId}</UserId>
      </CardHeader>
      <InfoRow>
        <InfoItem>
          <InfoLabel>Products</InfoLabel>
          <InfoValue>{cart.products.length} items</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Total</InfoLabel>
          <InfoValue>${cart.total.toFixed(2)}</InfoValue>
        </InfoItem>
      </InfoRow>
      <ViewButton>View Details</ViewButton>
    </Card>
  );
}
