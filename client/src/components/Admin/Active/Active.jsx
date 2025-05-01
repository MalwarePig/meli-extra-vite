import React, { useState, useEffect } from "react";
import TableWithFilterAndSort from "../../Tables/table";
import "./Active.scss";
import Functions from "./Functions";

export default function Active() {
  const [data, setData] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await Functions();
        setData(result);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } 
    };

    fetchData();
  }, []);

 
  return (
    <div className="Card-Active">
       <h2>Drivers activos</h2>
        <TableWithFilterAndSort data={data} />
    </div>
  );
}