import React from "react";
import "./Schedule.css";

interface Props {
  schedule: TSchedule;
}

const Schedule: React.FC<Props> = (props) => {
  return (
    <table className="schedule">
      <thead>
        <tr className="row">
          <th className="col">Weekday</th>
          <th className="col">Open</th>
          <th className="col">Close</th>
        </tr>
      </thead>
      <tbody>
        {props.schedule.days.map((day) => {
          return (
            <tr key={day.weekday} className="row">
              <td className="col">{day.weekday}</td>
              <td className="col">{day.open}</td>
              <td className="col">{day.close}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Schedule;

/*

*/
