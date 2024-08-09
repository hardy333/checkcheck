import { Box, Container } from "@mui/material";
import { useState } from "react";
import { Group, groups as initGroups, items as initItems } from "./data";
import Header from "./components/Header";
import Left from "./components/Left";
import Right from "./components/Right";
import { nanoid } from "nanoid";
import { remove_array_from_array } from "./utils/methods";

export type CheckItemsGroupType = {
  groupId: string;
  checkedChildrenIds: string[];
  isSelectAll: boolean;
};

const App = () => {
  const [items, setItms] = useState(initItems);
  const [groups, setGroups] = useState(initGroups);
  const [newGroupName, setNewGroupName] = useState("");

  // Left Side Logic Start
  const [checkedArr, setCheckedArr] = useState<string[]>([]);
  // Left Side Logic End

  /*  Make Changes in group */
  const [selectMode, setSelectMode] = useState<"add" | "delete">("add");

  const makeChange = (idsArr: string[]) => {
    if (selectMode === "add") {
      setCheckedArr([...idsArr]);
    } else {
      const res = remove_array_from_array(checkedArr, idsArr);
      setCheckedArr(res);
    }
  };

  const [reset, setReset] = useState(false);

  // Finalll
  const createGroup = () => {
    const g: Group = {
      id: nanoid(),
      name: newGroupName,
      children: [...checkedArr],
    };
    setReset(true);

    setGroups([...groups, g]);
  };

  return (
    <Container sx={{ pb: 2 }}>
      <Header
        disableCreateButton={checkedArr.length === 0}
        newGroupName={newGroupName}
        setNewGroupName={setNewGroupName}
        createGroup={createGroup}
      />
      <Box
        sx={{
          display: "flex",
          // alignItems: "start",
          gap: 2,
        }}
      >
        {/* Left */}
        <Left
          items={items}
          checkedArr={checkedArr}
          setCheckedArr={setCheckedArr}
        />
        {/* Right */}
        <Right
          reset={reset}
          setReset={setReset}
          items={items}
          groups={groups}
          makeChange={makeChange}
          selectMode={selectMode}
          setSelectMode={setSelectMode}
        />
      </Box>
    </Container>
  );
};

export default App;
