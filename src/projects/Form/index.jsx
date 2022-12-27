import { useState } from "react";
import "./FormStyle.scss";

export default function Form() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    age: 0,
    genre: "",
    experience: "0",
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const { name, email, age, genre, experience } = userData;
    if (!name || !email || !age || !genre || !experience) return;

    let experienceLevel;
    if (experience > 50) {
      experienceLevel = "senior";
    } else if (experience < 50) {
      experienceLevel = "junior";
    } else {
      experienceLevel = "mid";
    }

    alert(
      `Hello ${name}, we've sent an e-mail to ${email}. Please, confirm your application to our ${experienceLevel} level developer opportunity.`
    );
  };

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit}>
        <label className="input-label">Name</label>
        <input
          onChange={handleChange}
          className="input"
          type="text"
          name="name"
          value={userData.name}
          required
        />
        <label className="input-label">E-mail</label>
        <input
          onChange={handleChange}
          className="input"
          type="email"
          name="email"
          value={userData.email}
          required
        />
        <label className="input-label">Age</label>
        <input
          onChange={handleChange}
          className="input"
          type="number"
          name="age"
          value={userData.age ? userData.age : ""}
          required
        />
        <label className="input-label">Genre</label>
        <span className="radio-container">
          <div>
            <label className="input-option">Male</label>
            <input
              onChange={handleChange}
              className="input"
              id="male"
              type="radio"
              value="male"
              name="genre"
              checked={userData.genre === "male"}
              required
            />
          </div>
          <div>
            <label className="input-option">Female</label>
            <input
              onChange={handleChange}
              className="input"
              id="female"
              type="radio"
              value="female"
              name="genre"
              checked={userData.genre === "female"}
              required
            />
          </div>
          <div>
            <label className="input-option">Dismiss</label>
            <input
              onChange={handleChange}
              className="input"
              id="genre"
              type="radio"
              value="dismiss"
              name="genre"
              checked={userData.genre === "dismiss"}
              required
            />
          </div>
        </span>

        <label className="input-label">Expecience</label>
        <input
          onChange={handleChange}
          className="input"
          type="range"
          min="0"
          max="100"
          step="50"
          list="experience"
          name="experience"
          value={userData.experience}
          required
        />
        <datalist id="experience">
          <option value="0" label="Junior" className="input-option"></option>
          <option value="50" label="Mid" className="input-option"></option>
          <option value="100" label="Senior" className="input-option"></option>
        </datalist>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
