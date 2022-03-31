import { useState } from "react";

const Form = (props: any) => {
  const [description, setDescription] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.create(description);
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mt-10">
      <div className="bg-gray-50 p-8 rounded-lg">
        <h1 className="text-center mb-4 ">Adicionar</h1>
        <div className="flex space-x-2 p-2 rounded-md bg-gray-100 border">
          <input
            type="text"
            placeholder="Write here..."
            className="w-full outline-none bg-inherit"
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
          <button
            type="submit"
            className="bg-gray-900 px-2 py-1 rounded-md text-white font-semibold"
          >
            ADD
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
