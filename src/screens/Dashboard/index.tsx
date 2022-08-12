import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useState } from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import { Container, Header, UserWrapper, UserInfo, Photo, User, UserGreeting, UserName, Icon, HighlightCards, Transactions, Title, TransactionsList, LogoutButton, LoadContainer } from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighlightProps {
    amount: string;
    lastTransaction: string;
}

interface HightlightData {
    entries: HighlightProps;
    expensives: HighlightProps;
    total: HighlightProps;
}

export function Dashboard() {

    const theme = useTheme()
    const [isLoading, setIsLoading] = useState(true)
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HightlightData>({} as HightlightData);
    const { signOut, user } = useAuth()


    function getLastTransactionDate(
        collection: DataListProps[],
        type: 'positive' | 'negative') {
        // Descobre a transação mais recente
        const lastTransaction = new Date(Math.max.apply(Math, collection
            .filter((transaction) => transaction.type === type)
            .map((transaction) => new Date(transaction.date).getTime()))
        )

        return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })} `
    }

    async function loadData() {
        const dataKey = `@gofinances:transactions_user:${user.id}`
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

        setTransactions(transactionsFormatted);
        const lastTransactionEntrie = getLastTransactionDate(transactions, 'positive');
        const lastTransactionExpensives = getLastTransactionDate(transactions, 'negative');
        const totalInterval = `01 a ${lastTransactionExpensives}`

        const total = entriesTotal - expensiveTotal

        setHighlightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: `Última entrada dia ${lastTransactionEntrie}`

            },

            expensives: {
                amount: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: `Última saída dia ${lastTransactionExpensives}`
            },

            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: totalInterval
            }
        })

        setIsLoading(false)
    }

    // busca os dados quando o componente está em foco
    useFocusEffect(useCallback(() => {
        loadData()
    }, []))

    return (

        isLoading ?
            <LoadContainer>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </LoadContainer>
            :
            <Container>
                <Header>
                    <UserWrapper>
                        <UserInfo>
                            <Photo source={{ uri: user.photo }} />
                            <User>
                                <UserGreeting>Olá, </UserGreeting>
                                <UserName>{user.name}</UserName>
                            </User>
                        </UserInfo>

                        <LogoutButton onPress={signOut}>
                            <Icon name="power" />
                        </LogoutButton>
                    </UserWrapper>
                </Header>

                <HighlightCards>
                    <HighlightCard
                        type="down"
                        title="Entradas"
                        amount={highlightData.entries.amount}
                        lastTransaction={highlightData.entries.lastTransaction} />
                    <HighlightCard
                        type="up"
                        title="Saídas"
                        amount={highlightData.expensives.amount}
                        lastTransaction={highlightData.expensives.lastTransaction} />
                    <HighlightCard
                        type="total"
                        title="Total"
                        amount={highlightData.total.amount}
                        lastTransaction={highlightData.total.lastTransaction} />
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