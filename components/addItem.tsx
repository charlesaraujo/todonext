import { useState } from "react";
import handler from "../pages/api/todo";
import Form from "./form";

const AddItem = (props: any) => {
  const [showForm, setShowForm] = useState(false);
  function handlerCreate(description: string) {
    props.create(description);
    setShowForm(false);
  }

  return (
    <div className="flex justify-center relative">
      {showForm && (
        <Form create={handlerCreate} cancel={() => setShowForm(false)} />
      )}
      {!showForm && (
        <div
          onClick={() => setShowForm(true)}
          className=" flex 
                    justify-center 
                    cursor-pointer
                    mt-2 
                    bg-zinc-700 text-zinc-300
                    rounded-md 
                    px-8 py-4 
                    max-w-md w-full
                    border-2 border-zinc-400 border-dotted"
        >
          <p>Adicionar tarefa</p>
        </div>
      )}
    </div>
  );
};

export default AddItem;
