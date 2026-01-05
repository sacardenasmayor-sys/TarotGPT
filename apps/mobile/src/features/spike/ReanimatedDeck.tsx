import React from 'react';
import { StyleSheet, View, Button, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withDelay } from 'react-native-reanimated';

const CARD_COUNT = 78;
const { width, height } = Dimensions.get('window');
const CARD_WIDTH = 60;
const CARD_HEIGHT = 100;

interface CardProps {
    index: number;
    shuffleSignal: number;
}

const Card = ({ index, shuffleSignal }: CardProps) => {
    const x = useSharedValue(width / 2 - CARD_WIDTH / 2);
    const y = useSharedValue(height / 2 - CARD_HEIGHT / 2);
    const rotation = useSharedValue(0);

    React.useEffect(() => {
        // Random position on shuffle
        x.value = withDelay(index * 5, withSpring(Math.random() * (width - CARD_WIDTH)));
        y.value = withDelay(index * 5, withSpring(Math.random() * (height - CARD_HEIGHT)));
        rotation.value = withDelay(index * 5, withSpring(Math.random() * 360));
    }, [shuffleSignal]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: x.value },
                { translateY: y.value },
                { rotate: `${rotation.value}deg` },
            ],
        };
    });

    return (
        <Animated.View style={[styles.card, animatedStyle]}>
            <View style={styles.cardInner} />
        </Animated.View>
    );
};

export const ReanimatedDeck = () => {
    const [shuffleSignal, setShuffleSignal] = React.useState(0);

    return (
        <View style={styles.container}>
            <Button title="Shuffle (Reanimated)" onPress={() => setShuffleSignal(s => s + 1)} />
            <View style={styles.deckContainer}>
                {Array.from({ length: CARD_COUNT }).map((_, i) => (
                    <Card key={i} index={i} shuffleSignal={shuffleSignal} />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    },
    deckContainer: {
        flex: 1,
    },
    card: {
        position: 'absolute',
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#333',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardInner: {
        width: '80%',
        height: '80%',
        backgroundColor: '#1E1E1E', // Dark back of card
        borderRadius: 4,
    }
});
