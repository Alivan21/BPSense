type AdminCardProps = {
  data: number;
  title: string;
  desc: string;
};

function AdminCard(props: AdminCardProps) {
  return (
    <div className="flex flex-col flex-1 gap-14 p-8 bg-blue-700 text-white rounded-md">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">{props.title}</h1>
        <i className="fa-solid fa-user"></i>
      </div>
      <span className="text-6xl font-bold">{props.data}</span>
      <span className="text-lg font-light">{props.desc}</span>
    </div>
  );
}

export default AdminCard;
