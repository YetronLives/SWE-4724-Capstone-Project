import "./Comparison.css";
import { useState } from "react";
import Tooltip from "../pages/Tooltip.jsx";
import HospitalDropdown from "../pages/Dropdown.jsx";
import testData from "../data/testData.json";

export function Comparison() {
  const hospitalList = Object.values(testData).map(
    (entry) => entry.hospitalInfo.name
  );

  const [selectedHospitals, setSelectedHospitals] = useState(["", "", "", ""]);

  const handleHospitalSelect = (index, hospitalName) => {
    const newSelections = [...selectedHospitals];
    newSelections[index] = hospitalName;
    setSelectedHospitals(newSelections);
  };

  const getHospitalData = (hospitalName) => {
    const hospital = Object.values(testData).find(
      (entry) => entry.hospitalInfo.name === hospitalName
    );
    return hospital ? hospital.hospitalInfo : {};
  };

  return (
    <div className="comparison-page">
      <div className="banner">
        <h1><strong>Hospital Accountability Scores</strong></h1>
      </div>

      <div className="header">
        <h1><strong>Comparison Hospitals</strong></h1>
      </div>

      <div className="container">
        <div className="left">
          <div className="filter">
            <h5>Sort By</h5>
            <button><h6>City</h6></button>
            <button><h6>County</h6></button>
            <button><h6>Beds Available</h6></button>

            <Tooltip
              position="top"
              background="#6fb353"
              content="Gotta build logic for filtering."
            >
              <button style={{ backgroundColor: "#6fb353" }}>
                <h6 style={{ margin: 0 }}>Trauma Level</h6>
              </button>
            </Tooltip>
          </div>
        </div>

        <div className="right">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Metrics</th>
                {selectedHospitals.map((_, index) => (
                  <th key={index}>
                    <HospitalDropdown
                      hospitals={hospitalList}
                      onSelect={(name) => handleHospitalSelect(index, name)}
                    />
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="metricRow">Hospital Name</td>
                {selectedHospitals.map((name, i) => (
                  <td key={i} className="gradeRow">
                    {name || "-"}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="metricRow">City</td>
                {selectedHospitals.map((name, i) => {
                  const data = getHospitalData(name);
                  return <td key={i}>{data.city || "-"}</td>;
                })}
              </tr>

              <tr>
                <td className="metricRow">County</td>
                {selectedHospitals.map((name, i) => {
                  const data = getHospitalData(name);
                  return <td key={i}>{data.county || "-"}</td>;
                })}
              </tr>

              <tr>
                <td className="metricRow">Bed Size</td>
                {selectedHospitals.map((name, i) => {
                  const data = getHospitalData(name);
                  return <td key={i}>{data.bedSize || "-"}</td>;
                })}
              </tr>

              <tr>
                <td className="metricRow">Zipcode</td>
                {selectedHospitals.map((name, i) => {
                  const data = getHospitalData(name);
                  return <td key={i}>{data.zipcode || "-"}</td>;
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

