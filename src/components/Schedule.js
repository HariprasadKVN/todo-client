import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const ADD_SCHEDULE = gql`
  mutation addSchedule(
    $when: String!
    $patientName: String!
    $age: Int!
    $gender: String
    $contactNumber: String!
    $doctorName: String!
  ) {
    addSchedule(
      when: $when
      patientName: $patientName
      age: $age
      gender: $gender
      contactNumber: $contactNumber
      doctorName: $doctorName
    ) {
      id
      when
      patientName
      age
      gender
      contactNumber
      doctorName
    }
  }
`;

const Schedule = () => {
  const [name, setName] = useState(null);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("Select");
  const [contact, setContact] = useState("");
  const [when, setWhen] = useState("");
  const [doctorName, setDoctorName] = useState("");

  const [addSchedule, { data, loading, error }] = useMutation(ADD_SCHEDULE);

  async function addAppointment() {
    console.log("addAppoin");
    try {
      const x = await addSchedule({
        variables: {
          when: when,
          patientName: name,
          age: Number(age),
          gender: gender,
          contactNumber: contact,
          doctorName: doctorName,
        },
      });
    } catch {}
    setWhen("");
    setName(null);
    setAge("");
    setGender("");
    setContact("");
    setDoctorName("");
  }

  if (loading) return <p>Lodaing...</p>;
  // if (error) return <p>{error.message}</p>;

  return (
    <>
      
      <p>{error?error.message:""}</p>
        
      <div className="card border-primary border-opacity-75">
        <div className="card-header bg-primary bg-opacity-75">
          Book an Appointment
        </div>
        <div className="card-body">
          <h6 className="card-title">Pat Smith</h6>

          <form>
            <div className="row mb-1">
              <label htmlFor="when" className="col-sm-3 col-form-label">
                When
              </label>
              <div className="col-sm-9">
                <input
                  type="datetime-local"
                  className="form-control"
                  id="when"
                  onChange={(e) => setWhen(e.target.value.toString())}
                  value={when}
                />
              </div>
            </div>

            <div className="row mb-1">
              <label htmlFor="patientName" className="col-sm-3 col-form-label">
                Patient Name
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  id="patientName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="row mb-1">
              <label htmlFor="age" className="col-sm-3 col-form-label">
                Age
              </label>
              <div className="col-sm-3">
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <label htmlFor="gender" className="col-sm-2 col-form-label">
                Gender
              </label>
              <div className="col-sm-4">
                <select
                  id="gender"
                  className="form-control"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option>Select</option>
                  <option>Female</option>
                  <option>Male</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="row mb-1">
              <label htmlFor="number" className="col-sm-3 col-form-label">
                Contact Number
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  id="number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
            </div>
            <div className="row mb-1">
              <label htmlFor="number" className="col-sm-3 col-form-label">
                Physician/Provider
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  id="number"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                addAppointment();
              }}
              className="btn btn-primary"
            >
              Book
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Schedule;
