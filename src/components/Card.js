const Card = ({ customClass, onClick, flash }) => {
  return (
    <div
      onClick={onClick}
      className={`cardStyle ${customClass} ${flash ? "flash" : ""}`}
    />
  );
};
export default Card;
