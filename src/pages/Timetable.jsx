import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { useTheme } from "@mui/material/styles";

export default function Timetable() {

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [rows, setRows] = useState([
    { className: "", from: "", to: "", subject: "" }
  ]);

  const [preview, setPreview] = useState(false);

  /* ===================== FUNCTIONS ===================== */

  const addRow = () => {
    setRows([...rows, { className: "", from: "", to: "", subject: "" }]);
  };

  const deleteRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const createTimetable = () => setPreview(true);
  const editTimetable = () => setPreview(false);

  const printTable = () => {
    window.print();
  };

  const downloadPDF = async () => {
    const element = document.getElementById("timetablePreview");
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save("timetable.pdf");
  };

  const downloadWord = () => {
    const content = document.getElementById("timetablePreview").innerHTML;

    const blob = new Blob(
      ["<html><body>" + content + "</body></html>"],
      { type: "application/msword" }
    );

    saveAs(blob, "timetable.doc");
  };

  /* ===================== STYLES ===================== */

  const styles = {
    container: {
      minHeight: "100vh",
      padding: "30px",
      background: isDark
        ? "linear-gradient(135deg, #0f172a, #020617)"
        : "linear-gradient(135deg, #f9f4ff, #eef2ff)",
    },

    card: {
      background: isDark
        ? "linear-gradient(145deg, #1e293b, #0f172a)"
        : "linear-gradient(145deg, #ffffff, #f1f5ff)",
      borderRadius: "18px",
      padding: "25px",
      maxWidth: "1000px",
      margin: "auto",
      boxShadow: isDark
        ? "0 10px 30px rgba(0,0,0,0.6)"
        : "0 10px 25px rgba(0,0,0,0.08)",
    },

    title: {
      fontSize: "26px",
      fontWeight: "700",
      marginBottom: "15px",
      color: isDark ? "#e2e8f0" : "#111",
    },

    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "15px",
      background: isDark ? "#0f172a" : "#fff",
      color: isDark ? "#e2e8f0" : "#000",
      borderRadius: "10px",
      overflow: "hidden",
    },

    th: {
      padding: "12px",
      background: isDark
        ? "linear-gradient(90deg, #1e293b, #334155)"
        : "linear-gradient(90deg, #6366f1, #8b5cf6)",
      color: "#fff",
      fontWeight: "600",
    },

    td: {
      padding: "10px",
      borderBottom: isDark ? "1px solid #334155" : "1px solid #eee",
    },

    input: {
      width: "100%",
      padding: "8px",
      borderRadius: "6px",
      border: "none",
      outline: "none",
      background: isDark ? "#1e293b" : "#f1f5f9",
      color: isDark ? "#fff" : "#000",
    },

    btn: {
      padding: "8px 16px",
      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      marginRight: "10px",
      marginTop: "10px",
    },

    delete: {
      background: "linear-gradient(135deg, #ef4444, #dc2626)",
      color: "#fff",
      border: "none",
      padding: "6px 10px",
      borderRadius: "6px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <div style={styles.title}>📅 Class Timetable</div>

        {!preview && (
          <>
            <button style={styles.btn} onClick={addRow}>
              + Add Row
            </button>

            <button style={styles.btn} onClick={createTimetable}>
              Create Timetable
            </button>
          </>
        )}

        {!preview && (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Class</th>
                <th style={styles.th}>From</th>
                <th style={styles.th}>To</th>
                <th style={styles.th}>Subject</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>

                  <td style={styles.td}>
                    <input
                      style={styles.input}
                      value={row.className}
                      onChange={(e) =>
                        handleChange(index, "className", e.target.value)
                      }
                    />
                  </td>

                  <td style={styles.td}>
                    <input
                      style={styles.input}
                      value={row.from}
                      onChange={(e) =>
                        handleChange(index, "from", e.target.value)
                      }
                    />
                  </td>

                  <td style={styles.td}>
                    <input
                      style={styles.input}
                      value={row.to}
                      onChange={(e) =>
                        handleChange(index, "to", e.target.value)
                      }
                    />
                  </td>

                  <td style={styles.td}>
                    <input
                      style={styles.input}
                      value={row.subject}
                      onChange={(e) =>
                        handleChange(index, "subject", e.target.value)
                      }
                    />
                  </td>

                  <td style={styles.td}>
                    <button
                      style={styles.delete}
                      onClick={() => deleteRow(index)}
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        )}

        {preview && (
          <>
            <div id="timetablePreview">
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Class</th>
                    <th style={styles.th}>From</th>
                    <th style={styles.th}>To</th>
                    <th style={styles.th}>Subject</th>
                  </tr>
                </thead>

                <tbody>
                  {rows.map((row, index) => (
                    <tr key={index}>
                      <td style={styles.td}>{row.className}</td>
                      <td style={styles.td}>{row.from}</td>
                      <td style={styles.td}>{row.to}</td>
                      <td style={styles.td}>{row.subject}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button style={styles.btn} onClick={editTimetable}>
              Edit
            </button>

            <button style={styles.btn} onClick={printTable}>
              Print
            </button>

            <button style={styles.btn} onClick={downloadPDF}>
              Download PDF
            </button>

            <button style={styles.btn} onClick={downloadWord}>
              Download Word
            </button>
          </>
        )}

      </div>

      {/* ✅ PRINT FIX */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }

            #timetablePreview,
            #timetablePreview * {
              visibility: visible;
            }

            #timetablePreview {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              padding: 20px;
              font-size: 14px;
            }

            table {
              border: 1px solid #000;
            }

            th, td {
              border: 1px solid #000 !important;
            }
          }
        `}
      </style>

    </div>
  );
}