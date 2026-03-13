"use client";

import React from "react";

export const FrameIcon = ({ className }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect
      x="1"
      y="1"
      width="16"
      height="16"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <rect
      x="4"
      y="4"
      width="10"
      height="10"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.6"
    />
  </svg>
);

export const CanvasIcon = ({ className }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect
      x="1"
      y="1"
      width="16"
      height="16"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);
