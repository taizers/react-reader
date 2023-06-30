import styled from 'styled-components';

export const SidebarWrapper = styled.div`
  width: 325px;
  height: 100vh;
  padding: 40px 26px;
  background: ${({ theme }) => theme.palette.typography_white};
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
`;