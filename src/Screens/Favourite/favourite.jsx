import React, { useEffect, useState } from 'react';
import CardwithDetails from '../Home/components/DetailedCard/cardwithDetails';
import { useSelector } from 'react-redux';
import api from '../../api/client';
import { toast } from 'react-toastify';
import './favourite.css';
import { useTranslation } from 'react-i18next';
import { FaTrash } from "react-icons/fa";

const LovesScreen = () => {
  const { token } = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [t, i18n] = useTranslation();

  const handleDeleteAll = async () => {
    try {
      let response = await api.delete(`/Cart/clearFavourite`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(response.data.items || []);
      toast.success(t("All favourites deleted successfully"));
    } catch (error) {
      toast.error(error.response?.data || t("Failed to delete favourites"));
    }
  };

  const handleDelete = async (id) => {
    try {
      let response = await api.delete(`/Cart/removeFromFavourite/${Number(id)}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(response.data.items || []);
      toast.success(t("Product removed from favourites"));
    } catch (error) {
      toast.error(error.response?.data || t("Failed to delete product"));
    }
  };

  useEffect(() => {
    let mounted = true;
    const fetchUserCartFavourite = async () => {
      try {
        let response = await api.get("/Cart/GetFavouriteCart", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (mounted) setData(response.data.items || []);
      } catch (error) {
        toast.error(error.response?.data || t("Failed to load favourites"));
      }
    };
    fetchUserCartFavourite();
    return () => { mounted = false };
  }, [token, t]);

  return (
    <div className="favourite-container container py-4">
      {data.length > 0 ? (
        <>
          {/* Header with Delete All */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold mb-0">{t("My Favourites")}</h3>
            <button
              className={`btn btn-danger d-flex align-items-center gap-2 px-3 py-2 shadow-sm rounded-3 ${i18n.language === 'en' ? 'ms-auto' : 'me-auto'}`}
              onClick={() => {
                if (window.confirm(t("Are you sure you want to delete all favourites?"))) {
                  handleDeleteAll();
                }
              }}
            >
              <FaTrash /> {t("Delete All")}
            </button>
          </div>

          {/* Grid of Favourite Cards */}
          <div className="row g-4">
            {data.map((item, index) => (
              <div className="col-12 col-sm-6 col-md-5 col-lg-3" key={index}>
                <div className="card favourite-card shadow-sm border-0 h-100 position-relative">
                  <CardwithDetails
                    product={{
                      title: i18n.language === 'en' ? item.productNameEn : item.productNameAr,
                      size: item.size,
                      price: "",
                      source: "photo_2025-07-23_17-18-33.jpg"
                    }}
                  />
                  <button
  className={`btn btn-outline-danger rounded-circle shadow-sm position-absolute  top-0 ${i18n.language === 'en' ? 'end-0' : 'start-0'} m-2`}
  onClick={() => {
    if (window.confirm(t("Are you sure you want to delete this product from favourites?"))) {
      handleDelete(item.id);
    }
  }}
  style={{ width: "2.5rem", height: "2.5rem" }}
>
  <FaTrash />
</button>

                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h3 className="text-center text-muted">{t("No Products found")}</h3>
      )}
    </div>
  );
};

export default LovesScreen;
