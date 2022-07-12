import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import { Container, Header, UserWrapper, UserInfo, Photo, User, UserGreeting, UserName, Icon, HighlightCards, Transactions, Title, TransactionsList, LogoutButton } from './styles'
import { dataKey } from '../../utils/collections'
import { useFocusEffect } from '@react-navigation/native'

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighlightProps {
    total: string;
}

interface HightlightData {
    entries: string;
    expensives: string;
    total: string;
}

export function Dashboard() {

    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HightlightData>({} as HightlightData)

    async function loadData() {
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let entriesTotal = 0;
        let expensiveTotal = 0;

        const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {

            if (item.type === 'positive') {
                entriesTotal += Number(item.amount)
            } else {
                expensiveTotal += Number(item.amount)
            }

            const amount = Number(item.amount).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })

            const date = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }).format(new Date(item.date))

            return {
                id: item.id,
                name: item.name,
                amount,
                type: item.type,
                category: item.category,
                date,

            }
        })

        setHighlightData({
            entries: entriesTotal.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })
            ,
            expensives: expensiveTotal.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }),

            total: (entriesTotal - expensiveTotal).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })
        })

        setTransactions(transactionsFormatted)
    }

    useEffect(() => {
        loadData()
    }, [])

    // busca os dados quando o componente está em foco
    useFocusEffect(useCallback(() => {
        loadData()
    }, []))

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

                    <LogoutButton>
                        <Icon name="power" />
                    </LogoutButton>
                </UserWrapper>
            </Header>

            <HighlightCards>
                <HighlightCard
                    type="down"
                    title="Entradas"
                    amount={highlightData.entries}
                    lastTransaction="Última entrada dia 13 de Abril" />
                <HighlightCard
                    type="up"
                    title="Saídas"
                    amount={highlightData.expensives}
                    lastTransaction="Última saída dia 03 de Abril" />
                <HighlightCard
                    type="total"
                    title="Total"
                    amount={highlightData.total}
                    lastTransaction="1 à 16 de Abril" />
            </HighlightCards>

            <Transactions>
                <Title>Listagem</Title>
                <TransactionsList
                    data={transactions}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TransactionCard data={item} />}
                />
            </Transactions>
        </Container>
    )
}