import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import { CartDetails } from '../components/CartDetails/CartDetails';

const Layout = styled.main`
  min-height: 100vh;
  background-color: #f8fafc;
  padding: 24px;
`;

export default function CartDetailsPage() {
  return (
    <>
      <Global
        styles={css`
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
              Oxygen, Ubuntu, sans-serif;
            line-height: 1.5;
          }
        `}
      />
      <Layout>
        <CartDetails />
      </Layout>
    </>
  );
}
