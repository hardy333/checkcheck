import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Group, groups as initGroups, items as initItems } from "./data";
import Header from "./components/Header";
import Left from "./components/Left";
import Right from "./components/Right";
import { nanoid } from "nanoid";

export type CheckItemsGroupType = {
  groupId: string;
  checkedChildrenIds: string[];
  isSelectAll: boolean;
}[];

const App = () => {
  const [items, setItms] = useState(initItems);
  const [groups, setGroups] = useState(initGroups);
  const [newGroupName, setNewGroupName] = useState("");

  // Left Side Logic Start
  // Left Side Logic Start
  const [checkedArr, setCheckedArr] = useState<string[]>([]);
  // Left Side Logic End
  // Left Side Logic End

  // Right Side Logic Start
  // Right Side Logic Start
  const [checkItemGroups, setCheckItemGroups] = useState<CheckItemsGroupType>(
    () => {
      return groups.map((g) => ({
        groupId: g.id,
        checkedChildrenIds: [],
        isSelectAll: false,
      }));
    }
  );
  // Right Side Logic End
  // Right Side Logic End

  /*  Make Changes in group */
  const [selectMode, setSelectMode] = useState<"add" | "delete">("add");

  const makeChange = () => {
    if (selectMode === "add") {
      addSelectedChecks();
    } else {
      removeSelectedChecks();
    }
  };

  const addSelectedChecks = () => {
    const newArr = [...checkedArr];
    checkItemGroups.forEach((g) => {
      g.checkedChildrenIds.forEach((id) => {
        newArr.push(id);
      });
    });

    const arr = Array.from(new Set(newArr));
    setCheckedArr(arr);
  };

  const removeSelectedChecks = () => {
    const newArr: string[] = [];

    checkedArr.forEach((checkedId) => {
      let shouldStay = true;

      checkItemGroups.forEach((g) => {
        if (g.checkedChildrenIds.includes(checkedId)) {
          shouldStay = false;
        }
      });

      if (shouldStay) {
        newArr.push(checkedId);
      }
    });

    setCheckedArr(newArr);
  };
  /*  Make Changes in group */

  const createGroup = () => {
    const g: Group = {
      id: nanoid(),
      name: newGroupName,
      children: [...checkedArr],
    };

    setGroups([...groups, g]);
  };

  console.log(groups);

  useEffect(() => {
    setCheckItemGroups(() => {
      return groups.map((g) => ({
        groupId: g.id,
        checkedChildrenIds: [],
        isSelectAll: false,
      }));
    });
  }, [groups]);

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
          items={items}
          groups={groups}
          checkItemGroups={checkItemGroups}
          makeChange={makeChange}
          selectMode={selectMode}
          setCheckItemGroups={setCheckItemGroups}
          setSelectMode={setSelectMode}
        />
      </Box>
    </Container>
  );
};

export default App;
