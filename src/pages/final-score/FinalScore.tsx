import {
  Box,
  Button,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

function FinalScore() {
  const navigate = useNavigate();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    navigate("/leader-board");
  }
  return (
    <>
      <Box sx={{ maxWidth: 900, mx: "auto", px: 2, mt: 4 }}>
        <Typography variant="h3" sx={{ my: 4 }}>
          Final Score: 0
        </Typography>
        <form action="" onSubmit={submit}>
          <Stack spacing={4}>
            <FormControl fullWidth>
              <TextField id="firstName" label="First Name" variant="standard" />
            </FormControl>
            <FormControl fullWidth>
              <TextField id="lastName" label="Last Name" variant="standard" />
            </FormControl>
            <FormControl fullWidth>
              <TextField id="email" label="Email Address" variant="standard" />
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
