import React, { useEffect, useState } from "react";

import { Box, Button, styled, Typography, useMediaQuery } from "@mui/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getUserCollections } from "../state/collectionsSlice";
import AppsIcon from "@mui/icons-material/Apps";
import { shades } from "../theme";
import { FlexBox } from "../components/FlexBox";
import CreateCollection from "./CreateCollection";
import AddIcon from "@mui/icons-material/Add";

const Collections = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const ismobile = useMediaQuery("(max-width:767px)");

  useEffect(() => {
    dispatch(getUserCollections());
  }, []);

  const { collections } = useSelector(
    (state) => state.collectionsReducer,
    shallowEqual
  );

  console.log(collections);

  return (
    <Box p={{ xs: "30px 10px", md: "30px 120px" }}>
      <CreateCollection {...{ open, setOpen }} />
      <FlexBox justifyContent="space-between">
        <Typography fontWeight={600} my="30px" fontSize="24px">
          Collections
        </Typography>
        <Button
          variant="contained"
          sx={{ textTransform: "none" }}
          onClick={() => setOpen(true)}
        >
          <AddIcon
            fontSize="small"
            sx={{
              mr: "5px",
            }}
          />
          Create collection
        </Button>
      </FlexBox>
      <Grid ismobile={ismobile.toString()}>
        {collections.map((node, idx) => (
          <Box key={idx}>
            <FlexBox gap="10px">
              <AppsIcon />
              <Typography fontWeight={500} fontSize="13px">
                {node.name}
              </Typography>
            </FlexBox>
          </Box>
        ))}
        <Box onClick={() => setOpen(true)}>
          <FlexBox>
            <AddIcon
              fontSize="small"
              sx={{
                mr: "5px",
              }}
            />
            <Typography fontWeight={500} fontSize="13px">
              Create collection
            </Typography>
          </FlexBox>
        </Box>
      </Grid>
    </Box>
  );
};

export default Collections;

const Grid = styled(Box)(({ ismobile }) => ({
  display: "grid",
  gridAutoRows: "110px",
  gridTemplateColumns: `${
    ismobile === "true" ? "repeat(2, 1fr)" : "repeat(auto-fill,235px)"
  }`,
  gap: "10px",
  "> div:not(:last-child)": {
    cursor: "pointer",
    background: `${shades.secondary[300]}`,
    padding: `${ismobile === "true" ? "20px 10px" : "20px"}`,
    borderRadius: "8px",
    ":hover": {
      background: `${shades.secondary[400]}`,
    },
  },
  "> div:last-child": {
    cursor: "pointer",
    padding: "20px",
    borderRadius: "8px",
    border: `1.5px dashed ${shades.secondary[500]}`,
    ":hover": { border: `1.5px dashed ${shades.secondary[600]}` },
  },
  "> div:first-of-type": {
    gridColumn: `${ismobile === "true" ? "auto/span 2" : "auto/span 1"}`,
    gridRow: `${ismobile === "true" ? "auto/span 1" : "auto/span 2"}`,
  },
}));
