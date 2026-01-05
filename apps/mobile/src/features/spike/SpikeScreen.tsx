import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch, SafeAreaView } from 'react-native';
import { ReanimatedDeck } from './ReanimatedDeck';
import { SkiaDeck } from './SkiaDeck';

export default function SpikeScreen() {
    const [useSkia, setUseSkia] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.label}>Engine: {useSkia ? 'Skia (Canvas)' : 'Reanimated (Views)'}</Text>
                <Switch value={useSkia} onValueChange={setUseSkia} />
            </View>
            <View style={styles.content}>
                {useSkia ? <SkiaDeck /> : <ReanimatedDeck />}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: '#222',
    },
    label: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
    },
});
