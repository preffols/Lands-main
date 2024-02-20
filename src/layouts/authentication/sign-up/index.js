/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link, redirect, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import LandAbi from "./../../../contractsData/Land.json";
import LandAddress from "./../../../contractsData/Land-address.json";
import LandProcessAbi from "./../../../contractsData/LandProcess.json";
import LandProcessAddress from "./../../../contractsData/LandProcess-address.json";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

import axios from "axios";
import { ethers } from "ethers";
import { useState, useEffect } from "react";

function Cover() {
  const [full_name, setFull_name] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [password, setPassword] = useState("");
  const [land, setLand] = useState();
  const [land_process, setLand_process] = useState();
  const navigation = useNavigate();

  const handlePassword = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };
  const handlePhone_number = (event) => {
    event.preventDefault();
    setPhone_number(event.target.value);
  };

  const handleFull_name = (event) => {
    event.preventDefault();
    setFull_name(event.target.value);
  };

  const handleSubmit = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/"
    );
    const wallet = ethers.Wallet.createRandom().connect(provider);

    const landProcessContract = new ethers.Contract(
      LandProcessAddress.address,
      LandProcessAbi.abi,
      wallet
    );
    setLand_process(landProcessContract);

    const landsContract = new ethers.Contract(
      LandAddress.address,
      LandAbi.abi,
      wallet
    );
    setLand(landsContract);

    const address = await wallet.getAddress();
    //  console.log("Wallet address:", address);

    // Get the private key of the wallet
    const privateKey = wallet.privateKey;

    axios
      .post("http://localhost/backend/web5/users/index.php", {
        full_name: full_name,
        phone_number: phone_number,
        password: password,
        address: address.toString(),
        private_key: privateKey.toString(),
        public_key: address.toString(),
        wallet: address.toString(),
        land: JSON.stringify(landsContract),
        land_process: JSON.stringify(landProcessContract),
      })
      .then(function (response) {
        console.log("-----------start--------");
        console.log(response.data);
        console.log("----end----------");

        navigation("authentication/sign-in/", {
          land: land,
        });
      });
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Register
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your details
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Name"
                variant="standard"
                onChange={handleFull_name}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Phone Number"
                variant="standard"
                onChange={handlePhone_number}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                variant="standard"
                onChange={handlePassword}
                fullWidth
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                onClick={handleSubmit}
                fullWidth
              >
                sign up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
