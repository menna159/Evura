import './CardPage.css'
export const Card = ({ source, onClick }) => {
  return (
<div onClick={onClick} className="card border-0 bg-none ImageContainer">
  <div className="ImageWrapper">
    <img
      src={source}
      className=" Image"
      alt="Cosmetic Product"
    />
  </div>
</div>

  );
};
