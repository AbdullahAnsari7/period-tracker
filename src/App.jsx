import React, { useState, useEffect } from "react";
import ProgressRing from "./components/ProgressRing";
import "./styles.css";

function daysBetween(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
}

function getPhase(lastStartDate, cycleLength = 28) {
  const daysPassed = daysBetween(lastStartDate, new Date());
  const pct = daysPassed / cycleLength;
  if (pct < 0.15) return "menstrual";
  if (pct < 0.5) return "follicular";
  if (pct < 0.65) return "ovulatory";
  return "luteal";
}

function getNextPeriodDate(lastStartDate, cycleLength) {
  const start = new Date(lastStartDate);
  start.setDate(start.getDate() + cycleLength);
  return start.toLocaleDateString();
}

// Details and background color per phase
const phaseDetails = {
  menstrual: { label: "Menstrual", color: "#E57373", tip: "Rest and hydrate." },
  follicular: { label: "Follicular", color: "#64B5F6", tip: "Best time for new habits!" },
  ovulatory: { label: "Ovulatory", color: "#81C784", tip: "Peak fertility. Track ovulation!" },
  luteal: { label: "Luteal", color: "#FFD54F", tip: "Self-care is important." }
};

// Progress ring color per phase (dark red for menstrual)
const ringColors = {
  menstrual: "#800000",      // Maroon (much darker)
  follicular: "#1976D2",     // Deep blue
  ovulatory: "#388E3C",      // Rich green
  luteal: "#FFA000"          // Deep orange/yellow
};

function App() {
  const [lastStartDate, setLastStartDate] = useState("2025-11-03");
  const [cycleLength, setCycleLength] = useState(31);
  const [showBounce, setShowBounce] = useState(false);
  const [fadeInDate, setFadeInDate] = useState(false);

  const daysPassed = daysBetween(lastStartDate, new Date());
  const phase = getPhase(lastStartDate, cycleLength);
  const { label: phaseLabel, color: themeColor, tip: phaseTip } = phaseDetails[phase];
  const progressPercent = Math.min(100, Math.round((daysPassed / cycleLength) * 100));
  const nextPeriodDate = getNextPeriodDate(lastStartDate, cycleLength);

  useEffect(() => {
    setFadeInDate(false);
    const timer = setTimeout(() => setFadeInDate(true), 100);
    return () => clearTimeout(timer);
  }, [nextPeriodDate]);

  function handleAddCycle() {
    setShowBounce(true);
    setTimeout(() => setShowBounce(false), 600);
  }

  return (
    <div
      style={{
        backgroundColor: themeColor,
        minHeight: "100vh",
        padding: "2rem",
        transition: "background 0.8s"
      }}
    >
      <h1>Period Tracker</h1>
      <h2>Current Phase: <span className="bounce">{phaseLabel}</span></h2>
      <p style={{ margin: "1rem 0", fontSize: "1.2rem", fontWeight: "bold" }}>
        You are in <span style={{ textDecoration: "underline" }}>{phaseLabel}</span> phase.<br />
        <span style={{ fontStyle: "italic", color: "#222" }}>{phaseTip}</span>
      </p>
      <div style={{ marginBottom: "1rem" }}>
        {/* Pass the ring color for the current phase */}
        <ProgressRing
          radius={60}
          stroke={10}
          progress={progressPercent}
          color={ringColors[phase]}
        />
      </div>
      <p>{daysPassed} days since last period start</p>

      <label>
        Last Start Date:{" "}
        <input
          type="date"
          value={lastStartDate}
          onChange={e => setLastStartDate(e.target.value)}
        />
      </label>
      <br /><br />
      <label>
        Cycle Length (days):{" "}
        <input
          type="number"
          min="20"
          max="40"
          value={cycleLength}
          onChange={e => setCycleLength(Number(e.target.value))}
        />
      </label>

      <div style={{ margin: "2rem 0", fontWeight: "bold" }}>
        Next predicted period:&nbsp;
        <span className={fadeInDate ? "fade-in" : ""}>
          {nextPeriodDate}
        </span>
      </div>

      <button onClick={handleAddCycle}>Add Cycle</button>
      {showBounce && (
        <div className="bounce" style={{ display: "inline-block", marginLeft: 12 }}>
          New cycle added!
        </div>
      )}
    </div>
  );
}

export default App;

