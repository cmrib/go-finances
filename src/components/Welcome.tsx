import React from 'react';
import { Dashboard } from '../screens/Dashboard';

import { View, Text } from 'react-native';

interface Props {
    title: string;
}


export function Welcome({ title }: Props) {
    return (
        <Dashboard />
    )
}