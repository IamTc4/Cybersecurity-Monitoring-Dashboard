const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'dashboard.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // KPI Stats
  db.run(`CREATE TABLE IF NOT EXISTS kpi_stats (
    id INTEGER PRIMARY KEY,
    attacks INTEGER,
    attacks_trend INTEGER,
    logins INTEGER,
    logins_trend INTEGER,
    malware INTEGER,
    malware_changes INTEGER,
    malware_severity INTEGER,
    score INTEGER
  )`);

  // Incident Trends
  db.run(`CREATE TABLE IF NOT EXISTS incident_trends (
    id INTEGER PRIMARY KEY,
    time TEXT,
    value INTEGER,
    category TEXT
  )`);

  // Threat Map
  db.run(`CREATE TABLE IF NOT EXISTS threat_map (
    id INTEGER PRIMARY KEY,
    lat REAL,
    long REAL,
    type TEXT,
    active INTEGER
  )`);

  // Affected Assets
  db.run(`CREATE TABLE IF NOT EXISTS affected_assets (
    id INTEGER PRIMARY KEY,
    name TEXT,
    issue TEXT,
    count INTEGER,
    type TEXT,
    severity TEXT
  )`);

  // Firewall Activity
  db.run(`CREATE TABLE IF NOT EXISTS firewall_activity (
    id INTEGER PRIMARY KEY,
    time TEXT,
    value INTEGER,
    type TEXT
  )`);

  // Compliance
  db.run(`CREATE TABLE IF NOT EXISTS compliance (
    id INTEGER PRIMARY KEY,
    standard TEXT,
    status TEXT,
    description TEXT,
    score TEXT,
    state TEXT
  )`);

  // Policy Violations
  db.run(`CREATE TABLE IF NOT EXISTS policy_violations (
    id INTEGER PRIMARY KEY,
    name TEXT,
    value INTEGER,
    color TEXT
  )`);

  // Seed Data
  db.get("SELECT count(*) as count FROM kpi_stats", (err, row) => {
    if (row.count === 0) {
      console.log("Seeding Database...");

      db.run(`INSERT INTO kpi_stats (attacks, attacks_trend, logins, logins_trend, malware, malware_changes, malware_severity, score)
              VALUES (14203, 12, 42, 5, 5, 0, 1, 92)`);

      // Seed Incident Trends (24h)
      const stmtTrend = db.prepare("INSERT INTO incident_trends (time, value, category) VALUES (?, ?, ?)");
      for (let i = 0; i < 24; i++) {
        stmtTrend.run(`${i}:00`, Math.floor(Math.random() * 80) + 20, 'All');
      }
      stmtTrend.finalize();

      // Seed Threat Map
      const stmtThreat = db.prepare("INSERT INTO threat_map (lat, long, type, active) VALUES (?, ?, ?, ?)");
      stmtThreat.run(39.9042, 116.4074, 'high', 1); // Beijing
      stmtThreat.run(40.7128, -74.0060, 'medium', 1); // NY
      stmtThreat.run(55.7558, 37.6173, 'low', 0); // Moscow
      stmtThreat.run(35.6895, 139.6917, 'high', 1); // Tokyo
      stmtThreat.finalize();

      // Seed Assets
      const stmtAssets = db.prepare("INSERT INTO affected_assets (name, issue, count, type, severity) VALUES (?, ?, ?, ?, ?)");
      stmtAssets.run('DB-Cluster-01', 'SQL Injection attempt', 12, 'db', 'critical');
      stmtAssets.run('User-Endpoint-J', 'Malware blocked', 8, 'laptop', 'high');
      stmtAssets.run('Gateway-North', 'Port scan detected', 5, 'router', 'medium');
      stmtAssets.finalize();

      // Seed Firewall
      const stmtFirewall = db.prepare("INSERT INTO firewall_activity (time, value, type) VALUES (?, ?, ?)");
      const fwData = [
          { t: '00', v: 30, type: 'allowed' }, { t: '01', v: 50, type: 'allowed' }, { t: '02', v: 40, type: 'allowed' },
          { t: '03', v: 80, type: 'blocked' }, { t: '04', v: 60, type: 'allowed' }, { t: '05', v: 45, type: 'allowed' },
          { t: '06', v: 55, type: 'allowed' }, { t: '07', v: 70, type: 'allowed' }, { t: '08', v: 65, type: 'allowed' },
          { t: '09', v: 50, type: 'allowed' }, { t: '10', v: 40, type: 'allowed' }, { t: '11', v: 90, type: 'allowed' },
          { t: '12', v: 30, type: 'allowed' }, { t: '13', v: 20, type: 'allowed' }, { t: '14', v: 50, type: 'allowed' },
          { t: '15', v: 60, type: 'allowed' }
      ];
      fwData.forEach(d => stmtFirewall.run(d.t, d.v, d.type));
      stmtFirewall.finalize();

      // Seed Compliance
      const stmtComp = db.prepare("INSERT INTO compliance (standard, status, description, score, state) VALUES (?, ?, ?, ?, ?)");
      stmtComp.run('HIPAA', 'Pass', '98% Compliant', '98%', 'pass');
      stmtComp.run('GDPR', 'Warn', 'Review Needed', '85%', 'warn');
      stmtComp.run('PCI DSS', 'Info', 'Check In Progress', 'Pending', 'info');
      stmtComp.finalize();

      // Seed Policy Violations
      const stmtPolicy = db.prepare("INSERT INTO policy_violations (name, value, color) VALUES (?, ?, ?)");
      stmtPolicy.run('SSH Policy', 14, '#f9f506');
      stmtPolicy.run('RDP Access', 8, '#ffffff');
      stmtPolicy.run('Other', 3, '#9ca3af');
      stmtPolicy.finalize();
    }
  });
});

module.exports = db;
