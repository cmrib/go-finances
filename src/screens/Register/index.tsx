import React, { useState } from 'react';
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { Container, Header, Title, Form, Fields, TransactionsTypes } from './styles';
import { InputForm } from '../../components/Form/InputForm';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { CategorySelect } from '../CategorySelect/';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

interface FormData {
    [key: string]: string;
};

type NavigationProps = {
    navigate: (screen: string) => void;
}


const schema = Yup.object().shape({
    name: Yup
        .string()
        .required('Nome é obrigatório'),
    amount: Yup
        .number()
        .typeError('Informe um valor numérico')
        .positive('O valor não pode ser negativo')
        .required('O valor é obrigatório')
});

export function Register() {

    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    })

    const { user } = useAuth()

    const navigation = useNavigation<NavigationProps>()

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    function handleTransactionTypeSelect(type: 'positive' | 'negative') {
        setTransactionType(type);
    }

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true);
    }
    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false);
    }

    async function handleRegister(form: FormData) {

        if (!transactionType) {
            return Alert.alert('Selecione um tipo de despesa.');
        };

        if (category.key === 'category') {
            return Alert.alert('Selecione uma categoria.');
        };

        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: transactionType,
            category: category.key,
            date: new Date()
        };

        try {
            const dataKey = `@gofinances:transactions_user:${user.id}`

            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];
            const dataFormatted = [
                ...currentData,
                newTransaction
            ]
            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

            // resetando campos
            setTransactionType('');
            setCategory({
                key: 'category',
                name: 'Categoria',
            })
            reset();
            navigation.navigate('Dashboard')

        } catch (error) {
            console.log(error);
            Alert.alert("Não foi possível salvar a transação");
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>

                <Form>
                    <Fields>
                        <InputForm
                            control={control}
                            name="name"
                            placeholder='Nome'
                            autoCapitalize='sentences'
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />

                        <InputForm
                            control={control}
                            name="amount"
                            placeholder='Preço'
                            keyboardType='numeric'
                            error={errors.amount && errors.amount.message}
                        />

                        <TransactionsTypes>
                            <TransactionTypeButton
                                type="up"
                                title="Income"
                                onPress={() => handleTransactionTypeSelect('positive')}
                                isActive={transactionType === 'positive'}
                            />
                            <TransactionTypeButton
                                type="down"
                                title="Outcome"
                                onPress={() => handleTransactionTypeSelect('negative')}
                                isActive={transactionType === 'negative'}
                            />
                        </TransactionsTypes>

                        <CategorySelectButton title={category.name} onPress={handleOpenSelectCategoryModal} />

                    </Fields>
                    <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
                </Form>

                <Modal
                    visible={categoryModalOpen}
                    animationType="slide"
                >
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSelectCategoryModal}
                    />
                </Modal>

            </Container>
        </TouchableWithoutFeedback>
    )
}