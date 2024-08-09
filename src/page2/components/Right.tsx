import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Collapse,
  List,
  ListItem,
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
import { Dispatch, useEffect, useState } from "react";
import { Group, Item } from "../../data";
import {
  does_array_contains_array,
  does_arrays_have_intersecting_elems,
  remove_array_from_array,
} from "../../utils/methods";

type Props = {
  selectMode: "add" | "delete";
  setSelectMode: Dispatch<React.SetStateAction<"add" | "delete">>;
  makeChange: (a: string[]) => void;
  // checkItemGroups: {
  //   groupId: string;
  //   checkedChildrenIds: string[];
  //   isSelectAll: boolean;
  // }[];
  // setCheckItemGroups: Dispatch<React.SetStateAction<CheckItemsGroupType[]>>;
  items: Item[];
  groups: Group[];
  reset: boolean;
  setReset: Dispatch<React.SetStateAction<boolean>>;
};

const Right = ({
  selectMode,
  setSelectMode,
  makeChange,
  // checkItemGroups,
  // setCheckItemGroups,
  items,
  groups,
  reset,
  setReset,
}: Props) => {
  const [collapseGroupIds, setCollapseGroupIds] = useState<string[]>([]);
  const [allGroupsSelectedIds, setAllgroupsSelectedIds] = useState<string[]>(
    []
  );

  const groupCollapse = true;

  const handleGroupCollapse = (groupId: string) => {
    if (!groupCollapse) return false;
    if (collapseGroupIds.includes(groupId)) {
      setCollapseGroupIds(collapseGroupIds.filter((id) => id !== groupId));
    } else {
      setCollapseGroupIds([...collapseGroupIds, groupId]);
    }
  };

  const handleGroupCheckboxChange = (itemId: string) => {
    const alreadyChecked = allGroupsSelectedIds.includes(itemId);
    if (alreadyChecked) {
      setAllgroupsSelectedIds(
        allGroupsSelectedIds.filter((id) => id != itemId)
      );
    } else {
      setAllgroupsSelectedIds([...allGroupsSelectedIds, itemId]);
    }
  };

  const handleGroupTopCheckboxChange = (groupId: string) => {
    const group = groups.find((g) => g.id === groupId) as Group;
    const isAllChecked = does_array_contains_array(
      allGroupsSelectedIds,
      group?.children
    );
    if (isAllChecked) {
      const res = remove_array_from_array(allGroupsSelectedIds, group.children);
      setAllgroupsSelectedIds(res);
    } else {
      ///
      const arr = [...allGroupsSelectedIds, ...group.children];
      const res = Array.from(new Set(arr));
      setAllgroupsSelectedIds(res);
    }
  };

  const handleModeChange = (x: unknown, mode: "add" | "delete") => {
    console.log(x);

    setSelectMode(mode);
  };

  useEffect(() => {
    if (reset) {
      setAllgroupsSelectedIds([]);
      setReset(false);
    }
  }, [reset, setReset]);

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
      <CardContent sx={{ pt: 1 }}>
        <Typography variant="caption">Choose from groups</Typography>
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
          {/* Group */}
          {/* Group */}
          {groups.map((group) => {
            /* Old */
            // const currCheckedItemGroup = checkItemGroups.find(
            //   (g) => g.groupId === group.id
            // ) as CheckItemsGroupType;

            // const isGroupSelectAll =
            //   currCheckedItemGroup.checkedChildrenIds.length ===
            //   group.children.length;
            /* new */
            const isGroupSelectAll = does_array_contains_array(
              allGroupsSelectedIds,
              group.children
            );

            const hasSharedIds = does_arrays_have_intersecting_elems(
              allGroupsSelectedIds,
              group.children
            );

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
                    indeterminate={hasSharedIds && !isGroupSelectAll}
                    checked={isGroupSelectAll}
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

                {/* Item */}
                {/* Item */}
                <Collapse in={collapseGroupIds.includes(group.id)}>
                  {group.children.map((itemId) => {
                    // const checkedGroup = checkItemGroups.find(
                    //   (checkedItemGroup) => checkedItemGroup.groupId == group.id
                    // );

                    // let isItemChecked = false;

                    // if (checkedGroup) {
                    //   isItemChecked =
                    //     checkedGroup.checkedChildrenIds.includes(itemId);
                    // }
                    const isItemChecked = allGroupsSelectedIds.includes(itemId);

                    return (
                      <List key={itemId} component="div" disablePadding>
                        <ListItemButton
                          sx={{ pl: 4 }}
                          onClick={() => handleGroupCheckboxChange(itemId)}
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

          <Box sx={{}}>
            <Typography variant="caption">All Selected items</Typography>
            <List>
              {[
                ...allGroupsSelectedIds,
                ...items
                  .filter((item) => !allGroupsSelectedIds.includes(item.id))
                  .map((i) => i.id),
              ].map((id) => {
                return (
                  <ListItem key={id} disablePadding>
                    <ListItemButton
                      role="button"
                      onClick={() => {
                        handleGroupCheckboxChange(id);
                      }}
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="end"
                          checked={allGroupsSelectedIds.includes(id)}
                          tabIndex={-1}
                          disableRipple
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={items.find((i) => i.id === id)?.name}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Stack>

        <Stack justifyContent={"center"} mt={2}>
          <Button
            onClick={() => makeChange(allGroupsSelectedIds)}
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
