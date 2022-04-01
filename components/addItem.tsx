const AddItem = (props: any) => {
  return (
    <div className="flex justify-center">
      <div
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
        <p>Add tarefa</p>
      </div>
    </div>
  );
};

export default AddItem;
