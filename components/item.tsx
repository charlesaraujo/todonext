import { useState } from "react";
import Form from "./form";

const Item = (props: any) => {
  const [showForm, setShowForm] = useState(false);

  function handlerDelete(id: number) {
    props.delete(id);
    setShowForm(false);
  }

  function handlerSave(id: number, description: string) {
    props.save(id, description, props.done);
    setShowForm(false);
  }
  function handlerDone(id: number, done: boolean) {
    props.save(id, props.description, done);
  }

  return (
    <div className="flex justify-center relative">
      {showForm && (
        <Form
          {...props}
          save={handlerSave}
          delete={handlerDelete}
          cancel={() => setShowForm(false)}
        />
      )}
      {!showForm && (
        <div className=" flex relative justify-between  mt-2 bg-zinc-50 rounded-md px-4 py-4 shadow shadow-zinc-800 max-w-md w-full">
          <div className="flex relative justify-between">
            <span
              onClick={() => handlerDone(props.id, !props.done)}
              className={`cursor-pointer material-icons mr-2 ${
                props.done ? "text-zinc-800" : "text-zinc-400"
              }`}
            >
              check_circle
            </span>
            <p
              className={`font-medium ${
                props.done ? "line-through text-zinc-400" : "text-zinc-700"
              }`}
            >
              {props.description} {props.done}
            </p>
          </div>
          <span
            className="material-icons-outlined cursor-pointer"
            onClick={() => setShowForm(true)}
          >
            mode_edit
          </span>
        </div>
      )}
    </div>
  );
};

export default Item;
