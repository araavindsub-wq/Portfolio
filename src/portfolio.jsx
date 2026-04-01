import React, { useState, useEffect, useRef, useCallback } from "react";
import profileCasual from "./assets/profile-casual.png";
import profileFormal from "./assets/profile-formal.png";

/* ─────────────────────────────────────────────
   ARAAVIND'S PORTFOLIO — "Night Highway" Edition
   A fusion of Frontend Engineering × Transportation Engineering
   ───────────────────────────────────────────── */

// ── Inline SVG Icons ──
const Icons = {
  GitHub: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  LinkedIn: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  Mail: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 4L12 13 2 4" />
    </svg>
  ),
  ExternalLink: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  ),
  Menu: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  X: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  ),
};

// ── Traffic Signal Component ──
const TrafficSignal = ({ active = "green", size = 60 }) => {
  const colors = { red: "#ef4444", yellow: "#f5c518", green: "#22c55e" };
  const r = size * 0.16;
  return (
    <svg width={size} height={size * 2.2} viewBox="0 0 40 88">
      <rect x="4" y="0" width="32" height="84" rx="8" fill="#1a1a2e" stroke="#2a2a4a" strokeWidth="1.5" />
      {["red", "yellow", "green"].map((c, i) => (
        <g key={c}>
          <circle cx="20" cy={16 + i * 24} r={r + 2} fill={active === c ? colors[c] + "33" : "transparent"} />
          <circle
            cx="20"
            cy={16 + i * 24}
            r={r}
            fill={active === c ? colors[c] : "#222"}
            style={{
              filter: active === c ? `drop-shadow(0 0 8px ${colors[c]})` : "none",
              transition: "all 0.5s ease",
            }}
          />
        </g>
      ))}
      <rect x="18" y="84" width="4" height="4" fill="#2a2a4a" />
    </svg>
  );
};

// ── Animated Road Stripes Background ──
const RoadStripes = () => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: "none",
      zIndex: 0,
      overflow: "hidden",
    }}
  >
    {/* Left road edge */}
    <div
      style={{
        position: "absolute",
        left: "8%",
        top: 0,
        bottom: 0,
        width: "2px",
        background: "linear-gradient(to bottom, transparent, rgba(245,197,24,0.08) 20%, rgba(245,197,24,0.08) 80%, transparent)",
      }}
    />
    {/* Right road edge */}
    <div
      style={{
        position: "absolute",
        right: "8%",
        top: 0,
        bottom: 0,
        width: "2px",
        background: "linear-gradient(to bottom, transparent, rgba(245,197,24,0.08) 20%, rgba(245,197,24,0.08) 80%, transparent)",
      }}
    />
    {/* Center dashed line */}
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: 0,
        bottom: 0,
        width: "3px",
        backgroundImage: "repeating-linear-gradient(to bottom, rgba(245,197,24,0.04) 0px, rgba(245,197,24,0.04) 40px, transparent 40px, transparent 80px)",
        animation: "roadScroll 3s linear infinite",
      }}
    />
  </div>
);

// ══════════════════════════════════════════════════════════════
//  TRAFFIC SIMULATION — Fundamentals-First
//  ─────────────────────────────────────────
//  Implements:
//   1. Stop-line compliance — vehicles decelerate to stop BEFORE the stop bar
//   2. Car-following (simplified GHR / safe-distance) — maintains headway
//   3. Realistic signal phasing — green → yellow → all-red clearance → opposing green
//   4. Smooth acceleration / deceleration curves (not instant)
//   5. Saturation flow & start-up lost time on green
//   6. Queue discharge wave propagation
//   7. Safe following distance proportional to speed
//   8. Dilemma zone — vehicles too close at yellow onset proceed through
// ══════════════════════════════════════════════════════════════
const TrafficSimulation = () => {
  const canvasRef = useRef(null);
  const statTotalRef = useRef(null);
  const statDelayRef = useRef(null);
  const statQueuedRef = useRef(null);
  const statThroughputRef = useRef(null);

  const stateRef = useRef({
    cars: [],
    signals: [
      { x: 250, y: 200, state: "green", phase: 1 },
      { x: 550, y: 200, state: "red", phase: 2 },
    ],
    signalPlan: {
      greenTime: 90,
      yellowTime: 18,
      allRedTime: 12,
      currentPhase: 1,
      timer: 0,
    },
    spawnTimer: 0,
    stats: { throughput: 0, avgDelay: 0, stopped: 0, totalCars: 0 },
    lastTime: 0,
    frameCount: 0,
    throughputWindow: [],
    carColors: ["#f5c518", "#4fc3f7", "#ef5350", "#66bb6a", "#ce93d8", "#ffab40"],
  });

  const [signalMode, setSignalMode] = useState("fixed");
  const [density, setDensity] = useState("medium");

  const signalModeRef = useRef(signalMode);
  const densityRef = useRef(density);
  signalModeRef.current = signalMode;
  densityRef.current = density;

  const STOP_LINE_OFFSET = 20;
  const MIN_FOLLOWING_GAP = 14;

  const spawnCar = useCallback(() => {
    const s = stateRef.current;
    const lanes = [185, 215];
    const dirs = [1, -1];
    const laneIdx = Math.random() > 0.5 ? 0 : 1;
    const dir = dirs[laneIdx];
    const spawnX = dir === 1 ? -40 : 840;

    const carWidth = 24 + Math.random() * 10;
    const desiredSpeed = 1.4 + Math.random() * 0.8;

    const minSpawnGap = carWidth + 40;
    const blocked = s.cars.some((c) => {
      if (c.y !== lanes[laneIdx]) return false;
      return Math.abs(c.x - spawnX) < minSpawnGap;
    });
    if (blocked) return;

    const color = s.carColors[Math.floor(Math.random() * s.carColors.length)];

    s.cars.push({
      x: spawnX,
      y: lanes[laneIdx],
      dir,
      speed: desiredSpeed,
      desiredSpeed,
      color,
      delay: 0,
      stopped: false,
      w: carWidth,
      h: 10,
      startupLost: 0,
      hasCleared: [false, false],
    });
    s.stats.totalCars++;
  }, []);

  const spawnCarRef = useRef(spawnCar);
  spawnCarRef.current = spawnCar;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 400;

    const s0 = stateRef.current;
    s0.lastTime = 0;
    s0.frameCount = 0;

    let rafId = 0;
    let cancelled = false;

    const roundRect = (c, x, y, w, h, r) => {
      c.beginPath();
      if (typeof c.roundRect === "function") {
        c.roundRect(x, y, w, h, r);
      } else {
        c.rect(x, y, w, h);
      }
    };

    const tick = (time) => {
      if (cancelled) return;
      try {
        const s = stateRef.current;
        const dtRaw = s.lastTime ? (time - s.lastTime) / 16.67 : 1;
        const dt = Math.min(3, Math.max(0.2, dtRaw));
        s.lastTime = time;
        s.frameCount++;

        const mode = signalModeRef.current;
        const dens = densityRef.current;
        const spawnInterval = dens === "low" ? 110 : dens === "medium" ? 55 : 25;

        /* ═══ 1. SIGNAL PHASING — NEMA-style with all-red clearance ═══ */
        const plan = s.signalPlan;

        let greenDur, yellowDur, allRedDur;
        if (mode === "adaptive") {
          greenDur = dens === "high" ? 110 : dens === "low" ? 60 : 80;
          yellowDur = 18;
          allRedDur = 12;
        } else {
          greenDur = 90;
          yellowDur = 18;
          allRedDur = 12;
        }

        plan.timer += dt;
        const cycleDur = (greenDur + yellowDur + allRedDur) * 2;
        const t = plan.timer % cycleDur;

        const p1GreenEnd = greenDur;
        const p1YellowEnd = p1GreenEnd + yellowDur;
        const p1AllRedEnd = p1YellowEnd + allRedDur;
        const p2GreenEnd = p1AllRedEnd + greenDur;
        const p2YellowEnd = p2GreenEnd + yellowDur;

        if (t < p1GreenEnd) {
          s.signals[0].state = "green";
          s.signals[1].state = "red";
        } else if (t < p1YellowEnd) {
          s.signals[0].state = "yellow";
          s.signals[1].state = "red";
        } else if (t < p1AllRedEnd) {
          s.signals[0].state = "red";
          s.signals[1].state = "red";
        } else if (t < p2GreenEnd) {
          s.signals[0].state = "red";
          s.signals[1].state = "green";
        } else if (t < p2YellowEnd) {
          s.signals[0].state = "red";
          s.signals[1].state = "yellow";
        } else {
          s.signals[0].state = "red";
          s.signals[1].state = "red";
        }

        /* ═══ 2. SPAWN ═══ */
        s.spawnTimer += dt;
        if (s.spawnTimer > spawnInterval) {
          spawnCarRef.current();
          s.spawnTimer = 0;
        }

        /* ═══ 3. CAR FOLLOWING & SIGNAL COMPLIANCE ═══ */
        const DECEL = 0.12;
        const HARD_DECEL = 0.25;
        const ACCEL = 0.035;
        const STARTUP_DELAY = 6;

        let stoppedCount = 0;
        let totalDelay = 0;
        let delayCount = 0;

        s.cars.forEach((car) => {
          let targetSpeed = car.desiredSpeed;
          let decelRate = DECEL;

          /* ── 3a. Signal stop-line check ── */
          s.signals.forEach((sig, sigIdx) => {
            if (car.hasCleared[sigIdx]) return;

            const stopLineX = sig.x - STOP_LINE_OFFSET * car.dir;
            const carFront = car.x + (car.w / 2) * car.dir;
            const distToStop = (stopLineX - carFront) * car.dir;

            const distToSignal = (sig.x - carFront) * car.dir;
            if (distToSignal < -5) {
              car.hasCleared[sigIdx] = true;
              return;
            }

            if (sig.state === "red" || sig.state === "yellow") {
              if (distToStop > 0) {
                const stoppingDist = Math.max(distToStop, 0.1);
                const requiredDecel = (car.speed * car.speed) / (2 * stoppingDist);

                // Dilemma zone: too close & fast to stop safely — proceed through
                if (requiredDecel > HARD_DECEL && distToStop < 15 && car.speed > 0.8) {
                  return;
                }

                // Kinematic deceleration: v = sqrt(2 * a * d)
                const approachSpeed = Math.sqrt(2 * DECEL * stoppingDist);
                targetSpeed = Math.min(targetSpeed, Math.max(0, approachSpeed - 0.1));

                if (distToStop < 3) {
                  targetSpeed = 0;
                }
              } else if (distToStop > -5 && distToStop <= 0) {
                targetSpeed = 0;
              }
            }
          });

          /* ── 3b. Car-following — safe distance to leader ── */
          let leaderDist = Infinity;
          let leaderSpeed = car.desiredSpeed;

          s.cars.forEach((other) => {
            if (other === car || other.y !== car.y || other.dir !== car.dir) return;

            const otherRear = other.x - (other.w / 2) * other.dir;
            const carFront = car.x + (car.w / 2) * car.dir;
            const gap = (otherRear - carFront) * car.dir;

            if (gap > -2 && gap < leaderDist) {
              leaderDist = gap;
              leaderSpeed = other.speed;
            }
          });

          if (leaderDist < Infinity) {
            const safeGap = MIN_FOLLOWING_GAP + car.speed * 8;

            if (leaderDist < MIN_FOLLOWING_GAP) {
              targetSpeed = 0;
              decelRate = HARD_DECEL;
            } else if (leaderDist < safeGap) {
              const closingRate = car.speed - leaderSpeed;
              const gapRatio = (leaderDist - MIN_FOLLOWING_GAP) / (safeGap - MIN_FOLLOWING_GAP);
              targetSpeed = Math.min(targetSpeed, leaderSpeed + closingRate * (gapRatio - 1));
              targetSpeed = Math.max(0, targetSpeed);
            }
          }

          /* ── 3c. Startup lost time ── */
          if (car.stopped && car.startupLost < STARTUP_DELAY) {
            const behindGreenSignal = s.signals.some((sig, sigIdx) => {
              if (car.hasCleared[sigIdx]) return false;
              const dist = (sig.x - car.x) * car.dir;
              return dist > 0 && dist < 200 && sig.state === "green";
            });
            if (behindGreenSignal) {
              car.startupLost += dt;
              if (car.startupLost < STARTUP_DELAY) {
                targetSpeed = 0;
              }
            }
          }

          if (car.speed > 0.5) {
            car.startupLost = 0;
          }

          /* ── 3d. Apply acceleration / deceleration ── */
          if (targetSpeed < car.speed) {
            car.speed = Math.max(targetSpeed, car.speed - decelRate * dt);
          } else if (targetSpeed > car.speed) {
            car.speed = Math.min(targetSpeed, car.speed + ACCEL * dt);
          }

          car.speed = Math.max(0, Math.min(car.desiredSpeed, car.speed));

          /* ── 3e. Update position ── */
          car.x += car.speed * car.dir * dt;

          /* ── 3f. Stats ── */
          if (car.speed < 0.15) {
            car.stopped = true;
            car.delay += dt;
            stoppedCount++;
          } else {
            car.stopped = false;
          }

          if (car.delay > 0) {
            totalDelay += car.delay;
            delayCount++;
          }
        });

        /* ── Hard spacing enforcement ── */
        const enforceLane = (dir, laneY) => {
          const lane = s.cars
            .filter((c) => c.dir === dir && c.y === laneY)
            .sort((a, b) => (dir === 1 ? b.x - a.x : a.x - b.x));

          for (let i = 1; i < lane.length; i++) {
            const leader = lane[i - 1];
            const follower = lane[i];
            const minGap = (leader.w + follower.w) / 2 + MIN_FOLLOWING_GAP;

            if (dir === 1) {
              const maxX = leader.x - minGap;
              if (follower.x > maxX) {
                follower.x = maxX;
                follower.speed = Math.min(follower.speed, leader.speed);
              }
            } else {
              const minX = leader.x + minGap;
              if (follower.x < minX) {
                follower.x = minX;
                follower.speed = Math.min(follower.speed, leader.speed);
              }
            }
          }
        };
        enforceLane(1, 185);
        enforceLane(-1, 215);

        /* ── Remove off-screen & throughput ── */
        const before = s.cars.length;
        s.cars = s.cars.filter((c) => c.x > -60 && c.x < 860);
        const exited = before - s.cars.length;
        s.stats.throughput += exited;

        s.throughputWindow.push({ t: time, count: exited });
        s.throughputWindow = s.throughputWindow.filter((w) => time - w.t < 5000);
        const rollingThroughput = s.throughputWindow.reduce((a, w) => a + w.count, 0);

        s.stats.stopped = stoppedCount;
        s.stats.avgDelay = delayCount > 0 ? totalDelay / delayCount : 0;

        /* ═══ 4. RENDERING ═══ */
        ctx.clearRect(0, 0, 800, 400);

        // Background
        const bgGrad = ctx.createLinearGradient(0, 0, 0, 400);
        bgGrad.addColorStop(0, "#0a0a1e");
        bgGrad.addColorStop(1, "#12122a");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 800, 400);

        // Ground below road
        ctx.fillStyle = "#0d1117";
        ctx.fillRect(0, 240, 800, 160);

        // Road surface
        const roadGrad = ctx.createLinearGradient(0, 165, 0, 235);
        roadGrad.addColorStop(0, "#1e1e38");
        roadGrad.addColorStop(0.5, "#1a1a30");
        roadGrad.addColorStop(1, "#1e1e38");
        ctx.fillStyle = roadGrad;
        ctx.fillRect(0, 165, 800, 70);

        // Road edge lines (solid yellow)
        ctx.strokeStyle = "rgba(245,197,24,0.4)";
        ctx.lineWidth = 2;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(0, 165);
        ctx.lineTo(800, 165);
        ctx.moveTo(0, 235);
        ctx.lineTo(800, 235);
        ctx.stroke();

        // Center line (dashed yellow)
        ctx.strokeStyle = "rgba(245,197,24,0.18)";
        ctx.lineWidth = 2;
        ctx.setLineDash([14, 20]);
        ctx.beginPath();
        ctx.moveTo(0, 200);
        ctx.lineTo(800, 200);
        ctx.stroke();
        ctx.setLineDash([]);

        // Shoulder hash marks
        ctx.fillStyle = "rgba(245,197,24,0.04)";
        for (let i = 0; i < 800; i += 80) {
          ctx.fillRect(i, 155, 20, 2);
          ctx.fillRect(i + 40, 243, 20, 2);
        }

        /* ── Signals ── */
        s.signals.forEach((sig) => {
          const stopLineX = sig.x - STOP_LINE_OFFSET;
          const isRed = sig.state === "red" || sig.state === "yellow";

          // Stop bar
          ctx.fillStyle = isRed ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.12)";
          ctx.fillRect(stopLineX - 1, 165, 2, 70);

          // Red glow zone
          if (isRed) {
            const glowGrad = ctx.createLinearGradient(stopLineX - 30, 0, stopLineX, 0);
            glowGrad.addColorStop(0, "rgba(239,68,68,0)");
            glowGrad.addColorStop(1, "rgba(239,68,68,0.08)");
            ctx.fillStyle = glowGrad;
            ctx.fillRect(stopLineX - 30, 165, 30, 70);
          }

          // Signal pole
          ctx.fillStyle = "#2a2a4a";
          ctx.fillRect(sig.x - 2, 120, 4, 45);

          // Signal housing
          ctx.fillStyle = "#0c0c0c";
          ctx.strokeStyle = "#3a3a5a";
          ctx.lineWidth = 1.5;
          const boxW = 18, boxH = 44;
          roundRect(ctx, sig.x - boxW / 2, 76, boxW, boxH, 5);
          ctx.fill();
          ctx.stroke();

          // Signal lights
          const lightDefs = [
            { color: "#ef4444", name: "red", cy: 86 },
            { color: "#f5c518", name: "yellow", cy: 98 },
            { color: "#22c55e", name: "green", cy: 110 },
          ];
          lightDefs.forEach((ld) => {
            ctx.beginPath();
            ctx.arc(sig.x, ld.cy, 5, 0, Math.PI * 2);
            if (sig.state === ld.name) {
              ctx.fillStyle = ld.color;
              ctx.shadowColor = ld.color;
              ctx.shadowBlur = 14;
            } else {
              ctx.fillStyle = "#1a1a1a";
              ctx.shadowBlur = 0;
            }
            ctx.fill();
            ctx.shadowBlur = 0;
          });

          // Phase label
          ctx.fillStyle = "rgba(255,255,255,0.15)";
          ctx.font = "9px monospace";
          ctx.textAlign = "center";
          ctx.fillText(sig.state.toUpperCase(), sig.x, 72);
        });

        /* ── Cars ── */
        s.cars.forEach((car) => {
          ctx.save();
          ctx.translate(car.x, car.y);

          // Shadow
          ctx.fillStyle = "rgba(0,0,0,0.3)";
          roundRect(ctx, -car.w / 2 + 2, -car.h / 2 + 2, car.w, car.h, 3);
          ctx.fill();

          // Body
          ctx.fillStyle = car.color;
          ctx.shadowColor = car.color;
          ctx.shadowBlur = car.stopped ? 2 : 8;
          roundRect(ctx, -car.w / 2, -car.h / 2, car.w, car.h, 3);
          ctx.fill();
          ctx.shadowBlur = 0;

          // Roof / cabin
          ctx.fillStyle = "rgba(0,0,0,0.25)";
          const cabinW = car.w * 0.4;
          const cabinX = car.dir === 1 ? -cabinW / 2 - 2 : -cabinW / 2 + 2;
          roundRect(ctx, cabinX, -car.h / 2 + 2, cabinW, car.h - 4, 2);
          ctx.fill();

          // Windshield
          ctx.fillStyle = "rgba(140,200,255,0.3)";
          const wsX = car.dir === 1 ? car.w / 2 - 6 : -car.w / 2 + 1;
          ctx.fillRect(wsX, -car.h / 2 + 2, 5, car.h - 4);

          // Headlights
          const hlX = car.dir === 1 ? car.w / 2 - 1 : -car.w / 2 - 1;
          ctx.fillStyle = car.dir === 1 ? "#ffffffcc" : "#ef5350aa";
          ctx.shadowColor = car.dir === 1 ? "#fff" : "#ef5350";
          ctx.shadowBlur = 5;
          ctx.fillRect(hlX, -car.h / 2 + 1, 2, 3);
          ctx.fillRect(hlX, car.h / 2 - 4, 2, 3);

          // Taillights
          const tlX = car.dir === 1 ? -car.w / 2 - 1 : car.w / 2 - 1;
          ctx.fillStyle = car.dir === 1 ? "#ef535088" : "#ffffff99";
          ctx.shadowColor = car.dir === 1 ? "#ef5350" : "#fff";
          ctx.shadowBlur = car.stopped ? 8 : 3;
          ctx.fillRect(tlX, -car.h / 2 + 1, 2, 3);
          ctx.fillRect(tlX, car.h / 2 - 4, 2, 3);

          // Brake lights glow
          if (car.stopped) {
            ctx.fillStyle = "rgba(239,83,80,0.15)";
            const brakeX = car.dir === 1 ? -car.w / 2 - 10 : car.w / 2;
            ctx.fillRect(brakeX, -car.h, 10, car.h * 2);
          }

          ctx.shadowBlur = 0;
          ctx.restore();
        });

        /* ── HUD stats ── */
        if (statTotalRef.current) statTotalRef.current.textContent = String(s.stats.totalCars);
        if (statDelayRef.current)
          statDelayRef.current.textContent = Number.isFinite(s.stats.avgDelay)
            ? (s.stats.avgDelay * 0.28).toFixed(1)
            : "0.0";
        if (statQueuedRef.current) statQueuedRef.current.textContent = String(s.stats.stopped);
        if (statThroughputRef.current) statThroughputRef.current.textContent = String(rollingThroughput);
      } catch (err) {
        console.error("TrafficSimulation tick error:", err);
      }

      if (!cancelled) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, []);

  const controlStyle = {
    background: "#1a1a2e",
    color: "#f5c518",
    border: "1px solid rgba(245,197,24,0.3)",
    borderRadius: 6,
    padding: "6px 12px",
    fontSize: 12,
    fontFamily: "'JetBrains Mono', monospace",
    cursor: "pointer",
    outline: "none",
  };

  const statBoxStyle = {
    background: "rgba(245,197,24,0.04)",
    borderRadius: 8,
    padding: "12px 8px",
    textAlign: "center",
    border: "1px solid rgba(245,197,24,0.08)",
  };

  const statLabelStyle = {
    color: "rgba(255,255,255,0.35)",
    fontSize: 9,
    fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: 1.5,
    marginBottom: 4,
    textTransform: "uppercase",
  };

  const statValueStyle = {
    color: "#f5c518",
    fontSize: 22,
    fontFamily: "'Oswald', sans-serif",
    fontWeight: 600,
  };

  const statUnitStyle = {
    color: "rgba(255,255,255,0.2)",
    fontSize: 9,
    fontFamily: "'JetBrains Mono', monospace",
  };

  return (
    <div style={{ background: "rgba(10,10,30,0.7)", borderRadius: 16, padding: "24px", border: "1px solid rgba(245,197,24,0.15)", backdropFilter: "blur(8px)" }}>
      <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 12, width: "100%" }}>
        <div style={{ flex: "1 1 220px", minWidth: 0, textAlign: "left" }}>
          <h3 style={{ color: "#f5c518", fontFamily: "'Oswald', sans-serif", fontSize: 20, margin: 0, textTransform: "uppercase", letterSpacing: 2, textAlign: "left" }}>
            Traffic Signal Simulation
          </h3>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, margin: "4px 0 0", fontFamily: "'JetBrains Mono', monospace", textAlign: "left", lineHeight: 1.45 }}>
            Stop-line compliance · Car-following model · Signal phasing with all-red clearance
          </p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginLeft: "auto" }}>
          <select value={signalMode} onChange={(e) => setSignalMode(e.target.value)} style={controlStyle}>
            <option value="fixed">Fixed Timing</option>
            <option value="adaptive">Adaptive Timing</option>
          </select>
          <select value={density} onChange={(e) => setDensity(e.target.value)} style={controlStyle}>
            <option value="low">Low Volume</option>
            <option value="medium">Med Volume</option>
            <option value="high">High Volume</option>
          </select>
        </div>
      </div>

      <canvas ref={canvasRef} style={{ width: "100%", height: "auto", borderRadius: 8, border: "1px solid rgba(245,197,24,0.06)" }} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginTop: 16 }}>
        <div style={statBoxStyle}>
          <div style={statLabelStyle}>Total Spawned</div>
          <div ref={statTotalRef} style={statValueStyle}>0</div>
        </div>
        <div style={statBoxStyle}>
          <div style={statLabelStyle}>Avg Delay</div>
          <div ref={statDelayRef} style={statValueStyle}>0.0</div>
          <div style={statUnitStyle}>sec</div>
        </div>
        <div style={statBoxStyle}>
          <div style={statLabelStyle}>Queued</div>
          <div ref={statQueuedRef} style={statValueStyle}>0</div>
          <div style={statUnitStyle}>vehicles</div>
        </div>
        <div style={statBoxStyle}>
          <div style={statLabelStyle}>Throughput</div>
          <div ref={statThroughputRef} style={statValueStyle}>0</div>
          <div style={statUnitStyle}>/5s</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 16, marginTop: 12, justifyContent: "center", flexWrap: "wrap" }}>
        {[
          { label: "Stop Line", color: "rgba(255,255,255,0.5)" },
          { label: "Queued Vehicle", color: "#ef5350" },
          { label: "All-Red Clearance", color: "#ef4444" },
        ].map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.3)", fontSize: 10, fontFamily: "'JetBrains Mono', monospace" }}>
            <div style={{ width: 12, height: 3, background: item.color, borderRadius: 1 }} />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Typed Text Animation Hook ──
const useTypedText = (texts, typeSpeed = 80, deleteSpeed = 40, pauseTime = 2000) => {
  const [displayed, setDisplayed] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    let timeout;

    if (!isDeleting && displayed === current) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
    } else {
      timeout = setTimeout(
        () => {
          setDisplayed(
            isDeleting ? current.substring(0, displayed.length - 1) : current.substring(0, displayed.length + 1)
          );
        },
        isDeleting ? deleteSpeed : typeSpeed
      );
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, textIndex, texts, typeSpeed, deleteSpeed, pauseTime]);

  return displayed;
};

// ── Intersection Observer Hook ──
const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
};

// ── Animated Section Wrapper ──
const AnimatedSection = ({ children, id, className = "" }) => {
  const [ref, inView] = useInView(0.1);
  return (
    <section
      id={id}
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {children}
    </section>
  );
};

// ── Section Title ──
const SectionTitle = ({ children, subtitle }) => (
  <div style={{ marginBottom: 48, textAlign: "center" }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 8 }}>
      <div style={{ width: 40, height: 2, background: "linear-gradient(to right, transparent, #f5c518)" }} />
      <h2
        style={{
          fontFamily: "'Oswald', sans-serif",
          fontSize: "clamp(28px, 5vw, 42px)",
          fontWeight: 700,
          color: "#fff",
          textTransform: "uppercase",
          letterSpacing: 3,
          margin: 0,
        }}
      >
        {children}
      </h2>
      <div style={{ width: 40, height: 2, background: "linear-gradient(to left, transparent, #f5c518)" }} />
    </div>
    {subtitle && (
      <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'JetBrains Mono', monospace", fontSize: 13, letterSpacing: 1 }}>
        {subtitle}
      </p>
    )}
  </div>
);

// ── Skill Pill ──
const SkillPill = ({ name, glow = false }) => (
  <span
    style={{
      display: "inline-block",
      padding: "6px 14px",
      borderRadius: 20,
      fontSize: 12,
      fontFamily: "'JetBrains Mono', monospace",
      background: glow ? "rgba(245,197,24,0.12)" : "rgba(255,255,255,0.05)",
      color: glow ? "#f5c518" : "rgba(255,255,255,0.6)",
      border: `1px solid ${glow ? "rgba(245,197,24,0.25)" : "rgba(255,255,255,0.08)"}`,
      transition: "all 0.3s ease",
      cursor: "default",
    }}
    onMouseEnter={(e) => {
      e.target.style.background = "rgba(245,197,24,0.2)";
      e.target.style.color = "#f5c518";
      e.target.style.borderColor = "rgba(245,197,24,0.4)";
      e.target.style.transform = "translateY(-2px)";
    }}
    onMouseLeave={(e) => {
      e.target.style.background = glow ? "rgba(245,197,24,0.12)" : "rgba(255,255,255,0.05)";
      e.target.style.color = glow ? "#f5c518" : "rgba(255,255,255,0.6)";
      e.target.style.borderColor = glow ? "rgba(245,197,24,0.25)" : "rgba(255,255,255,0.08)";
      e.target.style.transform = "translateY(0)";
    }}
  >
    {name}
  </span>
);

// ══════════════════════════════════════════════
//  MAIN PORTFOLIO COMPONENT
// ══════════════════════════════════════════════
export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isWide, setIsWide] = useState(() => (typeof window !== "undefined" ? window.innerWidth > 900 : true));
  const [signalState, setSignalState] = useState("red");
  const [activeSection, setActiveSection] = useState("home");

  const SIDEBAR_W = 260;

  const typedText = useTypedText([
    "MS in Transportation Engineering",
    "React & Angular Developer",
  ]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sidebar: desktop = fixed left; mobile = overlay drawer
  useEffect(() => {
    const onResize = () => {
      const wide = window.innerWidth > 900;
      setIsWide(wide);
      if (wide) setMenuOpen(false);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Scroll spy: highlight nav link for the section in view
  useEffect(() => {
    const ids = ["home", "about", "experience", "projects", "simulation", "skills", "contact"];
    const updateActive = () => {
      const line = window.scrollY + Math.min(160, window.innerHeight * 0.28);
      let current = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (line >= top) current = id;
      }
      setActiveSection((prev) => (prev === current ? prev : current));
    };
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  // Traffic signal cycle
  useEffect(() => {
    const cycle = ["red", "red", "green", "green", "green", "yellow"];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % cycle.length;
      setSignalState(cycle[i]);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const navLinks = ["About", "Experience", "Projects", "Simulation", "Skills", "Contact"];

  const experiences = [
    {
      role: "VP, ITE Student Chapter",
      org: "Texas A&M University",
      date: "2026 — Present",
      tags: ["Leadership", "Transportation", "Networking"],
      desc: "Leading chapter initiatives, organizing industry speaker events, and connecting students with transportation engineering professionals across Texas.",
    },
    {
      role: "Systems Engineer",
      org: "Infosys Ltd.",
      date: "2022 — 2024",
      tags: ["Java", "Angular", "Spring Boot", "Agile", "Role-Based Access", "Real-Time Data Dashboards"],
      desc: "Delivered enterprise web applications in Agile teams. Built responsive Angular frontends and RESTful Java/Spring Boot backends serving 10K+ users. Led sprint planning and code review processes.",
    },
    {
      role: "Design Engineering Intern",
      org: "FEDO (Fact Engineering & Design Organisation)",
      date: "Summer 2025",
      tags: ["Structural Design", "AutoCAD", "STAAD Pro", "Design Codes", "Load Calculations", "Construction Documentation", "Tender Documents"],
      desc: "Assisted in structural analysis and design of industrial facilities. Gained hands-on experience with design codes, load calculations, and construction documentation.",
    },
  ];

  const projects = [
    {
      title: "Pine Island Transportation Plan",
      category: "Transportation Planning",
      desc: "Developed the transportation chapter of a comprehensive plan for the City of Pine Island through Texas A&M's TxTC program. Assessed road networks, crash data, and pedestrian infrastructure, then recommended thoroughfare, bike/ped, and maintenance strategies shaped by community feedback.",
      tech: ["Policy Analysis", "Crash Analysis", "Community Engagement", "TxDOT", "Data Visualization"],
      icon: "🛣️",
    },
    {
      title: "Pedestrian Crash Prediction Model",
      category: "Transportation Research",
      desc: "Statistical modeling framework using TxDOT CRIS data to predict pedestrian crash frequency at intersections. Implements Poisson and Negative Binomial regression with overdispersion testing. Identifies geometric and traffic factors contributing to high-risk locations.",
      tech: ["Python", "Pandas", "Statsmodels", "CRIS"],
      icon: "📊",
    },
    {
      title: "Vision Zero Corridor Analysis",
      category: "Transportation Safety",
      desc: "Comprehensive safety analysis of high-injury corridors using crash data visualization, hotspot mapping, and countermeasure recommendations aligned with Vision Zero principles.",
      tech: ["Python", "Data Visualization", "Policy Analysis", "Highway Safety"],
      icon: "🛡️",
    },
    {
      title: "Acid Plant Demolition & Redevelopment Plan",
      category: "Structural Engineering",
      desc: "Planned and estimated the demolition of an existing acid plant during an internship at FEDO, Kochi. Designed demolition plans in AutoCAD, prepared cost estimates using Indian Standard codes, and developed tender reference data for project execution.",
      tech: ["AutoCAD", "IS Codes", "Cost Estimation", "Project Planning"],
      icon: "🏗️",
    },
    {
      title: "Enterprise Resource Portal",
      category: "Full Stack Development",
      desc: "Built a full-stack enterprise resource management portal at Infosys with Angular frontend and Java Spring Boot microservices backend. Implemented JWT authentication, role-based access, and real-time data dashboards serving 10K+ users.",
      tech: ["Angular", "Java", "Spring Boot", "REST API", "PostgreSQL"],
      icon: "🖥️",
    },
    {
      title: "This Portfolio Website",
      category: "Frontend Development",
      desc: "A 'Night Highway' themed React portfolio blending transportation engineering aesthetics with modern frontend development. Features interactive traffic simulation, animated components, and fully responsive design.",
      tech: ["React", "Vite", "Tailwind CSS", "Canvas API"],
      icon: "🌃",
    },
  ];

  const skillGroups = [
    {
      category: "Transportation Engineering",
      skills: ["Traffic Planning", "Crash Data Analysis", "Highway Capacity", "Roadway Geometry", "Vision Zero", "TxDOT CRIS"],
    },
    {
      category: "Data & Research",
      skills: ["Python", "Pandas", "Statsmodels", "Poisson/NB Regression", "Data Visualization"],
    },
    {
      category: "Softwares",
      skills: ["AutoCAD", "Civil 3D", "STAAD Pro", "Microsoft Office Suite", "Excel VBA"],
    },
    {
      category: "Frontend & Web",
      skills: ["React", "Angular", "JavaScript", "TypeScript", "HTML/CSS", "Tailwind CSS", "Vite"],
    },
    {
      category: "Backend & Systems",
      skills: ["Java", "Spring Boot", "REST APIs", "Node.js", "PostgreSQL", "Git"],
    },
  
  ];

  return (
    <>
      {/* ── GLOBAL STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&family=Manrope:wght@400;500;600&family=Source+Sans+3:wght@300;400;500;600&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          background: #0a0a1a;
          color: #e0e0e0;
          font-family: 'Source Sans 3', sans-serif;
          overflow-x: hidden;
        }
        ::selection { background: rgba(245,197,24,0.3); color: #fff; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0a1a; }
        ::-webkit-scrollbar-thumb { background: rgba(245,197,24,0.3); border-radius: 3px; }

        @keyframes roadScroll {
          0% { background-position: 0 0; }
          100% { background-position: 0 80px; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(245,197,24,0.15); }
          50% { box-shadow: 0 0 40px rgba(245,197,24,0.3); }
        }
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        #root {
          width: 100% !important;
          max-width: none !important;
          margin: 0 !important;
          border: none !important;
          text-align: initial !important;
        }
      `}</style>

      <RoadStripes />

      {/* Mobile: dim background when drawer open */}
      {!isWide && menuOpen && (
        <div
          role="presentation"
          aria-hidden
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 999,
            backdropFilter: "blur(3px)",
          }}
        />
      )}

      {/* Mobile menu toggle */}
      {!isWide && (
        <button
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            position: "fixed",
            top: 16,
            right: 16,
            zIndex: 1002,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 44,
            height: 44,
            background: "rgba(10,10,26,0.92)",
            border: "1px solid rgba(245,197,24,0.25)",
            borderRadius: 10,
            color: "#f5c518",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
          }}
        >
          {menuOpen ? <Icons.X /> : <Icons.Menu />}
        </button>
      )}

      {/* ── FIXED LEFT SIDEBAR (stays visible while scrolling) ── */}
      <nav
        aria-label="Primary"
        style={{
          position: "fixed",
          top: 0,
          left: isWide ? 0 : menuOpen ? 0 : -(SIDEBAR_W + 24),
          width: SIDEBAR_W,
          height: "100vh",
          maxHeight: "100dvh",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          padding: "28px 16px 24px",
          gap: 6,
          background: scrolled ? "rgba(10,10,26,0.98)" : "rgba(10,10,26,0.94)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRight: "1px solid rgba(245,197,24,0.12)",
          boxShadow: scrolled ? "4px 0 28px rgba(0,0,0,0.4)" : "2px 0 20px rgba(0,0,0,0.25)",
          transition: "left 0.35s cubic-bezier(0.16,1,0.3,1), background 0.3s ease, box-shadow 0.3s ease",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
            marginBottom: 4,
            paddingBottom: 20,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setMenuOpen(false);
          }}
        >
          <TrafficSignal active={signalState} size={30} />
          <span
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: 19,
              fontWeight: 600,
              color: "#f5c518",
              letterSpacing: 2,
              textTransform: "uppercase",
              lineHeight: 1.15,
            }}
          >
            Araavind
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1, paddingTop: 8 }}>
          {navLinks.map((link) => {
            const slug = link.toLowerCase();
            const isActive = activeSection === slug;
            return (
              <a
                key={link}
                href={`#${slug}`}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                style={{
                  color: isActive ? "#f5c518" : "rgba(255,255,255,0.65)",
                  textDecoration: "none",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 13,
                  letterSpacing: 1.35,
                  textTransform: "uppercase",
                  padding: "12px 12px",
                  borderRadius: 8,
                  borderLeft: `3px solid ${isActive ? "#f5c518" : "transparent"}`,
                  background: isActive ? "rgba(245,197,24,0.14)" : "transparent",
                  boxShadow: isActive ? "inset 0 0 0 1px rgba(245,197,24,0.12)" : "none",
                  transition: "background 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "rgba(245,197,24,0.1)";
                    e.currentTarget.style.color = "#f5c518";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = isActive ? "rgba(245,197,24,0.14)" : "transparent";
                  e.currentTarget.style.color = isActive ? "#f5c518" : "rgba(255,255,255,0.65)";
                }}
              >
                {link}
              </a>
            );
          })}
        </div>
      </nav>

      <main
        style={{
          marginLeft: isWide ? SIDEBAR_W : 0,
          marginRight: isWide ? SIDEBAR_W : 0,
          minHeight: "100vh",
          boxSizing: "border-box",
          transition: "margin 0.35s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
      {/* ── HERO SECTION ── */}
      <header
        id="home"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "56px 24px 80px",
        }}
      >
        <div style={{ position: "absolute", top: "15%", left: "10%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,197,24,0.06) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "20%", right: "15%", width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,197,94,0.04) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

        <div style={{ textAlign: "center", maxWidth: 800, position: "relative", zIndex: 1 }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              color: "rgba(245,197,24,0.6)",
              letterSpacing: 4,
              textTransform: "uppercase",
              marginBottom: 24,
              animation: "slideInLeft 0.8s ease forwards",
            }}
          >
           
          </div>

          <div
            style={{
              width: 130,
              height: 130,
              borderRadius: "50%",
              margin: "0 auto 32px",
              border: "3px solid rgba(245,197,24,0.4)",
              background: "linear-gradient(135deg, rgba(245,197,24,0.1), rgba(34,197,94,0.05))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "pulse-glow 3s ease-in-out infinite",
              overflow: "hidden",
            }}
          >
            <img
              src={profileFormal}
              alt="Araavind profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <h1
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: "clamp(40px, 8vw, 80px)",
              fontWeight: 700,
              color: "#ffffff",
              textTransform: "uppercase",
              letterSpacing: 6,
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            Araavind Subramoniam
          </h1>

          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "clamp(14px, 2.5vw, 20px)",
              color: "#f5c518",
              minHeight: 30,
            }}
          >
            {typedText}
            <span style={{ animation: "cursor-blink 0.8s infinite", marginLeft: 2, color: "#f5c518" }}>|</span>
          </div>

          <p
            style={{
              maxWidth: 550,
              margin: "24px auto 0",
              color: "rgba(255,255,255,0.45)",
              fontSize: 16,
              lineHeight: 1.7,
              fontFamily: "'Manrope', 'Source Sans 3', sans-serif",
              fontWeight: 500,
              letterSpacing: "0.15px",
            }}
          >
            MS Transportation Engineering @ Texas A&M · Building safer roads with data & code.
            <br />
         
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 40, flexWrap: "wrap" }}>
            <a
              href="#projects"
              style={{
                padding: "14px 32px",
                background: "#f5c518",
                color: "#0a0a1a",
                fontFamily: "'Oswald', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 2,
                textDecoration: "none",
                borderRadius: 6,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = "0 8px 30px rgba(245,197,24,0.3)"; }}
              onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}
            >
              View Projects
            </a>
            <a
              href="#contact"
              style={{
                padding: "14px 32px",
                background: "transparent",
                color: "#f5c518",
                fontFamily: "'Oswald', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 2,
                textDecoration: "none",
                borderRadius: 6,
                border: "1px solid rgba(245,197,24,0.4)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => { e.target.style.background = "rgba(245,197,24,0.1)"; e.target.style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.transform = "translateY(0)"; }}
            >
              Get In Touch
            </a>
          </div>
        </div>
      </header>

      {/* ── ABOUT ── */}
      <AnimatedSection id="about">
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "100px 24px" }}>
          <SectionTitle subtitle="">About Me</SectionTitle>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 32,
              background: "rgba(255,255,255,0.02)",
              borderRadius: 16,
              padding: "40px",
              border: "1px solid rgba(255,255,255,0.05)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: "linear-gradient(to bottom, #f5c518, #22c55e, #f5c518)" }} />

            <div style={{ display: "flex", justifyContent: "center", paddingLeft: 24 }}>
              <img
                src={profileCasual}
                alt="Araavind headshot"
                style={{
                  width: 160,
                  height: 160,
                  objectFit: "cover",
                  borderRadius: "50%",
                  border: "2px solid rgba(245,197,24,0.35)",
                  boxShadow: "0 14px 34px rgba(0,0,0,0.35)",
                }}
              />
            </div>

            <p style={{ fontSize: 17, lineHeight: 1.9, color: "rgba(255,255,255,0.7)", paddingLeft: 24 }}>
              I'm a graduate student in <span style={{ color: "#f5c518", fontWeight: 500 }}>Transportation Engineering</span> at{" "}
              <span style={{ color: "#f5c518", fontWeight: 500 }}>Texas A&M University</span>, supported by the Zachry Department Excellence Fellowship.
              Before grad school, I spent two years at <span style={{ color: "#4fc3f7", fontWeight: 500 }}>Infosys</span> building enterprise web applications
              with Java, Angular, and Spring Boot, which taught me how to think in systems and ship real products.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, color: "rgba(255,255,255,0.7)", paddingLeft: 24 }}>
              What brought me back to school was a bigger problem. Thousands of people lose their lives on roads every year, and I wanted to do
              something about it. Now I'm building <span style={{ color: "#f5c518", fontWeight: 500 }}>pedestrian crash prediction models</span> using
              TxDOT CRIS data and Python, working toward <span style={{ color: "#22c55e", fontWeight: 500 }}>Vision Zero</span>. I also serve as
              Vice President of the <span style={{ color: "#f5c518", fontWeight: 500 }}>Texas A&M ITE Student Chapter</span>, connecting students
              with industry professionals.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, color: "rgba(255,255,255,0.7)", paddingLeft: 24 }}>
              I believe the future of transportation is being written in code, and I want to be at that intersection of{" "}
              <span style={{ color: "#4fc3f7", fontWeight: 500 }}>Civil engineering</span> and{" "}
              <span style={{ color: "#4fc3f7", fontWeight: 500 }}>Software engineering</span>, using tools from both worlds to make roads safer for everyone.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* ── EXPERIENCE ── */}
      <AnimatedSection id="experience">
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "100px 24px" }}>
          <SectionTitle subtitle="">Experience</SectionTitle>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: 16,
                top: 0,
                bottom: 0,
                width: 2,
                background: "linear-gradient(to bottom, #f5c518, rgba(245,197,24,0.1))",
              }}
            />

            {experiences.map((exp, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  paddingLeft: 52,
                  marginBottom: 48,
                  opacity: 0,
                  animation: `slideInLeft 0.6s ease forwards`,
                  animationDelay: `${i * 0.15}s`,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 9,
                    top: 6,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: i === 0 ? "#f5c518" : "#1a1a2e",
                    border: "2px solid #f5c518",
                    zIndex: 1,
                  }}
                />
                <div
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    borderRadius: 12,
                    padding: "24px 28px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    transition: "all 0.3s ease",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(245,197,24,0.2)";
                    e.currentTarget.style.background = "rgba(245,197,24,0.03)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6, width: "100%", textAlign: "left" }}>
                    <div style={{ minWidth: 0, flex: 1, width: "100%", textAlign: "left" }}>
                      <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 20, color: "#fff", fontWeight: 500, margin: "0 0 4px", lineHeight: 1.25, textAlign: "left" }}>
                        {exp.role}
                      </h3>
                      <p style={{ color: "#f5c518", fontSize: 14, fontFamily: "'JetBrains Mono', monospace", margin: 0, lineHeight: 1.4, textAlign: "left" }}>{exp.org}</p>
                    </div>
                    <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, fontFamily: "'JetBrains Mono', monospace", marginTop: 0, textAlign: "left" }}>
                      {exp.date}
                    </span>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, lineHeight: 1.7, margin: "14px 0" }}>{exp.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {exp.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          padding: "3px 10px",
                          borderRadius: 12,
                          fontSize: 11,
                          fontFamily: "'JetBrains Mono', monospace",
                          background: "rgba(245,197,24,0.08)",
                          color: "rgba(245,197,24,0.7)",
                          border: "1px solid rgba(245,197,24,0.12)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── PROJECTS ── */}
      <AnimatedSection id="projects">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 24px" }}>
          <SectionTitle subtitle="">Projects</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {projects.map((proj, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: 16,
                  padding: "32px 28px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  transition: "all 0.4s ease",
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(245,197,24,0.3)";
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 20px 60px rgba(245,197,24,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(to right, #f5c518, transparent)" }} />

                <div style={{ fontSize: 36, marginBottom: 16 }}>{proj.icon}</div>

                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 10px",
                    borderRadius: 12,
                    fontSize: 10,
                    fontFamily: "'JetBrains Mono', monospace",
                    background: proj.category.includes("Transportation") ? "rgba(34,197,94,0.1)" : "rgba(79,195,247,0.1)",
                    color: proj.category.includes("Transportation") ? "#22c55e" : "#4fc3f7",
                    border: `1px solid ${proj.category.includes("Transportation") ? "rgba(34,197,94,0.2)" : "rgba(79,195,247,0.2)"}`,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    marginBottom: 12,
                  }}
                >
                  {proj.category}
                </span>

                <h3
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: 22,
                    color: "#fff",
                    fontWeight: 500,
                    marginBottom: 12,
                    lineHeight: 1.3,
                  }}
                >
                  {proj.title}
                </h3>

                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{proj.desc}</p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        padding: "3px 8px",
                        borderRadius: 8,
                        fontSize: 11,
                        fontFamily: "'JetBrains Mono', monospace",
                        background: "rgba(245,197,24,0.06)",
                        color: "rgba(245,197,24,0.6)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── TRAFFIC SIMULATION ── */}
      <AnimatedSection id="simulation">
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "100px 24px" }}>
          <SectionTitle subtitle="">Traffic Simulation</SectionTitle>
          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.45)", fontSize: 15, maxWidth: 600, margin: "-24px auto 32px", lineHeight: 1.7 }}>
            An interactive demonstration of signalized intersection operations. Toggle between fixed and adaptive signal timing, and adjust traffic volume to observe impacts on vehicle delay, queue length, and throughput.
          </p>
          <TrafficSimulation />
        </div>
      </AnimatedSection>

      {/* ── SKILLS ── */}
      <AnimatedSection id="skills">
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "100px 24px" }}>
          <SectionTitle subtitle="">Skills</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {skillGroups.map((group) => (
              <div
                key={group.category}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: 12,
                  padding: "28px 24px",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: 16,
                    color: "#f5c518",
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    marginBottom: 16,
                    paddingBottom: 12,
                    borderBottom: "1px solid rgba(245,197,24,0.15)",
                  }}
                >
                  {group.category}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {group.skills.map((s) => (
                    <SkillPill key={s} name={s} glow={["React", "Python", "Vision Zero", "Java"].includes(s)} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── CONTACT ── */}
      <AnimatedSection id="contact">
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "100px 24px 60px", textAlign: "center" }}>
          <SectionTitle subtitle="">Get In Touch</SectionTitle>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, lineHeight: 1.8, marginBottom: 40, maxWidth: 500, margin: "-16px auto 40px" }}>
            Looking for Internship/Coop in transportation engineering/traffic engineering. Let's connect, whether it's about safer roads, cleaner code, or both.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { icon: <Icons.Mail />, label: "Email", href: "mailto:araavindsub@tamu.edu" },
              { icon: <Icons.LinkedIn />, label: "LinkedIn", href: "https://www.linkedin.com/in/araavind-subramoniam" },
              { icon: <Icons.GitHub />, label: "Phone", href: "tel:+1 (979) 422 4801" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 28px",
                  borderRadius: 8,
                  background: "rgba(255,255,255,0.03)",
                  color: "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 13,
                  border: "1px solid rgba(255,255,255,0.08)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(245,197,24,0.4)";
                  e.currentTarget.style.color = "#f5c518";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── FOOTER ── */}
      <footer style={{ textAlign: "center", padding: "40px 24px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
          <div style={{ width: 20, height: 2, background: "rgba(245,197,24,0.3)" }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
            
          </span>
          <div style={{ width: 20, height: 2, background: "rgba(245,197,24,0.3)" }} />
        </div>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.15)" }}>
          © {new Date().getFullYear()} Araavind Subramoniam
        </p>
      </footer>
      </main>
    </>
  );
}
