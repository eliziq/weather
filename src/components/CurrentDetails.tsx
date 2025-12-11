interface Props {
  title: string;
  value: string;
}

export const CurrentDetails = ({ title, value }: Props) => {
  return (
    <div className="current-details">
      <p>{title}</p>
      <h3>{value}</h3>
    </div>
  );
};
