import styled from "styled-components";

export const ContainerDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: ${props =>
        Boolean(props.flexDirection) ? props.flexDirection : "row"};
    justify-content: ${props =>
        Boolean(props.justifyContent) ? props.justifyContent : "flex-start"};
    align-items: ${props =>
        Boolean(props.alignItems) ? props.alignItems : "flex-start"};
    background-color: ${props =>
        Boolean(props.backgroundColor) ? props.backgroundColor : "#F4F4F4"};
`;

export const HeaderTitleDiv = styled.div`
    font-size: 30pt;
    font-weight: 600;
    color: black;
    text-align: center;
    padding-bottom: 50px;
`;

export const FieldContainerDiv = styled.div`
    width: 100%;
    padding-bottom: 20px;
`;

export const FormContainerDiv = styled.div`
    width: 50%;
    height: 40%;
`;
