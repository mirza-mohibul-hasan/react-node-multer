import { useState } from "react";
import axios from "axios";

const App = () => {
  const [file, setFile] = useState();
  const [description, setDescription] = useState("");
  const [imageName, setImageName] = useState();

  const submit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("description", description);

    const result = await axios.post("http://localhost:5000/image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setImageName(result.data.imageName);
  };

  return (
    <div className="App">
      <p>{imageName}</p>
      <form onSubmit={submit}>
        <input
          // eslint-disable-next-line react/no-unknown-property
          filename={file}
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          accept="image/*"
        ></input>
        <input
          onChange={(e) => setDescription(e.target.value)}
          type="text"
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
