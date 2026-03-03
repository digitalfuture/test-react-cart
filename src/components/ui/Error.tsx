import styled from '@emotion/styled';

interface ErrorProps {
  message: string;
  onRetry?: () => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  gap: 16px;
`;

const ErrorText = styled.p`
  color: #ef4444;
  font-size: 1rem;
`;

const RetryButton = styled.button`
  padding: 8px 16px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #2563eb;
  }

  &:disabled {
    background-color: #93c5fd;
    cursor: not-allowed;
  }
`;

export function Error({ message, onRetry }: ErrorProps) {
  return (
    <Container>
      <ErrorText>{message}</ErrorText>
      {onRetry && <RetryButton onClick={onRetry}>Retry</RetryButton>}
    </Container>
  );
}
