import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavButton } from "../components/nav-button";
import { ReactComponent as ParkIcon } from "../icons/park.svg";
import { ReactComponent as LeaveIcon } from "../icons/leave.svg";
import { ReactComponent as PayIcon } from "../icons/pay.svg";

import "./main.scss";
import { getTotalSpots, getLength } from "../services/db";
import { Loading } from "../components/loading";

export const Main: React.SFC = props => {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      setTotal(await getLength());
      setLoading(false);
    };
    getData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="main-screen">
      <div className="main-screen-inner">
        <div className="lot-totals">{getTotalSpots() - total} spots available</div>
        <NavButton to="/park" icon={<ParkIcon />}>
          Park Car
        </NavButton>
        <NavButton to="/pay" icon={<PayIcon />}>
          Pay & Leave
        </NavButton>
      </div>
    </div>
  );
};
