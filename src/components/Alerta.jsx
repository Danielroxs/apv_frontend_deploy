const Alerta = ({ alerta }) => {
  if (!alerta?.msg) return null;

  return (
    <div
      className={`${
        alerta.error ? "from-red-400 to-red-600" : "bg-indigo-400 to-indigo-600"
      } bg-gradient-to-r text-center p-3  rounded-xl uppercase text-white font-bold text-sm mb-10`}
    >
      {alerta.msg}
    </div>
  );
};

export default Alerta;
