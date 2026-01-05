import React, { useMemo, useEffect } from 'react';
import { StyleSheet, View, Button, Dimensions } from 'react-native';
import { Canvas, Rect, Group } from '@shopify/react-native-skia';
import { useSharedValue, useDerivedValue, withTiming } from 'react-native-reanimated';

const CARD_COUNT = 78;
const { width, height } = Dimensions.get('window');
const CARD_WIDTH = 60;
const CARD_HEIGHT = 100;

interface SkiaCardProps {
    index: number;
    shuffleSignal: number;
}

const SkiaCard = ({ index, shuffleSignal }: SkiaCardProps) => {
    const x = useSharedValue(width / 2 - CARD_WIDTH / 2);
    const y = useSharedValue(height / 2 - CARD_HEIGHT / 2);
    const rotation = useSharedValue(0);

    useEffect(() => {
        x.value = withTiming(Math.random() * (width - CARD_WIDTH), { duration: 1000 });
        y.value = withTiming(Math.random() * (height - CARD_HEIGHT), { duration: 1000 });
        rotation.value = withTiming(Math.random() * 360, { duration: 1000 });
    }, [shuffleSignal]);

    // Reanimated useDerivedValue creates a ReadonlySharedValue that Skia accepts in 'transform'
    const transform = useDerivedValue(() => {
        return [
            { translateX: x.value },
            { translateY: y.value },
            { rotate: (rotation.value * Math.PI) / 180 },
        ];
    });

    return (
        <Group origin={{ x: CARD_WIDTH / 2, y: CARD_HEIGHT / 2 }} transform={transform}>
            {/* Card Body */}
            <Rect x={0} y={0} width={CARD_WIDTH} height={CARD_HEIGHT} color="white" />
            {/* Card Border/Inner */}
            <Rect x={2} y={2} width={CARD_WIDTH - 4} height={CARD_HEIGHT - 4} color="#333" style="stroke" strokeWidth={1} />
            <Rect x={5} y={5} width={CARD_WIDTH - 10} height={CARD_HEIGHT - 10} color="#1E1E1E" />
        </Group>
    );
};

export const SkiaDeck = () => {
    const [shuffleSignal, setShuffleSignal] = React.useState(0);
    const cards = useMemo(() => Array.from({ length: CARD_COUNT }), []);

    return (
        <View style={styles.container}>
            <Button title="Shuffle (Skia)" onPress={() => setShuffleSignal(s => s + 1)} />
            <Canvas style={styles.canvas}>
                {cards.map((_, i) => (
                    <SkiaCard key={i} index={i} shuffleSignal={shuffleSignal} />
                ))}
            </Canvas>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    },
    canvas: {
        flex: 1,
    },
});
