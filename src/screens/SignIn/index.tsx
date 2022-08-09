import React from 'react';
import { Container, Header, TitleWrapper, Title, SignInTitle, Footer, FooterWrapper } from './styles';
import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg'
import { RFValue } from 'react-native-responsive-fontsize';
import { SignInSocialButton } from '../../components/SignInSocialButton';


export function SignIn() {
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
                    <SignInSocialButton title="Entrar com Google" svg={GoogleSvg} />
                    <SignInSocialButton title="Entrar com Apple" svg={AppleSvg} />
                </FooterWrapper>
            </Footer>

        </Container>
    );
}