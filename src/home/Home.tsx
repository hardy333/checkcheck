import { Box, Card, CardContent, List, ListItem } from "@mui/material";
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
        p: 5,
      }}
    >
      {/* 0 */}
      <Link to="/page0">
        <Card>
          <CardContent>
            <h3>V0</h3>
            <List>
              <ListItem>ჯგუფების ჩამოშლა </ListItem>
              <ListItem>ჯგუფბის ქვედა სია გამორთულია</ListItem>
            </List>
          </CardContent>
        </Card>
      </Link>
      {/* 1 */}
      <Link to="/page1">
        <Card>
          <CardContent>
            <h3>V1</h3>
            <List>
              <ListItem>ჯგუფების ჩამოშლა </ListItem>
              <ListItem>ჯგუფბის ქვედა სია </ListItem>
              <ListItem>ქვედა სიაში აჩვენებს მარტო დაჩექილებს </ListItem>
            </List>
          </CardContent>
        </Card>
      </Link>
      {/* 2 */}
      <Link style={{ display: "block" }} to="/page2">
        <Card>
          <CardContent>
            <h3>V2</h3>
            <h4>ყველზე მიინიმალისტური</h4>
            <List>
              <ListItem>ჯგუფების ჩამოშლა </ListItem>
              <ListItem>ჯგუფბის ქვედა სია </ListItem>
              <ListItem>ქევდა სიაში ყველა ოფშენი ჩანს </ListItem>
            </List>
          </CardContent>
        </Card>
      </Link>
      {/* 3 */}
      <Link to="/page3">
        <Card>
          <CardContent>
            <h3>V3</h3>
            <h4>ყველზე მიინიმალისტური</h4>
            <List>
              <ListItem>ჯგუფების ჩამოშლა გამორთულია</ListItem>
              <ListItem>ჯგუფბის ქვედა სია გამორთულია</ListItem>
            </List>
          </CardContent>
        </Card>
      </Link>
      <Link to="/page4">
        <Card>
          <CardContent>
            <h3>V4</h3>
            <h4>ყველზე მიინიმალისტური</h4>
            <List>
              <ListItem>ჯგუფების ჩამოშლა გამორთულია</ListItem>
              <ListItem>ჯგუფბის ქვედა სია ჩანს </ListItem>
            </List>
          </CardContent>
        </Card>
      </Link>
      <Link to="/page5">
        <Card>
          <CardContent>
            <h3>V5</h3>
            <h4>ყველზე მიინიმალისტური</h4>
            <List>
              <ListItem>ჯგუფების ჩამოშლა გამორთულია</ListItem>
              <ListItem>ჯგუფბის ქვედა სია ჩანს </ListItem>
            </List>
          </CardContent>
        </Card>
      </Link>
    </Box>
  );
};

export default Home;
