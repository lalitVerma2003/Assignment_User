import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import React, { useState } from "react";

interface DepartmentProps {
  department: {
    department: string;
    sub_departments: string[];
  };
}

const Department: React.FC<DepartmentProps> = ({ department }) => {
  const [show, setShow] = useState<boolean>(false);
  const initialCheckedState = Array.from(
    { length: department.sub_departments.length },
    () => false
  );
  const [check, setCheck] = useState<boolean[]>(initialCheckedState);

  const handleChangePar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCheck=check.map(()=> event.target.checked);
    setCheck(newCheck);
  };

  const checkPar=():boolean=>{
    const res=check.reduce((res,cur)=>{
      return res=res&&cur;
    },true);
    return res;
  }

  const handleCheck = (idx: number) => {
    const newArr = check.map((c, i) => {
      if (i === idx) return !c;
      return c;
    });
    setCheck(newArr);
  };

  return (
    <Box>
      <IconButton onClick={() => setShow(!show)}>
        {!show ? <Add /> : <Remove />}
      </IconButton>
      <FormControlLabel
        label={`${department.department}  (${department.sub_departments.length})`}
        control={
          <Checkbox
            onChange={handleChangePar}
            checked={checkPar()}
          />
        }
      />
      <Box ml={4}>
        {show &&
          department.sub_departments?.map((sub, idx) => (
            <FormControlLabel
              key={idx}
              label={sub}
              control={
                <Checkbox
                  key={idx}
                  checked={check[idx]}
                  onChange={() => handleCheck(idx)}
                />
              }
              style={{display:"block",marginLeft:"10px"}}
            />
          ))}
      </Box>
    </Box>
  );
};

export default Department;
