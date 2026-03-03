import { useState } from 'react';
import styled from '@emotion/styled';
import type { Product } from '../../types';

const Container = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Input = styled.input`
  width: 80px;
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  text-align: center;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const UpdateButton = styled.button`
  padding: 8px 16px;
  background-color: #22c55e;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #16a34a;
  }

  &:disabled {
    background-color: #86efac;
    cursor: not-allowed;
  }
`;

const RemoveButton = styled.button`
  padding: 8px 16px;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #dc2626;
  }

  &:disabled {
    background-color: #fca5a5;
    cursor: not-allowed;
  }
`;

interface CartEditorProps {
  product: Product;
  onUpdate: (productId: number, newQuantity: number) => void;
  onRemove: (productId: number) => void;
  isUpdating: boolean;
}

export function CartEditor({
  product,
  onUpdate,
  onRemove,
  isUpdating,
}: CartEditorProps) {
  const [quantity, setQuantity] = useState(product.quantity.toString());

  const handleUpdate = () => {
    const newQuantity = parseInt(quantity, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      onUpdate(product.id, newQuantity);
    }
  };

  const handleRemove = () => {
    onRemove(product.id);
  };

  return (
    <Container>
      <Input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        disabled={isUpdating}
      />
      <UpdateButton onClick={handleUpdate} disabled={isUpdating}>
        Update
      </UpdateButton>
      <RemoveButton onClick={handleRemove} disabled={isUpdating}>
        Remove
      </RemoveButton>
    </Container>
  );
}
