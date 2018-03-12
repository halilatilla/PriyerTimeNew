import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

const Spinner = () => {
    return (
        <View>
            <ActivityIndicator size={'large'} />
            <Text > İnternete Bağlanılıyor </Text>
            <Text >   Lütfen Bekleyiniz...</Text>
        </View>

    );
};

export default Spinner;
