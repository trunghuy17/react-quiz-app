import { Box, Button, Typography } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import type { RootState } from "../../types";
import { useNavigate } from "react-router";
import moment from "moment";
import { saveAs } from "file-saver";

function LeaderBoard() {
  const navigate = useNavigate()
  const candidates = useSelector((state: RootState) => state.app.candidates ?? []);
  const gotoDashboard = () => {
    navigate('/dashboard')
  }

  const handleExportCsv = () => {
    const csvContent = candidates.map((candidate) => {
      return `${candidate.firstName},${candidate.lastName},${candidate.email},${candidate.score}`
    })
    const csvHeader = `First Name,Last Name,Email,Score`
    const csvData = `${csvHeader}\n${csvContent.join('\n')}`
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const fileName = `leaderboard-${moment().format('YYYY-MM-DD')}.csv`;
    saveAs(blob, fileName);
  }
  return (
    <>
      <Box sx={{ maxWidth: 900, mx: "auto", px: 2, mt: 4 }}>
        <Typography variant="h3" gutterBottom align="center">
          Leaderboard
        </Typography>
        <Box textAlign="right" sx={{ mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<DescriptionIcon />}
            sx={{ mr: 2 }}
            onClick={handleExportCsv}
            disabled={candidates.length === 0}
          >
            EXPORT CSV
          </Button>
          <Button variant="outlined" type="button" onClick={gotoDashboard}>
            Go Home
          </Button>
        </Box>
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {candidates.map((candidate, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {candidate.firstName}
                    </TableCell>
                    <TableCell>{candidate.lastName}</TableCell>
                    <TableCell>{candidate.email}</TableCell>
                    <TableCell>{candidate.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}

export default LeaderBoard;
