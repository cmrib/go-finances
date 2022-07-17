import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HistoryCard } from "../../components/HistoryCard";
import { Container, Header, Title, HistoryCards } from './styles';
import { dataKey } from "../../utils/collections";
import { categories } from "../../utils/categories";

interface TransactionData {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}



export function Resume() {

    async function loadData() {
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : []

        const expensives = responseFormatted
            .filter((expensive: TransactionData) => expensive.type === 'negative');

        categories.forEach(category => {
            let categorySum = 0;

            expensives.forEach((expensive: TransactionData) => {
                if (expensive.category === category.key) {
                    categorySum += Number(expensive.amount)
                }
            })

        })


    }

    useEffect(() => {
        loadData();

    }, [])


    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>

            <HistoryCards>
                <HistoryCard title="Casa" amount="R$1.200" color="purple" />
                <HistoryCard title="Carro" amount="R$700" color="orange" />
                <HistoryCard title="Alimentação" amount="R$700" color="green" />
                <HistoryCard title="Alimentação" amount="R$700" color="red" />
            </HistoryCards>

        </Container>
    )
}