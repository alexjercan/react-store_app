import React from "react";
import "./Schedule.css";

interface Props {
  schedule: TSchedule;
}

const Schedule: React.FC<Props> = (props) => {
  return (
    <div>
      {props.schedule.days.map((day) => {
        return (
          <div key={day.weekday}>
            <div className="day">
              <div>{day.weekday}</div>
              <div>{day.open}</div>
              <div>{day.close}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Schedule;
