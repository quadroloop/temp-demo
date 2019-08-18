import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1.25rem;

  background: #ffffff;

  border: none;
  border-radius: 4px;

  outline: none;
  cursor: pointer;

  transition: all var(--animation-duration) var(--animation-easing);

  &:hover {
    box-shadow: 0px 5px 30px 0px rgba(255,255,255,1);
    transition: all var(--animation-duration) var(--animation-easing);
  }
`

const IconContainer = styled.span`
  margin-right: 1rem;
`

function Button(props) {
  const { children, icon: Icon, ...restProps } = props
  return (
    <StyledButton
      {...restProps}
    >
      {
        Icon && (
          <IconContainer>
            <Icon />
          </IconContainer>
        )
      }
      { children }
    </StyledButton>
  )
}

export default Button