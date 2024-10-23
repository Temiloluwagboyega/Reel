// import React, { useEffect, useState } from "react";
// import api from "../../Api"; // Adjust the import based on your project structure
// import axios from "axios";
// import { useNavigate, Navigate } from "react-router-dom";
// import img from './heart-of-stone.jpg'

// const ProfileSetup = () => {
//   const [availablePreferences, setAvailablePreferences] = useState([]); // Preferences from API

//   const [preference1, setPreference1] = useState([]); // Selected preference
//   const [preference2, setPreference2] = useState([]); // Selected preference
//   const [preference3, setPreference3] = useState([]); // Selected preference
//   const [preference4, setPreference4] = useState([]); // Selected preference
//   const [preference5, setPreference5] = useState([]); // Selected preference
//   const [preference6, setPreference6] = useState([]); // Selected preference
//   const navigate = useNavigate();
//   // Fetch preferences from the API
//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:8000/content-prefrence/")
//       .then((response) => {
//         setAvailablePreferences(response.data); // Store the available preferences
//       })
//       .catch((error) => {
//         console.error("Error fetching preferences", error);
//       });
//   }, []);

//   //   // Handle checkbox changes
//   //   const handleChange = (e) => {
//   //     const value = e.target.value;
//   //     setSelectedPreferences((prev) =>
//   //       prev.includes(value)
//   //         ? prev.filter((item) => item !== value)
//   //         : [...prev, value]
//   //     );
//   //   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = { preference1, preference2, preference3 , preference4, preference5, preference6 };
//       const response = await api.post("/profile/setup/", payload);
//       alert(response.data.message);
//       navigate("/");
//     } catch (error) {
//       console.error(error);
//       alert("Error setting up profile.");
//     }
//   };

//   return (
//     <>
//       <div className="profile-container flex ">
//         <div className="content grid justify-center self-center w-full p-14">
//           <div>
//           <h2>Profile Setup</h2>
//           <p>Select Prefrences of your choice to enhance your content visibility on specific prefrence.</p>
//         <div className="flex gap-7 flex-wrap">
//           {availablePreferences.map((preference) => (
//             <div className=" text-green-600 border-solid border-2 border-green-600 rounded-3xl px-8 py-2 " key={preference.id}>
//               <label>{preference.name}</label>
//             </div>
//           ))}
//         </div><br /><br />
//         <form onSubmit={handleSubmit} className="flex flex-wrap gap-5">
//           <input
//             className="form-input rounded-lg pl-1 pr-10 py-2 w-96 border-solid border-2 border-gray-300 outline-green-600"
//             type="text"
//             value={preference1}
//             onChange={(e) => setPreference1(e.target.value)}
            
//             placeholder="Enter Prefrence"
//           />
//           <input
//             className="form-input rounded-lg pl-1 pr-10 py-2 w-96 border-solid border-2 border-gray-300 outline-green-600"
//             type="text"
//             value={preference2}
//             onChange={(e) => setPreference2(e.target.value)}
            
//             placeholder="Enter Prefrence"
//           />
//           <input
//             className="form-input rounded-lg pl-1 pr-10 py-2 w-96 border-solid border-2 border-gray-300 outline-green-600"
//             type="text"
//             value={preference3}
//             onChange={(e) => setPreference3(e.target.value)}
            
//             placeholder="Enter Prefrence"
//           />
//           <input
//             className="form-input rounded-lg pl-1 pr-10 py-2 w-96 border-solid border-2 border-gray-300 outline-green-600"
//             type="text"
//             value={preference4}
//             onChange={(e) => setPreference4(e.target.value)}
            
//             placeholder="Enter Prefrence"
//           />
//           <input
//             className="form-input rounded-lg pl-1 pr-10 py-2 w-96 border-solid border-2 border-gray-300 outline-green-600"
//             type="text"
//             value={preference5}
//             onChange={(e) => setPreference5(e.target.value)}
            
//             placeholder="Enter Prefrence"
//           />
//           <input
//             className="form-input rounded-lg pl-1 pr-10 py-2 w-96 border-solid border-2 border-gray-300 outline-green-600"
//             type="text"
//             value={preference6}
//             onChange={(e) => setPreference6(e.target.value)}
            
//             placeholder="Enter Prefrence"
//           /> <br />

//           <button type="submit" className="rounded-lg bg-green-600 text-white text-center w-96 py-2 border-2 border-solid border-green-600 hover:bg-white hover:text-green-600 transition-all"   >Save Preferences</button>
//         </form>
//      </div>
//         </div>
//         <img src={img} alt="" className=" h-screen w-2/5"/>
//       </div>
//     </>
//   );
// };

// export default ProfileSetup;





import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import img from './heart-of-stone.jpg';

const ProfileSetup = () => {
  const [availablePreferences, setAvailablePreferences] = useState([]); // Preferences from API
  const [preferences, setPreferences] = useState(["", "", "", "", "", ""]); // Store input values

  const navigate = useNavigate();

  // Fetch preferences from the API
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/content-prefrence/")
      .then((response) => {
        setAvailablePreferences(response.data); // Store available preferences
      })
      .catch((error) => {
        console.error("Error fetching preferences", error);
      });
  }, []);

  // Handle preference click and populate the next available input
  const handlePreferenceClick = (name) => {
    const nextIndex = preferences.findIndex((pref) => pref === "");
    if (nextIndex !== -1) {
      const updatedPreferences = [...preferences];
      updatedPreferences[nextIndex] = name;
      setPreferences(updatedPreferences);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        preference1: preferences[0],
        preference2: preferences[1],
        preference3: preferences[2],
        preference4: preferences[3],
        preference5: preferences[4],
        preference6: preferences[5],
      };
      const response = await axios.post("/profile/setup/", payload);
      alert(response.data.message);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Error setting up profile.");
    }
  };

  return (
    <>
      <div className="profile-container flex">
        <div className="content grid justify-center self-center w-full p-14">
          <div>
            <h2>Profile Setup</h2>
            <p>Select preferences to enhance your content visibility.</p>
            <div className="flex gap-7 flex-wrap">
              {availablePreferences.map((preference) => (
                <div
                  key={preference.id}
                  className="text-green-600 border-solid border-2 border-green-600 rounded-3xl px-8 py-2 cursor-pointer"
                  onClick={() => handlePreferenceClick(preference.name)}
                >
                  <label>{preference.name}</label>
                </div>
              ))}
            </div>
            <br />
            <br />
            <form onSubmit={handleSubmit} className="flex flex-wrap gap-5">
              {preferences.map((value, index) => (
                <input
                  key={index}
                  className="form-input rounded-lg pl-1 pr-10 py-2 w-96 border-solid border-2 border-gray-300 outline-green-600"
                  type="text"
                  value={value}
                  onChange={(e) => {
                    const updatedPreferences = [...preferences];
                    updatedPreferences[index] = e.target.value;
                    setPreferences(updatedPreferences);
                  }}
                  placeholder={`Enter Preference ${index + 1}`}
                />
              ))}
              <br />
              <button
                type="submit"
                className="rounded-lg bg-green-600 text-white text-center w-96 py-2 border-2 border-solid border-green-600 hover:bg-white hover:text-green-600 transition-all"
              >
                Save Preferences
              </button>
            </form>
          </div>
        </div>
        <img src={img} alt="" className="h-screen w-2/5" />
      </div>
    </>
  );
};

export default ProfileSetup;
