import React from "react";
import styled from "styled-components";

import { Typography } from ".";

const Footer = () => {
  return (
    <FooterWrapper>
      <Typography.P>
        E-Commerce 
      </Typography.P>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  background: var(--green-color-1);
  height: var(--footer-height);
  padding: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    text-align: center;
    color: var(--white-color);
  }

  a {
    color: #fff;
    font-size: var(--fs-500);
  }
`;

export default Footer;
