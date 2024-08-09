import { Box, Button, TextField, Typography } from "@mui/material";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import { Dispatch, useState } from "react";
type Props = {
  newGroupName: string;
  setNewGroupName: Dispatch<React.SetStateAction<string>>;
  createGroup: () => void;
  disableCreateButton: boolean;
};

const Header = ({
  newGroupName,
  setNewGroupName,
  createGroup,
  disableCreateButton,
}: Props) => {
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (newGroupName === "") {
      setError("Please enter group name");
    } else {
      createGroup();
    }
  };

  console.log(disableCreateButton);

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
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
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
          disabled={disableCreateButton}
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
