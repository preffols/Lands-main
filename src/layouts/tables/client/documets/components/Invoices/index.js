import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Invoice from "layouts/billing/components/Invoice";

function Invoices() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetch("http://localhost/backend/web5/title_deeds/")
      .then((response) => response.json())
      .then((data) => setInvoices(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox
        pt={2}
        px={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <MDTypography variant="h6" fontWeight="medium">
          Land Deeds
        </MDTypography>
        <MDButton variant="outlined" color="info" size="small">
          Search
        </MDButton>
      </MDBox>
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {invoices.map((invoice, index) => (
            <Invoice
              id={invoice.id}
              key={index}
              title_deed={invoice.title_deed}
              deed_number={invoice.deed_number}
              date={invoice.expiary_date}
            />
          ))}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default Invoices;
