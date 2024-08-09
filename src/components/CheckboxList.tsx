// takes array of ids, ids represent some items which we want to select in list
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import { Item } from "../data";

import { Dispatch, useState } from "react";

type Props = {
  checkedArr: string[];
  setCheckedArr: Dispatch<React.SetStateAction<string[]>>;
  items: Item[];
};

const CheckboxList = ({ checkedArr, setCheckedArr, items }: Props) => {
  const [isSelectAll, setIsSelectAll] = useState(false);

  const handleToggle = (item: Item) => () => {
    if (checkedArr.includes(item.id)) {
      setCheckedArr(checkedArr.filter((id) => id !== item.id));
      setIsSelectAll(false);
    } else {
      setCheckedArr([...checkedArr, item.id]);

      if (checkedArr.length + 1 === items.length) {
        setIsSelectAll(true);
      }
    }
  };

  const toggleSelectAll = () => {
    if (isSelectAll) {
      setIsSelectAll(false);
      setCheckedArr([]);
    } else {
      setIsSelectAll(true);
      setCheckedArr(items.map((item) => item.id));
    }
  };

  return (
    <Card
      sx={{
        flexGrow: 1,
      }}
      variant="outlined"
    >
      <CardContent>
        <Stack direction="row" alignItems="center" justifyContent="start">
          <Checkbox
            checked={isSelectAll}
            indeterminate={!isSelectAll && checkedArr.length > 0}
            onChange={() => toggleSelectAll()}
          />
          <Typography sx={{ m: 0 }} variant="h6" mb={2}>
            All items
          </Typography>
        </Stack>

        <Box
          sx={{
            // height: window.innerHeight - 200,
            overflowY: "auto",
          }}
        >
          <List>
            {items.map((item) => {
              return (
                <ListItem key={item.id} disablePadding>
                  <ListItemButton role="button" onClick={handleToggle(item)}>
                    <ListItemIcon>
                      <Checkbox
                        edge="end"
                        checked={checkedArr.includes(item.id)}
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CheckboxList;
