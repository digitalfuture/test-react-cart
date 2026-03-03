import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useCart, useUpdateCart, cartKeys } from '../../hooks/useCarts';
import { ProductRow } from './ProductRow';
import { CartEditor } from './CartEditor';
import { LoadingSpinner, Spinner } from '../ui/Loading';
import { Error } from '../ui/Error';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #1e293b;
`;

const BackButton = styled.button`
  padding: 10px 20px;
  background-color: #64748b;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #475569;
  }
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const InfoRow = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e2e8f0;
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
  font-size: 1.25rem;
  color: #1e293b;
  font-weight: 600;
`;

const ProductsHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  padding: 12px 16px;
  background-color: #f1f5f9;
  border-radius: 8px 8px 0 0;
  font-weight: 600;
  color: #1e293b;
  font-size: 0.875rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 24px 16px;
  border-top: 2px solid #e2e8f0;
  margin-top: 16px;
`;

const TotalLabel = styled.span`
  font-size: 1.25rem;
  color: #64748b;
  margin-right: 16px;
`;

const TotalValue = styled.span`
  font-size: 1.5rem;
  color: #1e293b;
  font-weight: 700;
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: #64748b;
  padding: 48px;
`;

const MutationError = styled.div`
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MutationErrorText = styled.span`
  color: #dc2626;
  font-size: 0.875rem;
`;

const DismissButton = styled.button`
  background: none;
  border: none;
  color: #dc2626;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0 4px;
  line-height: 1;

  &:hover {
    color: #991b1b;
  }
`;

export function CartDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const cartId = id ? parseInt(id, 10) : 0;

  const { data: cart, isLoading, isError, error } = useCart(cartId);
  const updateMutation = useUpdateCart();
  const [mutationError, setMutationError] = useState<string | null>(null);

  const handleUpdate = (productId: number, newQuantity: number) => {
    if (!cart) return;

    const updatedProducts = cart.products.map((p) =>
      p.id === productId ? { ...p, quantity: newQuantity, total: p.price * newQuantity } : p
    );

    const newTotal = updatedProducts.reduce((sum, p) => sum + p.total, 0);

    // Save previous state for rollback
    const previousCart = { ...cart };
    const previousListData = queryClient.getQueryData(cartKeys.lists());

    // Optimistically update the cart detail cache
    queryClient.setQueryData(cartKeys.detail(cartId), {
      ...cart,
      products: updatedProducts,
      discountedTotal: newTotal,
    });

    // Optimistically update all cart list caches
    queryClient.setQueriesData(
      { queryKey: cartKeys.lists() },
      (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          carts: oldData.carts.map((c: any) =>
            c.id === cartId
              ? { ...c, products: updatedProducts, total: newTotal }
              : c
          ),
        };
      }
    );

    updateMutation.mutate(
      {
        id: cartId,
        payload: {
          merge: false,
          products: updatedProducts.map((p) => ({
            id: p.id,
            quantity: newQuantity,
          })),
        },
      },
      {
        onError: () => {
          // Rollback to previous state on error
          queryClient.setQueryData(cartKeys.detail(cartId), previousCart);
          if (previousListData) {
            queryClient.setQueryData(cartKeys.lists(), previousListData);
          }
          setMutationError('Failed to update product. Changes reverted.');
        },
      }
    );
  };

  const handleRemove = (productId: number) => {
    if (!cart) return;

    const updatedProducts = cart.products.filter((p) => p.id !== productId);
    const newTotal = updatedProducts.reduce((sum, p) => sum + p.total, 0);

    // Save previous state for rollback
    const previousCart = { ...cart };
    const previousListData = queryClient.getQueryData(cartKeys.lists());

    // Optimistically update the cart detail cache
    queryClient.setQueryData(cartKeys.detail(cartId), {
      ...cart,
      products: updatedProducts,
      discountedTotal: newTotal,
    });

    // Optimistically update all cart list caches
    queryClient.setQueriesData(
      { queryKey: cartKeys.lists() },
      (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          carts: oldData.carts.map((c: any) =>
            c.id === cartId
              ? { ...c, products: updatedProducts, total: newTotal }
              : c
          ),
        };
      }
    );

    updateMutation.mutate(
      {
        id: cartId,
        payload: {
          merge: false,
          products: updatedProducts.map((p) => ({
            id: p.id,
            quantity: p.quantity,
          })),
        },
      },
      {
        onError: () => {
          // Rollback to previous state on error
          queryClient.setQueryData(cartKeys.detail(cartId), previousCart);
          if (previousListData) {
            queryClient.setQueryData(cartKeys.lists(), previousListData);
          }
          setMutationError('Failed to remove product. Changes reverted.');
        },
      }
    );
  };

  if (isLoading) {
    return (
      <LoadingSpinner>
        <Spinner />
      </LoadingSpinner>
    );
  }

  if (isError || !cart) {
    return (
      <Container>
        <Error
          message={error instanceof Error ? error.message : 'Failed to load cart'}
          onRetry={() => queryClient.invalidateQueries({ queryKey: cartKeys.detail(cartId) })}
        />
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Cart #{cart.id}</Title>
        <BackButton onClick={() => navigate('/')}>Back to List</BackButton>
      </Header>

      {mutationError && (
        <MutationError>
          <MutationErrorText>{mutationError}</MutationErrorText>
          <DismissButton onClick={() => setMutationError(null)}>×</DismissButton>
        </MutationError>
      )}

      <Card>
        <InfoRow>
          <InfoItem>
            <InfoLabel>User ID</InfoLabel>
            <InfoValue>#{cart.userId}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Products</InfoLabel>
            <InfoValue>{cart.products.length} items</InfoValue>
          </InfoItem>
        </InfoRow>

        {cart.products.length === 0 ? (
          <EmptyMessage>This cart is empty</EmptyMessage>
        ) : (
          <>
            <ProductsHeader>
              <div>Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Subtotal</div>
              <div>Actions</div>
            </ProductsHeader>

            <ProductList>
              {cart.products.map((product) => (
                <ProductWrapper key={product.id}>
                  <ProductRow product={product} />
                  <CartEditor
                    product={product}
                    onUpdate={handleUpdate}
                    onRemove={handleRemove}
                    isUpdating={updateMutation.isPending}
                  />
                </ProductWrapper>
              ))}
            </ProductList>

            <TotalRow>
              <TotalLabel>Total:</TotalLabel>
              <TotalValue>${cart.discountedTotal.toFixed(2)}</TotalValue>
            </TotalRow>
          </>
        )}
      </Card>
    </Container>
  );
}
