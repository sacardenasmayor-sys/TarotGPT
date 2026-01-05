import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>TarotGPT</Text>
      <Link href="/spike" style={{ color: 'blue', fontSize: 18 }}>
        Go to Animation Spike (MVP-07)
      </Link>
    </View>
  );
}

