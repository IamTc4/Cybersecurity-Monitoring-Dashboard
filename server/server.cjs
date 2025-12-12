const express = require('express');
const cors = require('cors');
const PDFDocument = require('pdfkit');
const db = require('./database.cjs');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// API Routes

// 1. KPI Stats
app.get('/api/kpi-stats', (req, res) => {
  db.get("SELECT * FROM kpi_stats", (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    // Transform flat DB row to nested structure expected by frontend
    const data = {
      attacks: { count: row.attacks, trend: row.attacks_trend },
      logins: { count: row.logins, trend: row.logins_trend },
      malware: { count: row.malware, changes: row.malware_changes, severity: row.malware_severity },
      score: row.score
    };
    res.json(data);
  });
});

// 2. Incident Trends
app.get('/api/trends', (req, res) => {
  db.all("SELECT time, value, category FROM incident_trends", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// 3. Threat Map
app.get('/api/threats', (req, res) => {
  db.all("SELECT lat, long, type, active FROM threat_map", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    // Frontend expects array of markers
    const markers = rows.map(r => ({
      coordinates: [r.long, r.lat], // DB has lat/long, map needs [long, lat]
      type: r.type,
      active: !!r.active
    }));
    res.json(markers);
  });
});

// 4. Affected Assets
app.get('/api/assets', (req, res) => {
  db.all("SELECT name, issue, count, type, severity FROM affected_assets ORDER BY count DESC", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// 5. Firewall Activity
app.get('/api/firewall', (req, res) => {
  db.all("SELECT time, value, type FROM firewall_activity", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    // Frontend expects { name: '00', value: 30, type: 'allowed' }
    const data = rows.map(r => ({
        name: r.time,
        value: r.value,
        type: r.type
    }));
    res.json(data);
  });
});

// 6. Compliance
app.get('/api/compliance', (req, res) => {
  const response = {};

  db.all("SELECT standard, status, description, score, state FROM compliance", (err, rows) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      response.standards = rows;

      db.all("SELECT name, value, color FROM policy_violations", (err, vioRows) => {
          if (err) {
               res.status(500).json({ error: err.message });
               return;
          }
          response.violations = vioRows;
          res.json(response);
      });
  });
});

// 7. Generate Report
app.get('/api/report', (req, res) => {
  const doc = new PDFDocument();

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=compliance_report.pdf');

  doc.pipe(res);

  doc.fontSize(25).text('Compliance Report', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Generated on: ${new Date().toLocaleString()}`);
  doc.moveDown();
  doc.fontSize(14).text('Executive Summary');
  doc.fontSize(10).text('This report outlines the current security posture and compliance status of the organization. All critical systems are currently being monitored.');
  doc.moveDown();

  db.all("SELECT standard, status, description FROM compliance", (err, rows) => {
      if (!err) {
          doc.fontSize(14).text('Compliance Status Details');
          doc.moveDown();
          rows.forEach(row => {
              doc.fontSize(12).text(`${row.standard}: ${row.status}`, { underline: true });
              doc.fontSize(10).text(`Details: ${row.description}`);
              doc.moveDown();
          });
      }

      doc.text('--- End of Report ---', { align: 'center' });
      doc.end();
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
