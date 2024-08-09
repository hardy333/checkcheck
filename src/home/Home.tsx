import { Box, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexShrink: 0,
        flexGrow: 1,
        justifyContent: "center",
        height: 200,
        gap: 2,
        alignItems: "center",
      }}
    >
      <Link to="/page1">
        <Card>
          <CardContent>V1</CardContent>
        </Card>
      </Link>

      <Link to="/page3">
        <Card>
          <CardContent>V3</CardContent>
        </Card>
      </Link>
      <Link style={{ display: "block" }} to="/page2">
        <Card>
          <CardContent>V2</CardContent>
        </Card>
      </Link>
    </Box>
  );
};

export default Home;
