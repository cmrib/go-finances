import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Feather } from '@expo/vector-icons'

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};   
`;

export const Header = styled.View`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.primary};
    height: ${RFValue(113)}px;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
    color: ${({ theme }) => theme.colors.shape};   
`;

export const Content = styled.ScrollView`

`;

export const ChartContainer = styled.View`
    width: 100%;
    align-items: center;
`;

export const MonthSelect = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;
`;

export const MonthSelectButton = styled.TouchableOpacity`
  
`;

export const MonthSelectIcon = styled(Feather)`
    font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(20)}px;
`;


