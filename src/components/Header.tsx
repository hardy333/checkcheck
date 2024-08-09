import { Box, Button, TextField, Typography } from "@mui/material";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import { useState } from "react";
const Header = () => {
  const [name, setname] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (name === "") {
      setError("Please enter group name");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        py: 1,
        mb: 2,
      }}
    >
      <Typography variant="h4" textAlign="center" my={2}>
        Create New group
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <TextField
          label="New Group Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          sx={{
            minHeight: "100%",
            maxHeight: "200px",
            // bgcolor: "red",
            "& input": {
              height: "100%",
              maxHeight: "200px",
              minHeight: "100%",
              borderColor: "green",
            },
          }}
          helperText={error}
          FormHelperTextProps={{
            style: {
              color: "red",
            },
          }}
        />
        <Button
          onClick={handleSubmit}
          endIcon={<CenterFocusWeakIcon />}
          size="large"
          sx={{ height: "100%", marginLeft: "auto" }}
          variant="contained"
        >
          Create Group
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
