import React, { useEffect } from "react";
import Quiz from "./Quiz";
import axios from "axios";

interface QuizAnswer {
    id: number,
    quiz_id: number,
    text: string,
    is_correct: boolean
}

interface Quiz {
    id: number,
    question: string,
    answers: QuizAnswer[]
}

const dummyQuizData: Quiz[] = [
  {
    id: 1,
    question: "What happened to Aaron Swartz?",
    answers: [
        {
            id: 1,
            quiz_id: 1,
            text: "idk",
            is_correct: false,
        },
        {
            id: 2,
            quiz_id: 1,
            text: "better not to answer",
            is_correct: true,
        },
        {
            id: 3,
            quiz_id: 1,
            text: "hmm",
            is_correct: false,
        },
        {
            id: 4,
            quiz_id: 1,
            text: "aliens",
            is_correct: false,
        },
    ]
  },
];

const QuizzesPage: React.FC = () => {
  const API_URL = "http://localhost:8000/api/v1/quizzes/";
  const [quizzes, setQuizzes] = React.useState<Quiz[]>([]);

  const fetchQuizzes = () => {
    axios
      .get<Quiz[]>(API_URL)
      .then((response) => {
        setQuizzes(response.data);
      })
      .catch((error) => {
        console.error("Error while fetching quizzes:", error);
        setQuizzes(dummyQuizData);
      });
  };

  useEffect(() => {
    fetchQuizzes();
    const interval = setInterval(() => {
      fetchQuizzes();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {quizzes.map((quiz, index) => (
        <Quiz
          key={index}
          question={quiz.question}
          answers={quiz.answers.map((a) => (a.text))}
          correctAnswerIndex={quiz.answers.findIndex((a) => (a.is_correct))}
        />
      ))}
    </div>
  );
};

export default QuizzesPage;
