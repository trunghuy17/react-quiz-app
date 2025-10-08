import React, { useEffect, useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, type SelectChangeEvent } from "@mui/material"
import { useNavigate } from "react-router";
import type { ICategory } from "../../types";
import { useDispatch } from "react-redux";
import { setForm, updateScore } from "../../redux/app.action";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [categories, setCategories] = useState<ICategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [amount, setAmount] = useState('');

  const fetchCategories = async () => {
    try {
      const res = await fetch('https://opentdb.com/api_category.php');
      const data = await res.json();
      setCategories(data.trivia_categories);
    } catch (err) {
      console.error('fetchCategories err: ', err)
    }
  }

  useEffect(() => {
    fetchCategories();
  }, [])

  const handleChangeCategory = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value);
  };

  const handleChangeDifficulty = (event: SelectChangeEvent<string>) => {
    setSelectedDifficulty(event.target.value);
  }

  const handleChangeType = (event: SelectChangeEvent<string>) => {
    setSelectedType(event.target.value);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const form = {
      category: selectedCategory,
      amount: Number(amount),
      difficulty: selectedDifficulty,
      type: selectedType
    };
    dispatch(setForm(form))
    dispatch(updateScore(0))
    navigate('/question')
  }

  return (
    <>
      <Typography variant="h3" gutterBottom sx={{ textAlign: 'center' }}>
        Quiz
      </Typography>

      <form onSubmit={submit}>
        <FormControl fullWidth>
          <InputLabel id="category">Category</InputLabel>
          <Select
            labelId="category"
            id="category"
            value={selectedCategory}
            label="Category"
            onChange={handleChangeCategory}
          >
            {categories.map(category => (
              <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <br /><br />

        <FormControl fullWidth>
          <InputLabel id="difficulty">Difficulty</InputLabel>
          <Select
            labelId="difficulty"
            id="difficulty"
            value={selectedDifficulty}
            label="Difficulty"
            onChange={handleChangeDifficulty}
          >
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
          </Select>
        </FormControl>

        <br /><br />

        <FormControl fullWidth>
          <InputLabel id="type">Type</InputLabel>
          <Select
            labelId="type"
            id="type"
            value={selectedType}
            label="Type"
            onChange={handleChangeType}
          >
            <MenuItem value="multiple">Multiple Choice</MenuItem>
            <MenuItem value="boolean">True/False</MenuItem>
          </Select>
        </FormControl>

        <br /><br />

        <FormControl fullWidth>
          <TextField id="amount" label="Amount" variant="outlined" value={amount} onChange={(e) => setAmount(e.target.value)}/>
        </FormControl>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button type="submit" variant="contained">GET STARTED</Button>
        </Box>

      </form>
    </>
  )
}

export default Dashboard