import styled from '@emotion/styled';

export const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
`;

export const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const MessageText = styled.p`
  color: #64748b;
  font-size: 1rem;
`;

export const ErrorText = styled(MessageText)`
  color: #ef4444;
`;
