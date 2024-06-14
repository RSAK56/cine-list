"use client";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CustomCircularProgressBar = ({ rating, clockwise }: any) => {
  const percentage = Math.ceil((rating / 10) * 100);
  return (
    <div className="w-8 h-8">
      <CircularProgressbarWithChildren
        value={percentage}
        styles={buildStyles({
          strokeLinecap: "butt",
          textSize: "32px",
          pathTransitionDuration: 0.5,
          pathColor: `#EAB308`,
          textColor: "#EAB308",
          trailColor: "#d6d6d6",
          backgroundColor: "#3e98c7",
        })}
      >
        <div className="text-[10px]">
          <strong>{percentage}%</strong>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default CustomCircularProgressBar;
