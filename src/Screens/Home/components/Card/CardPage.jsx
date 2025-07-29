import './CardPage.css'
export const Card = ({ source, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="card border-0  ImageContainer"
    >
      <img
        src={source}
        className="card-img-top Image "
        alt="Cosmetic Product"
      />
    </div>
  );
};
