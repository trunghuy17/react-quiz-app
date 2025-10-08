import {
  Box,
  Button,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import type { CandidateInfo, RootState } from "../../types";
import { addCandidate } from "../../redux/app.action";

function FinalScore() {
  const score = useSelector((state: RootState) => state.app.score);
  const candidates = useSelector((state: RootState) => state.app.candidates);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [candidate, setCandidate] = useState<CandidateInfo>({
    firstName: "",
    lastName: "",
    email: "",
    score: score ?? 0
  })
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const updatedCandidates =  [...candidates, candidate];
    dispatch(addCandidate(updatedCandidates));
    navigate('/leaderboard');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCandidate({
      ...candidate,
      [event.target.id]: event.target.value
    })
  }
  return (
    <>
      <Box sx={{ maxWidth: 900, mx: "auto", px: 2, mt: 4 }}>
        <Typography variant="h3" sx={{ my: 4 }}>
          Final Score: {score}
        </Typography>
        <form action="" onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl fullWidth>
              <TextField id="firstName" label="First Name" variant="standard" onChange={handleChange}/>
            </FormControl>
            <FormControl fullWidth>
              <TextField id="lastName" label="Last Name" variant="standard" onChange={handleChange}/>
            </FormControl>
            <FormControl fullWidth>
              <TextField id="email" label="Email Address" variant="standard" onChange={handleChange}/>
            </FormControl>
            <Box textAlign="right">
              <Button
                type="submit"
                variant="contained"
                sx={{ cursor: "pointer" }}
              >
                SUBMIT
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </>
  );
}

export default FinalScore;
