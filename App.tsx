import React, { JSX, useState } from 'react';
import {View,Text,TextInput,Button,StyleSheet,Keyboard,TouchableWithoutFeedback,} from 'react-native';

// Generate a random number between 1 and 100
const genRandNum = (): number => Math.floor(Math.random() * 100) + 1;

export default function App(): JSX.Element {
  const [mysteryNum, setMysteryNum] = useState<number>(genRandNum());
  const [guessNum, setGuessNum] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [guessCount, setGuessCount] = useState<number>(0);
  const [gameEnd, setGameEnd] = useState<boolean>(false);

  const check = (): void => {
    const guess: number = parseInt(guessNum, 10);

    if (isNaN(guess)) {
      setFeedback('Enter a valid number.');
      return;
    }

    if (guess == -1) {
      setFeedback('Thanks for playing!');
      setGameEnd(true);
      return;
    }

    setGuessCount(prev => prev + 1);

    if (guess < mysteryNum) {
      setFeedback('Too Low!');
    } else if (guess > mysteryNum) {
      setFeedback('Too High!');
    } else {
      setFeedback(`You got it in ${guessCount + 1} tries!`);
      setGameEnd(true);
    }

    setGuessNum('');
  };

  const reset = (): void => {
    setMysteryNum(genRandNum());
    setGuessNum('');
    setFeedback('');
    setGuessCount(0);
    setGameEnd(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Can You Guess the Number!!! (1–100)</Text>

        <TextInput
          style={styles.input}
          value={guessNum}
          onChangeText={setGuessNum}
          placeholder="Your guess"
          keyboardType="numeric"
          editable={!gameEnd}
        />

        <Button title="Submit" onPress={check} disabled={gameEnd} />
        <Text style={styles.message}>{feedback}</Text>
        <Text style={styles.tries}>Tries: {guessCount}</Text>

        <Button title="Restart" onPress={reset} />
      </View>
    </TouchableWithoutFeedback>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffc0cb',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#008080',
  },
  input: {
    borderWidth: 1,
    borderColor: '#b8b8b8',
    borderRadius: 8,
    padding: 10,
    width: '60%',
    marginBottom: 10,
    backgroundColor: '#eaddca',
    textAlign: 'center',
    fontSize: 28,
  },
  message: {
    fontSize: 28,
    marginVertical: 10,
    color: '#000000',
    textAlign: 'center',
  },
  tries: {
    fontSize: 28,
    color: '#157fa',
    marginBottom: 20,
  },
});