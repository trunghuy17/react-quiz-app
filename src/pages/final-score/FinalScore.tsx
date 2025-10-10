import {
  Box,
  Button,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import type { CandidateInfo, RootState } from "../../types";
import { addCandidate } from "../../redux/app.action";
import { useForm } from "react-hook-form";

interface IFormValues {
  firstName: string;
  lastName: string;
  email: string;
}

function FinalScore() {
  const score = useSelector((state: RootState) => state.app.score);
  const candidates = useSelector((state: RootState) => state.app.candidates);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //stateForm
  const {
    register,
    handleSubmit,
    formState: { errors},
  } = useForm<IFormValues>({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });
  const onSubmit = (data: IFormValues) => {
    const payload: CandidateInfo = {
      ...data,
      score: score ?? 0,
    };
    const updatedCandidates = [...candidates, payload];
    dispatch(addCandidate(updatedCandidates));
    navigate("/leaderboard");
  };

  return (
    <>
      <Box sx={{ maxWidth: 900, mx: "auto", px: 2, mt: 4 }}>
        <Typography variant="h3" sx={{ my: 4 }}>
          Final Score: {score}
        </Typography>
        <form action="" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={4}>
            <FormControl fullWidth>
              <TextField
                id="firstName"
                label="First Name"
                variant="standard"
                {...register("firstName", {
                  required: "First name is required",
                  minLength:{value: 2, message: "Must be at least 2 characters"},
                  maxLength:{value: 15, message:"Must be 15 characters or less"}
                })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                id="lastName"
                label="Last Name"
                variant="standard"
                {...register("lastName",{
                  required:"Last name is required",
                  minLength:{value: 2, message: "Must be at least 2 characters"},
                  maxLength:{value: 15, message:"Must be 15 characters or less"}
                })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                id="email"
                label="Email Address"
                variant="standard"
                {...register("email",{
                  required:"Email address is required",
                  pattern:{
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address"
                  },
                  validate:(v) => 
                    !candidates.some((c) => c.email.toLowerCase() === v.toLowerCase()) ||
                  "This email is already exists",
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
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
