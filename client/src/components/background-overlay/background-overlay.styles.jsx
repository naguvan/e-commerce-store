import styled from 'styled-components'

export const Overlay = styled.div`
    position: fixed;
    background: rgba(19, 19, 19, .5);
    width: 100%;
    height: 100%;
    left: 0;
    top: ${props => props.fixedTop ? '0px' : '115px'};
    z-index: 1500;

    @media(max-width: 1100px) {
        top: 46px;
    }
`