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
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import DraftsIcon from "@mui/icons-material/Drafts";
// import SendIcon from "@mui/icons-material/Send";
import SubdirectoryArrowLeftIcon from "@mui/icons-material/SubdirectoryArrowLeft";
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

const Right = ({
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
  const handleModeChange = (_, mode: "add" | "delete") => {
    setSelectMode(mode);
  };

  return (
    <Card
      sx={{
        flexGrow: 1,
        // bgcolor: (theme) => theme.palette.grey[50],
        // maxWidth: 400,
        borderColor: selectMode === "add" ? "green" : "red",
        width: 200,
      }}
      variant="outlined"
    >
      <CardContent>
        <Stack direction={"row"}>
          <Tabs
            value={selectMode}
            onChange={handleModeChange}
            TabIndicatorProps={{
              style: {
                backgroundColor: selectMode === "add" ? "green" : "red",
              },
            }}
            aria-label="basic tabs example"
          >
            <Tab value={"add"} label={"add"} />
            <Tab value="delete" label={"delete"} />
          </Tabs>
        </Stack>

        <Stack
          gap={1}
          sx={{
            overflowY: "auto",
            height: window.innerHeight - 300,
          }}
        >
          {groups.map((group) => {
            return (
              <List
                key={group.id}
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                  borderRadius: 2,
                }}
                component="nav"
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: (theme) => `1px solid ${theme.palette.grey[200]}`,
                    borderRadius: 1,
                  }}
                >
                  <Checkbox
                    checked={
                      checkItemGroups.find((g) => g.groupId === group.id)
                        ?.isSelectAll
                    }
                    onChange={() => handleGroupTopCheckboxChange(group.id)}
                  />
                  <ListItemButton
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                    }}
                    onClick={() => handleGroupCollapse(group.id)}
                  >
                    <ListItemText primary={group.name} />
                    {collapseGroupIds.includes(group.id) ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </ListItemButton>
                </Box>

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
          })}
        </Stack>

        <Stack justifyContent={"center"} mt={2}>
          <Button
            onClick={makeChange}
            variant="contained"
            color={selectMode === "add" ? "success" : "error"}
            startIcon={<SubdirectoryArrowLeftIcon />}
          >
            {selectMode === "add"
              ? "Add Selected items"
              : "Remove Selected items"}
          </Button>
        </Stack>
        {/* List End */}
      </CardContent>
    </Card>
  );
};

export default Right;
