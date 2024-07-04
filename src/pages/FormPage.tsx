import {
  Box,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<number | "">("");
  const navigate = useNavigate();

  const handleFormData = () => {
    const userData: { name: string; email: string; phoneNumber: number | "" } =
      {
        name,
        email,
        phoneNumber,
      };
    localStorage.setItem("userInfo", JSON.stringify(userData));
    navigate("/data");
  };

  return (
    <Box
      height={650}
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={" center"}
    >
      <Box
        height={"auto"}
        width={"50%"}
        my={4}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        p={4}
        borderRadius={10}
        border={"2px solid rgb(196 187 187 / 87%)"}
        sx={{
          padding: "1rem",
          borderRadius: "25px",
          backgroundColor: "#ffffff",
          boxShadow: "0px 12px 18px rgba(0, 0, 0, 0.2)",
          "&:hover": {
            boxShadow: "0px 4px 8px rgb(196 187 187 / 87%)",
          },
        }}
      >
        <Typography component="h1" variant="h3" mt={4} mb={2} color={"black"}>
          Save Your Details
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            label="Name"
            id="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="number"
            label="Phone Number"
            name="number"
            type="number"
            value={phoneNumber}
            onChange={(e) =>
              setPhoneNumber(
                e.target.value === "" ? "" : parseInt(e.target.value)
              )
            }
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            size="large"
            onClick={handleFormData}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FormPage;
