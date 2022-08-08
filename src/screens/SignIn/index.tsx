import React from 'react';
import { Container, Header, TitleWrapper, Title, SignInTitle, Footer } from './styles';
import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg'
import { RFValue } from 'react-native-responsive-fontsize';


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

            </Footer>

        </Container>
    );
}