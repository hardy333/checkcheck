import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

// import CommentIcon from "@mui/icons-material/Comment";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { groups, items } from "../data";
import { Dispatch, useState } from "react";
import { CheckItemsGroupType } from "../App";

type Props = {
  selectMode: "add" | "delete";
  setSelectMode: Dispatch<React.SetStateAction<"add" | "delete">>;
  makeChange: () => void;
  checkItemGroups: {
    groupId: string;
    checkedChildrenIds: string[];
    isSelectAll: boolean;
  }[];
  setCheckItemGroups: Dispatch<React.SetStateAction<CheckItemsGroupType>>;
};

const RightV2 = ({
  selectMode,
  setSelectMode,
  makeChange,
  checkItemGroups,
  setCheckItemGroups,
}: Props) => {
  const [collapseGroupIds, setCollapseGroupIds] = useState<string[]>([]);

  const handleGroupCollapse = (groupId: string) => {
    if (collapseGroupIds.includes(groupId)) {
      setCollapseGroupIds(collapseGroupIds.filter((id) => id !== groupId));
    } else {
      setCollapseGroupIds([...collapseGroupIds, groupId]);
    }
  };

  const handleGroupCheckboxChange = (groupId: string, itemid: string) => {
    const currGroup = checkItemGroups.find((g) => g.groupId === groupId);

    const isChecked = currGroup
      ? currGroup.checkedChildrenIds.includes(itemid)
      : false;

    if (isChecked) {
      setCheckItemGroups((groups) =>
        groups.map((g) =>
          g.groupId !== groupId
            ? g
            : {
                ...g,
                checkedChildrenIds: g.checkedChildrenIds.filter(
                  (id) => id !== itemid
                ),
              }
        )
      );
    } else {
      setCheckItemGroups((groups) =>
        groups.map((g) =>
          g.groupId !== groupId
            ? g
            : { ...g, checkedChildrenIds: [...g.checkedChildrenIds, itemid] }
        )
      );
    }
  };

  const handleGroupTopCheckboxChange = (groupId: string) => {
    console.log(groupId);
    const g = checkItemGroups.find((g) => g.groupId === groupId);
    console.log(g);

    if (g?.isSelectAll) {
      setCheckItemGroups(
        checkItemGroups.map((g) =>
          g.groupId !== groupId
            ? g
            : {
                ...g,
                isSelectAll: false,
                checkedChildrenIds: [],
              }
        )
      );
    } else {
      setCheckItemGroups(
        checkItemGroups.map((g) =>
          g.groupId !== groupId
            ? g
            : {
                ...g,
                isSelectAll: true,
                checkedChildrenIds:
                  groups
                    .find((g) => g.id === groupId)
                    ?.children.map((id) => id) || [],
              }
        )
      );
    }
  };

  return (
    <Card
      sx={{
        flexGrow: 1,
        bgcolor: (theme) => theme.palette.grey[50],
      }}
    >
      <CardContent>
        <Stack direction={"row"}>
          <Button onClick={makeChange} variant="text" color="info">
            make change
          </Button>
          <Button
            onClick={() => setSelectMode("delete")}
            variant={selectMode === "delete" ? "contained" : "outlined"}
            color="error"
          >
            delete mode
          </Button>
          <Button
            onClick={() => setSelectMode("add")}
            variant={selectMode === "add" ? "contained" : "outlined"}
            color="success"
          >
            add Mode
          </Button>
        </Stack>

        <Box>
          {selectMode === "add" ? (
            <Typography>Selected items will be added in left </Typography>
          ) : (
            <Typography>Selected items will be removed from left </Typography>
          )}
        </Box>

        <Stack
          gap={1}
          sx={{
            alignItems: "center",
            height: window.innerHeight - 100,
            overflowY: "auto",
          }}
        >
          {groups.map((group) => {
            return (
              <List
                key={group.id}
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                  borderRadius: 2,
                }}
                component="nav"
              >
                <ListItemButton onClick={() => handleGroupCollapse(group.id)}>
                  <ListItemIcon>
                    {/* Top Checkbox */}
                    <Checkbox
                      checked={
                        checkItemGroups.find((g) => g.groupId === group.id)
                          ?.isSelectAll
                      }
                      onChange={() => handleGroupTopCheckboxChange(group.id)}
                    />
                  </ListItemIcon>
                  <ListItemText primary={group.name} />
                  {collapseGroupIds.includes(group.id) ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </ListItemButton>
                <Collapse in={collapseGroupIds.includes(group.id)}>
                  {group.children.map((itemId) => {
                    const checkedGroup = checkItemGroups.find(
                      (checkedItemGroup) => checkedItemGroup.groupId == group.id
                    );

                    let isItemChecked = false;

                    if (checkedGroup) {
                      isItemChecked =
                        checkedGroup.checkedChildrenIds.includes(itemId);
                    }

                    return (
                      <List key={itemId} component="div" disablePadding>
                        <ListItemButton
                          sx={{ pl: 4 }}
                          onClick={() =>
                            handleGroupCheckboxChange(group.id, itemId)
                          }
                        >
                          <ListItemIcon>
                            <Checkbox
                              edge="end"
                              tabIndex={-1}
                              disableRipple
                              checked={isItemChecked}
                            />
                          </ListItemIcon>

                          <ListItemText
                            primary={
                              items.find((item) => item.id === itemId)?.name
                            }
                          />
                        </ListItemButton>
                      </List>
                    );
                  })}
                </Collapse>
              </List>
            );
            b;
          })}
        </Stack>
        {/* List End */}
      </CardContent>
    </Card>
  );
};

export default RightV2;
