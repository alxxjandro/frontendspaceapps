import "./RadialGauge.css";
import React from "react";

export default function RadialGauge({ value = 0, isDarkTheme = true }) {
  // --- Tu lógica original ---
  const clamped = Math.max(0, Math.min(100, value));
  const reversed = 100 - clamped;
  const textColor = isDarkTheme ? "#fff" : "#000";

  const color =
    reversed <= 25
      ? "greenGradient"
      : reversed <= 50
      ? "yellowGradient"
      : reversed <= 75
      ? "orangeGradient"
      : "redGradient";

  const label =
    reversed <= 25
      ? "Good"
      : reversed <= 50
      ? "Moderate"
      : reversed <= 75
      ? "Unhealthy"
      : "Hazardous";

  // --- CONFIGURACIÓN VISUAL NUEVA ---
  const VIEW_BOX_SIZE = 300;
  const TRACK_WIDTH = 30;
  const TRACK_SIZE_DEGREES = 270;
  const center = VIEW_BOX_SIZE / 2;
  const radius = center - TRACK_WIDTH / 2;
  const circumference = 2 * Math.PI * radius;

  // Arco visible (de 270°)
  const trackFillPercentage = TRACK_SIZE_DEGREES / 360;
  const trackDashoffset = circumference * (1 - trackFillPercentage);

  // Offset del valor (usando reversed, para mantener tu lógica)
  const valuePercentage = (reversed / 100) * trackFillPercentage;
  const valueDashoffset = circumference * (1 - valuePercentage);

  // Rotar el arco al centro
  const trackTransform = `rotate(${
    -(TRACK_SIZE_DEGREES / 2) - 90
  }, ${center}, ${center})`;

  return (
    <div className={` ${isDarkTheme ? "dark" : "light"}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${VIEW_BOX_SIZE} ${VIEW_BOX_SIZE}`}
        width="100%"
        height="100%"
      >
        <defs>
          <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4CAF50" />
            <stop offset="100%" stopColor="#2E7D32" />
          </linearGradient>
          <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FDD835" />
            <stop offset="100%" stopColor="#FBC02D" />
          </linearGradient>
          <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFA726" />
            <stop offset="100%" stopColor="#EF6C00" />
          </linearGradient>
          <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E53935" />
            <stop offset="100%" stopColor="#B71C1C" />
          </linearGradient>
        </defs>

        {/* Pista gris */}
        <circle
          fill="none"
          cx={center}
          cy={center}
          r={radius}
          stroke={isDarkTheme ? "#222" : "#ccc"}
          strokeWidth={TRACK_WIDTH}
          strokeDasharray={circumference}
          strokeDashoffset={trackDashoffset}
          strokeLinecap="round"
          transform={trackTransform}
        />

        {/* Valor */}
        <circle
          fill="none"
          cx={center}
          cy={center}
          r={radius}
          stroke={`url(#${color})`}
          strokeWidth={TRACK_WIDTH}
          strokeDasharray={circumference}
          strokeDashoffset={valueDashoffset}
          strokeLinecap="round"
          transform={trackTransform}
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />

        {/* Texto principal */}
        <text
          x="50%"
          y="45%"
          fill={textColor}
          fontSize="60"
          fontWeight="bold"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {clamped}
        </text>

        {/* Subtexto */}
        <text
          x="50%"
          y="65%"
          fill={textColor}
          fontSize="24"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {label}
        </text>
      </svg>
    </div>
  );
}
