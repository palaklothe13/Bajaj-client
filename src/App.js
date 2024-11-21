import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";

const options = [
  { value: "numbers", label: "Numbers" },
  { value: "alphabets", label: "Alphabets" },
  { value: "highest_lowercase_alphabet", label: "Highest Lowercase Alphabet" },
];

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const backendUrl = "https://bfhl-2hn26qq84-palak-lothes-projects.vercel.app/bfhl";
  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);

      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        alert("The 'data' field is missing or not an array.");
        return;
      }

      const res = await axios.post(backendUrl, parsedInput, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setResponse(res.data);
      console.log("response is", res.data);
    } catch (error) {
      console.error("Error:", error.message);
      alert("Invalid JSON or API error");
    }
  };

  const renderResponse = () => {
    if (!response) return null;
    const filteredResponse = selectedOptions.reduce((acc, option) => {
      acc[option.value] = response[option.value];
      return acc;
    }, {});
    return <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>;
  };

  return (
    <div>
      <h1>BFHL Frontend</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter JSON"
      />
      <button onClick={handleSubmit}>Submit</button>
      <Select
        isMulti
        options={options}
        onChange={setSelectedOptions}
        placeholder="Filter Response"
      />
      {renderResponse()}
    </div>
  );
};

export default App;
