import { gql, useQuery } from "@apollo/client";

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
            <th>When</th>
            <th>Patient</th>
            <th>Provider</th>
          </tr>
        </thead>
        <tbody>
          {data.schedules.map((item, index) => {
            let x = new Date(Number(item.when));

            return (
              <tr>                
                <td>{`${x.toLocaleDateString()} ${x.toLocaleTimeString()}`}</td>
                <td>{item.patientName}</td>
                <td>{item.doctorName}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Row({ items }) {
  return (
    <tr>
      {items.map((item, index) => (
        <td key={index}>{item}</td>
      ))}
    </tr>
  );
}
