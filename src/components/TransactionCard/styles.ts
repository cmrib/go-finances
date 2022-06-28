import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';
import { Feather } from "@expo/vector-icons";

interface TransactionProps {
    type: 'positive' | 'negative';
}

export const Container = styled.View`
    margin-top: ${RFValue(16)}px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.shape};
    padding: 17px 24px;
    border-radius: 5px;   
`

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.text_dark};
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Amount = styled.Text<TransactionProps>`
    color: ${({ theme }) => theme.colors.success};
    font-size: ${RFValue(20)}px;     
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ type, theme }) => type === 'positive' ? theme.colors.success : theme.colors.attention};
    
`;


export const Footer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: ${RFValue(19)}px; 
`;

export const Category = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Icon = styled(Feather)`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(20)}px;    
`;

export const CategoryName = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    margin-left: ${RFValue(17)}px;
    font-size: ${RFValue(14)}px;    
    font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Data = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(14)}px;    
    font-family: ${({ theme }) => theme.fonts.regular};
`;

