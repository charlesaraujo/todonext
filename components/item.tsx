const Item = (props: any) => {
  return (
    <div className="flex justify-center">
      <div className=" relative justify-center mt-2 bg-white rounded-md px-8 py-4 shadow shadow-zinc-800 max-w-md w-full">
        <p className="">{props.description}</p>
      </div>
    </div>
  );
};

export default Item;
