interface Props {
  title: string;
  value: string;
}

export const CurrentDetails = ({ title, value }: Props) => {
  return (
    <div className="current-details glass-card">
      <h5>{title}</h5>
      <p>{value}</p>
    </div>
  );
};
