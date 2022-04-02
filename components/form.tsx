import { useState, useEffect } from "react";

const Form = (props: any) => {
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (props.description) {
      setDescription(props.description);
    }
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (props.id) {
      props.save(props.id, description);
      return;
    }
    props.create(description);
    setDescription("");
  };
  const cancel = (e: any) => {
    e.preventDefault();
    props.cancel();
  };
  const deletetar = (e: any) => {
    e.preventDefault();
    props.delete(props.id);
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center w-full">
      <div className="relative justify-center mt-2 bg-zinc-50 rounded-md  shadow shadow-zinc-800 max-w-md w-full">
        <div className="p-4">
          <div className="flex space-x-2 bg-inherit border-none">
            <input
              type="text"
              placeholder="Em que Você está trabalhando?"
              className="w-full outline-none bg-inherit text-xl font-extrabold placeholder:italic placeholder:text-zinc-300 text-zinc-800"
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
            />
          </div>
        </div>

        <div className="bg-zinc-200 mt-1 px-4 py-2 w-full rounded-b-md flex justify-between">
          <div>
            {props.id && (
              <button
                onClick={deletetar}
                className="bg-zinc-800 text-zinc-50 px-2 py-1 rounded-md font-light disabled:bg-zinc-400"
              >
                Delete
              </button>
            )}
          </div>
          <div>
            <button
              onClick={cancel}
              className="text-zinc-400 px-2 py-1 mr-2 font-light"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-zinc-800 text-zinc-50 px-2 py-1 rounded-md font-light disabled:bg-zinc-400"
              disabled={!description}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
