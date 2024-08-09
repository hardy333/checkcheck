import { Box, Container } from "@mui/material";
import { useState } from "react";
import { groups } from "./data";
import Header from "./components/Header";
import Left from "./components/Left";
import Right from "./components/Right";

export type CheckItemsGroupType = {
  groupId: string;
  checkedChildrenIds: string[];
  isSelectAll: boolean;
}[];

const App = () => {
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

  return (
    <Container sx={{ pb: 2 }}>
      <Header />
      <Box
        sx={{
          display: "flex",
          // alignItems: "start",
          gap: 2,
        }}
      >
        {/* Left */}
        <Left checkedArr={checkedArr} setCheckedArr={setCheckedArr} />
        {/* Right */}
        <Right
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
