interface SchoolItemProps {
  name: string;
  style: React.CSSProperties;
}
const SchoolItem = ({ name, style }: SchoolItemProps) => {
  return (
    <div style={style} className="p-4 border-b border-gray-300">
      <h3 className="text-xl font-bold">{name}</h3>
    </div>
  );
};
export default SchoolItem;
