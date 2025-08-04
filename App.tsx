import React, { JSX, useState } from 'react';
import {View,Text,TextInput,StyleSheet,Keyboard,TouchableWithoutFeedback,TouchableHighlight} from 'react-native';

// Generate a random number between 1 and 100
const genRandNum = (): number => Math.floor(Math.random() * 100) + 1;

export default function App(): JSX.Element {
  const [mysteryNum, setMysteryNum] = useState<number>(genRandNum());
  const [guessNum, setGuessNum] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [guessCount, setGuessCount] = useState<number>(0);
  const [gameEnd, setGameEnd] = useState<boolean>(false);

  // Handle user guess
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
      setFeedback('Too Low! Try again.');
    } else if (guess > mysteryNum) {
      setFeedback('Too High! Try again.');
    } else {
      setFeedback(`Congratulations! You guessed it in ${guessCount + 1} tries.`);
      setGameEnd(true);
    }

    setGuessNum('');
  };

  // Restart the game
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
        <Text style={styles.title}>Mystery Number Challenge</Text>

        <TextInput
          style={styles.input}
          value={guessNum}
          onChangeText={setGuessNum}
          placeholder="Enter your guess"
          keyboardType="numeric"
          editable={!gameEnd}
        />

        <TouchableHighlight
          style={styles.button}
          onPress={check}
          underlayColor="#ffb6c1"
          disabled={gameEnd}
        >
          <Text style={styles.buttonText}>Submit Guess</Text>
        </TouchableHighlight>

        <Text style={styles.feedback}>{feedback}</Text>
        <Text style={styles.counter}>Total Guesses: {guessCount}</Text>

        <TouchableHighlight
          style={styles.button}
          onPress={reset}
          underlayColor="#ffb6c1"
        >
          <Text style={styles.buttonText}>Restart Game</Text>
        </TouchableHighlight>
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#008080',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#b8b8b8',
    borderRadius: 8,
    padding: 10,
    width: '70%',
    marginBottom: 10,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
  feedback: {
    fontSize: 20,
    marginVertical: 10,
    color: '#000',
    textAlign: 'center',
  },
  counter: {
    fontSize: 18,
    color: '#157fa',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ff69b4',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});