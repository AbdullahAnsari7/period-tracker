import React from "react";
import {
  nextCycleDate,
  cycleProgressPercent,
  daysUntilNext,
} from "../lib/calc";
import ProgressRing from "./ProgressRing";

export default function CycleCard({ cycle }) {
  if (!cycle)
    return (
      <div className="card">
        <p>No cycle added yet</p>
      </div>
    );

  const lastStart = cycle.start_date;
  const cycleLength = cycle.cycle_length || 28;

  const nextDate = nextCycleDate(lastStart, cycleLength);
  const percent = cycleProgressPercent(lastStart, cycleLength);
  const left = daysUntilNext(lastStart, cycleLength);

  return (
    <div className="card">
      <h3>Latest Cycle</h3>

      <p>
        <strong>Started on:</strong>{" "}
        {new Date(lastStart).toLocaleDateString()}
      </p>

      <p>
        <strong>Predicted next start:</strong>{" "}
        {new Date(nextDate).toLocaleDateString()}
      </p>

      <p>
        <strong>Days left:</strong> {left} day(s)
      </p>

      <div style={{ width: "150px", margin: "20px auto" }}>
        <ProgressRing percent={percent} />
      </div>
    </div>
  );
}
