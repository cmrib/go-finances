import React from 'react';
import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
} from './styles'

import { Text } from 'react-native';

export function Dashboard() {
    return (
        <Container >
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/70413248?v=4' }} />
                        <User>
                            <UserGreeting>Ola, </UserGreeting>
                            <UserName>Cicero</UserName>
                        </User>
                    </UserInfo>
                </UserWrapper>
            </Header>
        </Container>
    )
}
