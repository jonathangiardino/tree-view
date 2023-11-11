import React from "react";
import { motion } from "framer-motion";

const Icon = ({ name, className, openState }: IconProps) => {
  const [hovered, setHovered] = React.useState(false);

  switch (name) {
    case "folder":
      return (
        <motion.svg
          width="23"
          height="22"
          viewBox="0 0 23 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <motion.g id="folder">
            <motion.g
              id="back"
              animate={{
                skewX: openState ? 12 : 0,
                scale: openState ? 0.9 : 1,
              }}
              transition={{
                duration: 0.4,
                ease: [0.32, 0.72, 0, 1],
              }}
            >
              <motion.path
                id="back_2"
                d="M20.3115 7.21873L20.3594 12.709C20.3655 13.4054 20.3693 13.8911 20.3416 14.2692C20.3144 14.6404 20.2596 14.8535 20.1785 15.015C20.0048 15.3612 19.7253 15.6431 19.3807 15.8198C19.2199 15.9023 19.0073 15.9589 18.6364 15.9893C18.2585 16.0203 17.7728 16.0208 17.0763 16.0208H7.5312C6.84014 16.0208 6.35842 16.0203 5.98338 15.9897C5.61544 15.9596 5.40404 15.9036 5.24392 15.822C4.90071 15.6471 4.62168 15.3681 4.4468 15.0249C4.36522 14.8648 4.30918 14.6534 4.27911 14.2854C4.24847 13.9104 4.248 13.4287 4.248 12.7376V6.1712C4.248 5.48014 4.24847 4.99842 4.27911 4.62338C4.30918 4.25543 4.36522 4.04404 4.4468 3.88392C4.62168 3.54071 4.90071 3.26168 5.24392 3.0868C5.40404 3.00522 5.61544 2.94918 5.98338 2.91911C6.35842 2.88847 6.84014 2.888 7.5312 2.888H9.49732C9.91194 2.888 10.314 3.0302 10.6364 3.29088C11.1752 3.72651 11.8472 3.96416 12.5401 3.96416H15.7353H17.0285C17.7141 3.96416 18.192 3.96463 18.5642 3.99493C18.9292 4.02465 19.1393 4.08005 19.2988 4.1608C19.6405 4.3338 19.9191 4.60997 20.0951 4.95018C20.1773 5.10899 20.2345 5.3186 20.2674 5.68337C20.3009 6.05528 20.3056 6.53309 20.3115 7.21873Z"
                fill="#E8A484"
                stroke="white"
                strokeWidth="1.216"
              />
            </motion.g>
            <motion.g
              id="front"
              animate={{
                skewX: openState ? -12 : 0,
                scale: openState ? 0.9 : 1,
                x: openState ? "8%" : 0,
              }}
              transition={{
                duration: 0.2,
                ease: [0.32, 0.72, 0, 1],
              }}
            >
              <rect
                id="front_2"
                x="4.248"
                y="5.80639"
                width="16.1456"
                height="10.2144"
                rx="1.824"
                fill="url(#paint0_linear_1_14)"
                stroke="white"
                strokeWidth="1.216"
              />
            </motion.g>
          </motion.g>
          <defs>
            <linearGradient
              id="paint0_linear_1_14"
              x1="12.3208"
              y1="2.28"
              x2="12.3208"
              y2="16.6288"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#D9622B" />
              <stop offset="1" stopColor="#D9622B" stopOpacity="1" />
            </linearGradient>
          </defs>
        </motion.svg>
      );

    case "file":
      return (
        <motion.svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          onMouseOver={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <g id="file">
            <g id="Vector 1">
              <motion.path
                d="M17 10.5C17 10.0626 16.8202 9.64434 16.5028 9.34332L12.5929 5.6352C12.1628 5.22735 11.5927 5 11 5V5V8.07C11 9.41205 12.0879 10.5 13.43 10.5H17V10.5Z"
                animate={{
                  d: hovered
                    ? "M17 12.5C17 12.1811 16.8676 11.8765 16.6345 11.6588L9.86553 5.34116C9.63064 5.12193 9.3213 5 9 5V5V10.07C9 11.4121 10.0879 12.5 11.43 12.5H17V12.5Z"
                    : "M17 10.5C17 10.0626 16.8202 9.64434 16.5028 9.34332L12.5929 5.6352C12.1628 5.22735 11.5927 5 11 5V5V8.07C11 9.41205 12.0879 10.5 13.43 10.5H17V10.5Z",
                }}
                fill="#363535"
              />
              <motion.path
                d="M7.43 5C6.08795 5 5 6.08795 5 7.43V15.57C5 16.9121 6.08795 18 7.43 18H14.57C15.9121 18 17 16.9121 17 15.57V10.5H13.43C12.0879 10.5 11 9.41205 11 8.07V5H7.43Z"
                animate={{
                  d: hovered
                    ? "M7.43 5C6.08795 5 5 6.08795 5 7.43V15.57C5 16.9121 6.08795 18 7.43 18H14.57C15.9121 18 17 16.9121 17 15.57V12.5H11.43C10.0879 12.5 9 11.4121 9 10.07V5H7.43Z"
                    : "M7.43 5C6.08795 5 5 6.08795 5 7.43V15.57C5 16.9121 6.08795 18 7.43 18H14.57C15.9121 18 17 16.9121 17 15.57V10.5H13.43C12.0879 10.5 11 9.41205 11 8.07V5H7.43Z",
                }}
                fill="#a5a5a5"
              />
              <motion.path
                d="M11 5V5C11.5927 5 12.1628 5.22735 12.5929 5.6352L16.5028 9.34332C16.8202 9.64434 17 10.0626 17 10.5V10.5M11 5H7.43C6.08795 5 5 6.08795 5 7.43V15.57C5 16.9121 6.08795 18 7.43 18H14.57C15.9121 18 17 16.9121 17 15.57V10.5M11 5V8.07C11 9.41205 12.0879 10.5 13.43 10.5H17"
                animate={{
                  d: hovered
                    ? "M9 5V5C9.3213 5 9.63064 5.12193 9.86553 5.34116L16.6345 11.6588C16.8676 11.8765 17 12.1811 17 12.5V12.5M9 5H7.43C6.08795 5 5 6.08795 5 7.43V15.57C5 16.9121 6.08795 18 7.43 18H14.57C15.9121 18 17 16.9121 17 15.57V12.5M9 5V10.07C9 11.4121 10.0879 12.5 11.43 12.5H17"
                    : "M11 5V5C11.5927 5 12.1628 5.22735 12.5929 5.6352L16.5028 9.34332C16.8202 9.64434 17 10.0626 17 10.5V10.5M11 5H7.43C6.08795 5 5 6.08795 5 7.43V15.57C5 16.9121 6.08795 18 7.43 18H14.57C15.9121 18 17 16.9121 17 15.57V10.5M11 5V8.07C11 9.41205 12.0879 10.5 13.43 10.5H17",
                }}
                stroke="white"
                strokeWidth="1.22"
                strokeLinejoin="round"
              />
            </g>
          </g>
        </motion.svg>
      );

    case "section":
      return (
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="home">
            <g id="Group 1">
              <path
                id="Line 1"
                d="M9.0956 5L8.00464 17.0005"
                stroke="white"
                strokeWidth="1.22"
                strokeLinecap="round"
              />
              <path
                id="Line 3"
                d="M17.05 8.45473L5 8.45473"
                stroke="white"
                strokeWidth="1.22"
                strokeLinecap="round"
              />
              <path
                id="Line 4"
                d="M17.0546 13L5.00464 13"
                stroke="white"
                strokeWidth="1.22"
                strokeLinecap="round"
              />
              <path
                id="Line 2"
                d="M14.0956 5L13.0046 17.0005"
                stroke="white"
                strokeWidth="1.22"
                strokeLinecap="round"
              />
            </g>
          </g>
        </svg>
      );

    default:
      return null;
  }
};

export default Icon;
