import React, { useState } from 'react';
import { Container, Header, TitleWrapper, Title, SignInTitle, Footer, FooterWrapper } from './styles';
import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg'
import { RFValue } from 'react-native-responsive-fontsize';
import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/auth';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { useTheme } from 'styled-components';

export function SignIn() {

    const [isLoading, setIsLoading] = useState(false)
    const { signInWithGoogle } = useAuth();
    const theme = useTheme()

    async function handleSignInWithGoogle() {
        try {
            setIsLoading(true)
            return await signInWithGoogle();
        } catch (error) {
            console.log(error)
            Alert.alert('Não foi possível conectar a conta Google')
            setIsLoading(false)
        }
    }

    // async function handleSignInWithApple() {
    //     try {
    //         setIsLoading(true);
    //         return await signInWithApple();
    //     } catch (error) {
    //         console.log(error)
    //         Alert.alert('Não foi possível conectar a conta Apple')
    //         setIsLoading(false)
    //     } 
    // }

    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg
                        width={RFValue(120)}
                        height={RFValue(68)}
                    />

                    <Title>
                        Controle suas finanças de forma muito simples
                    </Title>
                </TitleWrapper>

                <SignInTitle>
                    Faça seu login com uma das contas abaixo
                </SignInTitle>
            </Header>

            <Footer>
                <FooterWrapper>
                    <SignInSocialButton title="Entrar com Google" onPress={handleSignInWithGoogle} svg={GoogleSvg} />
                    {Platform.OS === 'ios' && <SignInSocialButton title="Entrar com Apple" svg={AppleSvg} />}
                </FooterWrapper>

                {isLoading && <ActivityIndicator color={theme.colors.shape} style={{ marginTop: 18 }} />}

            </Footer>
        </Container>
    );
}