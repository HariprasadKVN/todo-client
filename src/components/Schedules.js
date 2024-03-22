import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

export const GET_SCHEDULES = gql`
  query getSchedules {
    schedules {
      id
      patientName
      when
      age
      gender
      contactNumber
      doctorName
    }
  }
`;

export default function Schedules({ title }) {
  const { loading, error, data } = useQuery(GET_SCHEDULES);
  if (loading) return <p>Lodaing</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      {title}
      <table className="table">
        <thead>
          <tr>
            <th colSpan={2}>When</th>

            <th>Patient</th>
            <th>Provider</th>
          </tr>
        </thead>
        <tbody>
          {data.schedules.map((item, index) => {
            return <Row key={index} item={item}></Row>;
          })}
        </tbody>
      </table>
    </div>
  );
}

function Row({ item }) {
  const [when, setWhen] = useState(item.when);
  const [id, setId] = useState(item.id);

  const initialDate = new Date(Number(item.when));
  const year = Intl.DateTimeFormat("en-US", {
    year: "numeric",
  }).format(initialDate);
  const month = Intl.DateTimeFormat("en-US", {
    month: "2-digit",
  }).format(initialDate);
  const day = Intl.DateTimeFormat("en-US", {
    day: "2-digit",
  }).format(initialDate);
  const hours = Intl.DateTimeFormat("en-US", {
    hour12: false,
    hour: "2-digit",
  }).format(initialDate);
  const minuts = Intl.DateTimeFormat("en-US", {
    minute: "2-digit",
  }).format(initialDate);
  console.log(hours);

  const [date, setDate] = useState(
    `${year}-${month}-${day}T${hours}:${minuts}`
  );

  const UPDATE_SCHEDULE = gql`
  mutation updateSchedule($id: ID!, $when: String!) {
    updateSchedule(id: $id, when:$when) {
        when
    }
  }
`;

  const [updateSchedule, { data, loading, error }] =
    useMutation(UPDATE_SCHEDULE);

  async function updateAppointment() {
    console.log("updateAppointment");
    try {
        console.log(date);
      const x = await updateSchedule({
        variables: {
          id: id,
          when: date,
        },
      });
    } catch {}
  }

  if (loading) return <p>Lodaing...</p>;
  // if (error) return <p>{error.message}</p>;

  return (
    <tr>
      {/* <td>{id}</td> */}
      <td>
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
      </td>
      <td
        onClick={(e) => {
          e.preventDefault();
          updateAppointment();
        }}
      >
        Save
      </td>
      <td>{item.patientName}</td>
      <td>{item.doctorName}</td>
    </tr>
  );
}
