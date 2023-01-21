import React, { useContext, useEffect } from "react";
import { LoyaltyContext } from "../context/LoyaltyContext";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import "../css/tooltip.css";


const CustomerRequestsView = () => {
  const { customerRequestAddressArray, customerRequestFetch } = useContext(LoyaltyContext);

  useEffect(()=>{
    const interval = setInterval(() => {
      customerRequestFetch()
    }, 5000);

    return () => clearInterval(interval);
  },[])

  return (
    <div className="bg-purple-200" style={{ minHeight: "100vh" }}>
      <h1 className="text-3xl font-semibold text-black text-center">
        Pending Customer Requests
      </h1>
      <center>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            width: "500px",
            backgroundColor: "#66498c",
            borderRadius: "2rem",
          }}
        >
          {customerRequestAddressArray.map((request, idx) => {
            if(request == "0x0000000000000000000000000000000000000000")
            {
              return null
            }
            
            return (
              <>
                <div
                  key={idx}
                  style={{
                    display: "inline-block",
                    margin: " 1rem auto 0",
                    backgroundColor: "#8952d1",
                    borderColor: "#a77be0",
                    borderWidth: "3px",
                    borderRadius: "2rem",
                    padding: "1rem",
                    color: "white",
                    cursor:"pointer"
                  }}
                  onClick={() => navigator.clipboard.writeText(request)}
                  className="tooltip"
                >
                  {idx+1}. {request} <ContentPasteIcon /> <span className="tooltiptext" style={{backgroundColor:"#9674c2", color:"#FFF"}}>Click to copy</span>
                </div>
              </>
            );
          })}
        </div>
      </center>
    </div>
  );
};

export default CustomerRequestsView;
