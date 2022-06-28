import React from 'react';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';
import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionsList
} from './styles'

const data = [{
    title: 'Desenvolvimento de site',
    amount: 'R$12.000,00',
    category: { name: 'Vendas', icon: 'dollar-sign' },
    date: '13/04/2020',
}, {
    title: 'Desenvolvimento de site',
    amount: 'R$12.000,00',
    category: { name: 'Vendas', icon: 'dollar-sign' },
    date: '13/04/2020'
},
{
    title: 'Desenvolvimento de site',
    amount: 'R$12.000,00',
    category: { name: 'Vendas', icon: 'dollar-sign' },
    date: '13/04/2020'
}
]


export function Dashboard() {
    return (
        <Container >
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/70413248?v=4' }} />
                        <User>
                            <UserGreeting>Olá, </UserGreeting>
                            <UserName>Cicero</UserName>
                        </User>
                    </UserInfo>
                    <Icon name="power" />
                </UserWrapper>
            </Header>

            <HighlightCards>
                <HighlightCard
                    type="down"
                    title="Entradas"
                    amount="R$17.000,00"
                    lastTransaction="Última entrada dia 13 de Abril" />
                <HighlightCard
                    type="up"
                    title="Saídas"
                    amount="R$1.259,00"
                    lastTransaction="Última saída dia 03 de Abril" />
                <HighlightCard
                    type="total"
                    title="Total"
                    amount="R$16.141,00"
                    lastTransaction="1 à 16 de Abril" />
            </HighlightCards>

            <Transactions>
                <Title>Listagem</Title>

                <TransactionsList
                    data={data}
                    renderItem={({ item }) => <TransactionCard data={item} />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: getBottomSpace()
                    }}
                >

                </TransactionsList>
            </Transactions>
        </Container>
    )
}