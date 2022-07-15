import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface ContainerProps {
    color: string
}

export const Container = styled.View<ContainerProps>`
    width: 100%;    
    background-color: ${({ theme }) => theme.colors.shape};
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    margin-bottom: 8px;
    border-radius: 5px;
    padding: 13px 24px;   
    border-left-width: 5px;
    border-left-color: ${({ color }) => color};  
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.title};
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(15)}px;
`;

export const Amount = styled.Text`
    color: ${({ theme }) => theme.colors.title};
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${RFValue(15)}px;
`;