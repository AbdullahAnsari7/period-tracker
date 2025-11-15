import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AddCycleForm({ onAdded }) {
  const [date, setDate] = useState("");
  const [cycleLength, setCycleLength] = useState(28);
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!date) return alert("Select a start date");

    setSaving(true);

    const { data, error } = await supabase
      .from("cycles")
      .insert([
        { start_date: date, cycle_length: Number(cycleLength), note }
      ])
      .select()
      .limit(1);

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    // Notify parent component
    onAdded && onAdded(data[0]);

    // Reset form
    setDate("");
    setNote("");
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <label>
        Cycle Start Date
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>

      <label>
        Cycle Length (days)
        <input
          type="number"
          min="21"
          max="40"
          value={cycleLength}
          onChange={(e) => setCycleLength(e.target.value)}
        />
      </label>

      <label>
        Note (optional)
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </label>

      <button type="submit" disabled={saving}>
        {saving ? "Saving..." : "Add Cycle"}
      </button>
    </form>
  );
}
