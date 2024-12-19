import React, { useState } from "react";
import "./App.css";

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris"
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars"
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Shakespeare", "Dickens", "Hemingway", "Austen"],
    answer: "Shakespeare"
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: "Pacific"
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["H2O", "O2", "CO2", "H2SO4"],
    answer: "H2O"
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Da Vinci", "Picasso", "Dali"],
    answer: "Da Vinci"
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "South Korea", "Japan", "Thailand"],
    answer: "Japan"
  },
  {
    question: "What is the square root of 64?",
    options: ["6", "7", "8", "9"],
    answer: "8"
  },
  {
    question: "Who was the first president of the United States?",
    options: ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "John Adams"],
    answer: "George Washington"
  }
];

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const handleAnswer = (option) => {
    if (answered) return;

    const isCorrect = option === questions[currentQuestionIndex].answer;
    if (isCorrect) {
      setScore(score + 1);
    }

    // Save the user's answer (correct or incorrect)
    setUserAnswers([
      ...userAnswers,
      { question: questions[currentQuestionIndex].question, answer: option, isCorrect }
    ]);

    setAnswered(true);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswered(false);
    } else {
      alertSummary();
    }
  };

  const alertSummary = () => {
    const correctAnswers = userAnswers.filter((answer) => answer.isCorrect);
    const incorrectAnswers = userAnswers.filter((answer) => !answer.isCorrect);

    const correctText = correctAnswers
      .map((answer) => `Q: ${answer.question}\nA: ${answer.answer}\n`)
      .join("\n");
    const incorrectText = incorrectAnswers
      .map((answer) => `Q: ${answer.question}\nA: ${answer.answer}\n`)
      .join("\n");

    alert(
      `Quiz finished! Your score is: ${score}\n\nCorrect Answers:\n${correctText}\nIncorrect Answers:\n${incorrectText}`
    );
  };

  return (
    <div className="quiz-container">
      <h1>Quiz</h1>
      <div className="question">
        <h2>{questions[currentQuestionIndex].question}</h2>
        <div className="options">
          {questions[currentQuestionIndex].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={answered}
              className="option-btn"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {answered && (
        <button className="next-btn" onClick={nextQuestion}>
          Next Question
        </button>
      )}
    </div>
  );
};

export default App;
