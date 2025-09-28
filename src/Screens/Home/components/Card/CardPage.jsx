import './CardPage.css'
import { useTranslation } from "react-i18next";

export const SaleCard = ({ source, onClick, salePercent }) => {
  const [t, i18n] = useTranslation();
  const formatNumber = (value) => {
    const locale = i18n.language === "ar" ? "ar-EG" : "en-US";
    return new Intl.NumberFormat(locale).format(value);
  };

  return (
    <div onClick={onClick} className="card border-0 bg-none ImageContainer">
      <div className="ImageWrapper">
        <div className="sale-ribbon">-{formatNumber(salePercent)}%</div>
        <img
          src={source}
          className="Image"
          alt="Cosmetic Product"
        />
      </div>
    </div>
  );
};
