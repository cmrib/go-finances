import styled, { css } from 'styled-components/native';
import { Feather } from "@expo/vector-icons";
import { RFValue } from 'react-native-responsive-fontsize';

interface IconProps {
    type: 'up' | 'down';
}

export const Container = styled.TouchableOpacity`
    width: 48%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: 1.5px solid ${({ theme }) => theme.colors.text};
    border-radius: 5px;
    padding: 16px;
`

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`

export const Icon = styled(Feather) <IconProps>`
    margin-right: 12px;
    font-size: ${RFValue(24)}px;
    color: ${({ type, theme }) => type === 'up' ? theme.colors.success : theme.colors.attention};

`