import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Department from "../Components/Department";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface MyData {
  userId: Number;
  id: Number;
  title: String;
  body: String;
}

const DataPage: React.FC = () => {
  const [data, setData] = useState<MyData[]>([]);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userInfo")!);

  useEffect(() => {
    if (!userData) {
      toast.error("You must save your info before accessing data page!");
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    setData(data);
  };

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "userId",
      headerName: "USER ID",
      width: 150,
    },
    {
      field: "title",
      headerName: "TITLE",
      width: 400,
    },
    {
      field: "body",
      headerName: "BODY",
      width: 700,
    },
  ];

  const rows: MyData[] = data?.map((d) => {
    return { userId: d.userId, id: d.id, title: d.title, body: d.body };
  });

  const departmentData = [
    {
      department: "customer_service",
      sub_departments: ["support", "customer_success"],
    },
    {
      department: "design",
      sub_departments: ["graphic_design", "product_design", "web_design"],
    },
  ];

  return (<>
    {userData&&data ? 
      <Box width={"100%"} display={"flex"} flexDirection={"column"}>
        <Box width={"100%"} my={2}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </Box>
        {/* Deparment Data Box */}
        <Box width={"auto"} height={500} px={4}>
            <Typography fontSize={50} fontStyle={"unset"}>Deparment Lists</Typography>
            <Box>
                {departmentData?.map((data,idx)=>(
                    <Department key={idx} department={data} />
                ))}
            </Box>
        </Box>
      </Box>
    : null}
  </>);
};

export default DataPage;