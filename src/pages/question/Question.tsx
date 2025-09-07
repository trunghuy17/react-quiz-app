import { Box, Button, Typography } from '@mui/material'
import React from 'react';
import { useSelector } from 'react-redux'
import { decode } from 'html-entities';
import type { IQuestion, RootState } from '../../types';
import { useNavigate } from 'react-router';


/*
https://opentdb.com/api.php?amount=5&category=12&difficulty=medium&type=boolean -> get questions
*/
function Question() {
  const navigate = useNavigate();
  const form = useSelector((state: RootState) => state.app.form);

  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [dataSource, setDataSource] = React.useState<IQuestion[]>([]);
  const [options, setOptions] = React.useState<string[]>([]);
  const [score, setScore] = React.useState(0);

  React.useEffect(() => {
    const { amount, category, difficulty, type } = form;
    if (!amount || !category || !difficulty || !type) return;

    async function fetchQuestions() {
      try {
        const res = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`);
        const data = await res.json();
        const dataSource = data.results;
        const question = dataSource[questionIndex] as IQuestion;
        const options = [...question.incorrect_answers];
        options.splice(Math.floor(Math.random() * 4), 0, question.correct_answer)

        setOptions(options);
        setDataSource(dataSource)
      } catch(err)  {
        console.error('fetchCategories err: ', err)
      }
    }
    fetchQuestions();
  }, [form]);

  // next question
  React.useEffect(() => {
    if (questionIndex === 0) return;

    const question = dataSource[questionIndex];
    const options = [...question.incorrect_answers];
    options.splice(Math.floor(Math.random() * 4), 0, question.correct_answer)
    setOptions(options);
  }, [dataSource, questionIndex])

  function handleAnwser(content: string) {
    const question = dataSource[questionIndex];

    if (content === question.correct_answer) {
      // increase score
      setScore(prevState => prevState + 1)
    }

    if (questionIndex + 1 === dataSource.length) {
      navigate('/final-score');
      return;
    }

    setQuestionIndex(prevState => prevState + 1)
  }

  if (dataSource.length === 0) return (
    <div>Loading ...</div>
  )

  return (
    <>
      <Typography variant="h3" gutterBottom sx={{ textAlign: 'center' }}>
        Question {questionIndex + 1}
      </Typography>

      <Typography variant="body1" gutterBottom>
        {decode(dataSource[questionIndex]?.question)}
      </Typography>

      <br /><br />
      <Box>
        {options.map(option => (
          <Button key={option} variant="contained" fullWidth sx={{ mb: 2 }} onClick={() => handleAnwser(option)}>{decode(option)}</Button>
        ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Typography variant="body1" gutterBottom >
          Score: {score}/{dataSource.length}
        </Typography>
        <Typography variant="body1" gutterBottom >
          Timer: 0:10
        </Typography>
      </Box>
    </>
  )
}

export default Question