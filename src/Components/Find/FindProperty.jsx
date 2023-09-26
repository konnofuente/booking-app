/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import React, { useContext, useEffect, useState } from "react";
import { MediaQueryContext } from "../../Hooks/MediaQueryContext";
import {
  Grid,
  TextField,
} from "@mui/material";

import axios from "axios";
import { useGetFilteredMutation } from "../Home/LuxuryRoomSlice";
import { BsPlugin, BsArrowDownCircleFill } from "react-icons/bs";
import { deleteEmptyKeys } from "../SingleItems/Other/Functions";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Loading, { Error } from "../SingleItems/Loading/Loading";
import Properties from "./Properties";
import { ImFilter } from "react-icons/im";
import { animateScroll as scroll } from "react-scroll";
import myData from "./List.json";


const picHeader = css`
  height: 400px;
  background-position: center;

  & h1 {
    text-align: center;
    font-size: 45px;
    color: white;
    font-weight: 500;
  }

  &::after {
    content: "";
    width: 100%;
    height: 400px;
    position: absolute;
    left: 0px;
    right: 0px;
    background-color: #0e1317;
    opacity: 0.8;
  }
`;

const picContent = css`
  z-index: 100;
  left: 0px;
  right: 0px;
  margin: 140px auto;
  width: 100vw;
  position: absolute;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  height: 50vh;
`;
const flxDivCss = css`
  margin-top: 20px;
  margin: 0px auto;
  width: fit-content;
  padding: 30px;
`;

function FindProperty() {
  const [searchTerm, setSearchTerm] = useState("");
  const [giaIds, setGid] = useState("");
  const medias = useContext(MediaQueryContext);
  const [
    getData,
    { data, status, error, isLoading, isError, isSuccess, isUninitialized },
  ] = useGetFilteredMutation();
  const [isFetching, setFetching] = useState(false);


  const [checkInDate, setCheckinDate] = useState(dayjs());
  const [checkOutDate, setCheckOutDate] = useState(dayjs());

  const fetchData = async () => {
    (() => {
      setFetching(true);
      scroll.scrollTo(400);
    })();

    console.log("Lol");
    const options = {
      method: "GET",
      url: "https://hotels4.p.rapidapi.com/locations/v3/search",
      params: { q: searchTerm },
      headers: {
        "X-RapidAPI-Key": "7d266fe8e5mshaa6c100f384b6efp1fea46jsn72d95cb12846",
        "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      (() => {
        setFetching(false);
      })();
      setGid(response.data.sr[0].gaiaId);
    } catch (e) {
      console.log(e);
    }
  };
  

  const filtersContainer = css`
    border: 1px solid #e7e7e8;
    padding: 20px;
    margin: auto;
  `;

  const hotelTypeBody = {
    currency: "USD",
    locale: "en_US",
    destination: {
      regionId: giaIds,
    },
    checkInDate: {
      day: checkInDate.$d.getDate(),
      month: checkInDate.$d.getMonth() + 1,
      year: checkInDate.$d.getFullYear(),
    },
    checkOutDate: {
      day: checkOutDate.$d.getDate() + 2,
      month: checkOutDate.$d.getMonth() + 1,
      year: checkOutDate.$d.getFullYear(),
    },
    rooms: [
      {
        adults: 1,
        children: [
          {
            age: 5,
          },
        ],
      },
    ],
    resultsStartingIndex: 0,
    resultsSize: 200,
    sort: "PRICE_LOW_TO_HIGH",

  };
  let content = <p>Enter a search term</p>;
  const contentContainer = css`
    margin: ${medias.DT || medias.TB ? "100px 20px" : "100px 10px"};

    & h1 {
      text-align: center;
      font-size: 25px;
      color: #0e1317;
      font-weight: 500;
    }
  `;

  useEffect(() => {
    let isUnfetched = true;

    if (giaIds == null || giaIds == "" || giaIds == undefined) {
      return () => {
        isUnfetched = false;
      };
    }

    getData(deleteEmptyKeys(hotelTypeBody));

    return () => {
      isUnfetched = false;
    };
  }, [giaIds]);

 

  const radioStyles = {
    "&.Mui-checked": { color: "#b89146" },
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };



  if (isLoading || isFetching) {
    content = <Loading />;
  } else if (isUninitialized && giaIds.length < 1 && !isFetching) {
    content = <h1>Enter Location to get Started</h1>;
  } else if (
    data &&
    data != null &&
    data?.data?.propertySearch?.properties.length > 0
  ) {
    content = <Properties properties={data.data.propertySearch.properties} />;
  } else if (isError) {
    content = <Error />;
  }

  return (
    <div>
      <div css={picHeader}>
        <div css={picContent}>
          <h1>Where are you headed to ?</h1>
          <Grid container spacing={1} css={flxDivCss}>
            <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
              <DatePicker
                value={checkInDate}
                slotProps={{
                  textField: {
                    variant: "filled",
                    error: checkInDate.$d.getDate() < dayjs().$d.getDate(),
                  },
                }}
                sx={{ background: "#f0f0f0", width: "99%" }}
                label="Check-In"
                onChange={(e) => {
                  setCheckinDate(e);
                }}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
              <DatePicker
                value={checkOutDate}
                slotProps={{
                  textField: {
                    variant: "filled",
                    error: checkOutDate < checkInDate,
                  },
                }}
                sx={{ background: "#f0f0f0", width: "99%" }}
                label="Check-Out"
                onChange={(e) => {
                  setCheckOutDate(e);
                }}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
              <TextField
                id="outlined-basic"
                label="Location"
                variant="filled"
                style={{ background: "white", width: "99%" }}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
              <button
                onClick={fetchData}
                style={{ width: "100%", height: "100%" }}
                disabled={
                  checkOutDate < checkInDate ||
                  checkInDate.$d.getDate() < dayjs().$d.getDate() ||
                  searchTerm.length < 3
                }
              >
                SEARCH
              </button>
            </Grid>
          </Grid>
        </div>
      </div>

      <div css={contentContainer}>
        <div
          style={{
            width: "fit-content",
            margin: "20px auto",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <h1>Make sure you select filters if any, before searching</h1>
          <BsArrowDownCircleFill color="#b89146" size={50} />
        </div>

        <Grid container spacing={1}>
          <Grid item xl={2} lg={2} md={2} sm={12} xs={12}>
            <div>
              <h1></h1>
            </div>
          </Grid>
          <Grid item xl={10} lg={10} md={10} sm={12} xs={12}>
            <div style={{ padding: "30px" }}>{content}</div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default FindProperty;
