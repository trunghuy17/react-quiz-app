import React from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router";
import type { ICategory } from "../../types";
import { useDispatch } from "react-redux";
import { setForm } from "../../redux/app.action";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [categories, setCategories] = React.useState<ICategory[]>([])

  React.useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('https://opentdb.com/api_category.php');
        const data = await res.json();
        setCategories(data.trivia_categories);
      } catch(err)  {
        console.error('fetchCategories err: ', err)
      }
    }
    fetchCategories();
  }, [])

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const form = {
      category: '12',
      amount: 5,
      difficulty: 'medium',
      type: 'multiple'
    };
    dispatch(setForm(form))
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
            // value={age}
            label="Category"
            // onChange={handleChange}
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
            // value={age}
            label="Difficulty"
            // onChange={handleChange}
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
            // value={age}
            label="Type"
            // onChange={handleChange}
          >
            <MenuItem value="multiple">Multiple Choice</MenuItem>
            <MenuItem value="boolean">True/False</MenuItem>
          </Select>
        </FormControl>

        <br /><br />

        <FormControl fullWidth>
          <TextField id="amount" label="Amount" variant="outlined" />
        </FormControl>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button type="submit" variant="contained">GET STARTED</Button>
        </Box>

      </form>
    </>
  )
}

export default Dashboard