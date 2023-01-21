import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import { LoyaltyContext } from "../context/LoyaltyContext";
import { shortenAddress } from "../utils/shortenAddress";
import { TextField } from "@mui/material";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import "../css/tooltip.css";

const Profile = () => {
  const { currentAccount, allPoints } = useContext(LoyaltyContext);

  const ShowData = ({ textMsg }) => {
    return (
      <Typography variant="h6" gutterBottom>
        {textMsg}
      </Typography>
    );
  };

  return (
    <div
      className="border-4 border-blue-400 bg-blue-200 rounded-3xl"
      style={{ marginTop: "2rem" }}
    >
      <h1 className="text-3xl font-semibold text-black text-center">Profile</h1>
      {/* <div style={{margin: '1em auto 0'}}>
                <Avatar sx={{ bgcolor: deepPurple[500] }}>HS</Avatar>
            </div> */}
      {/* <Typography variant="h4" gutterBottom>
                Hartik Suhagiya
            </Typography> */}
      {/* <ShowData textMsg="0xAb8....835cb2" /> */}

      <p onClick={() => navigator.clipboard.writeText(currentAccount)} className="tooltip" style={{cursor:"pointer"}}>
        <ShowData textMsg={`Address: ${shortenAddress(currentAccount)}`} />
        <ContentPasteIcon />
        <span className="tooltiptext">Click to copy</span>
      </p>


      <ShowData
        textMsg={`Total Points: ${
          parseInt(allPoints.amazon) +
          parseInt(allPoints.flipkart) +
          parseInt(allPoints.myntra)
        }`}
      />
      <ShowData textMsg={`Amazon: ${allPoints.amazon}`} />
      <ShowData textMsg={`Flipkart: ${allPoints.flipkart}`} />
      <ShowData textMsg={`Myntra: ${allPoints.myntra}`} />
    </div>
  );
};

export default Profile;
