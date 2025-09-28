import React, { useEffect, useState } from 'react';
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import { Carousel } from 'react-bootstrap';
import './productDetails.css';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { data, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api, { absoluteUrl } from '../../api/client';
import { Rating } from 'react-simple-star-rating';
import { FaTrash } from 'react-icons/fa';

const ProductDetails = () => {
  const [heartHovered, setHeartHovered] = useState(false);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [t, i18n] = useTranslation();
  const location = useLocation();
  const { product } = location.state || {};
  const { token,name } = useSelector((state) => state.user);
    const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
    const [rating, setRating] = useState(0);
   const [review,setReview]=useState(false);
   const [added,setAdded]=useState(false);
   const [calculatedPrice, setCalculatedPrice] = useState(product?.price || 0);
      const [calculatedTotalBeforeDiscount, setcalculatedTotalBeforeDiscount] = useState(product?.toTalBeforeDiscount || 0);
    const handleRating = (rate) => {
    setRating(rate);
    
  };
  const handleReview=()=>{
    if(token){
      setReview(true)
    }else{
      toast.error("You must login first!")
    }
  }
  useEffect(() => {
    const fetchComments = async () => {
      try {
        let res = await api.get(
          `/Product/GetAllmessages/${product.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setComments(res.data);
        
      } catch (err) {
        console.error(err);
      }
    };

    if (product?.id) {
      fetchComments();
    }
  }, [product, token]);
useEffect(() => {
  let basePrice = product?.price || 0;
  let baseTotalBeforeDiscount=product?.toTalBeforeDiscount||0;
  // ✅ If size has a different price, use it
  if (selectedSize) {
    const sizeObj = product?.productSizes?.find((s) => s.id == selectedSize);
    if (sizeObj?.price) {
      basePrice = sizeObj.price;
      baseTotalBeforeDiscount=sizeObj.toTalBeforeDiscount;
    }
  }

  setCalculatedPrice(basePrice * quantity);
  setcalculatedTotalBeforeDiscount(baseTotalBeforeDiscount*quantity);
}, [quantity, selectedSize, product]);



const handleAddReview = async () => {
  if (!newComment.trim()) {
    toast.error("Comment cannot be empty!");
    return;
  }
  if (!rating) {
    toast.error("You must select rating!");
    return;
  }
  try {
    let res = await api.post(
      "/Product/AddMessage",
      { productId: product.id, message: newComment },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setComments((prev) => [...prev, res.data]); 
    setNewComment("");
    
    
    await api.post(
      "/Product/AddProductRate",
      { productId: product.id, rating: rating },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    toast.success("Comment and rating added!");
    setReview(false);   
  } catch (err) {
    if (err.response) {
      toast.error(err.response.data);
    } else {
      toast.error("Failed to add comment");
    }
    setReview(false); 
  }
};

   const handleDeleteComment=async(id)=>{
    try {
      if(confirm('Do you want to delete Your Comment?')){
        let res=await api.delete(`http://localhost:5047/Product/Message/${id}`, {
  headers: { Authorization: `Bearer ${token}` }
                 })
        setComments((prev) => prev.filter((c) => c.id !== id));
         toast.success('Comment Deleted Successfully!')        
      }

    } catch (error) {
      if(error.response)toast.error(error.response.data)
    }
   }
  const handleAddtoBasket = async () => {
     if (!selectedSize && !selectedColor) {
  toast.error("Please select size and color before adding to Basket");
  return;
} 
else if(!selectedSize){
  toast.error("Please select size  before adding to Basket");
  return;
}
else if(!selectedColor){
  toast.error("Please select color  before adding to Basket");
  return;
}

    try {
      let response = await api.post(
        "/Cart/AddToCart",
        {
          productId: product.id,
          quantity: quantity,
          productColorId: selectedColor,
          productSizeId: selectedSize,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
     let data=response.data;
      toast.success(`Added to Basket! 🛒`);
      setAdded(true)
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data);
      }
    }
  };
  const handleFavourite = async () => {
  try {

    let response = await api.post(
      "/Cart/AddToFavourite",
      {
        productId: product.id,
        quantity:quantity,
        productSizeId: Number(selectedSize) || null,
        productColorId: selectedColor || null,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
        setHeartHovered(true);

    toast.success("Added to Favourites ❤️");
  } catch (err) {
    toast.error(err);
    console.error(err);
  }
};
//  const showRate=async()=>{
//   let resonse=await 
//  }
const updateCart = async (quantity) => {
  try {
    let response = await api.put(
      `/Cart/updateCartItem?itemId=${product.id}&newQuantity=${quantity}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    toast.success("Quantity updated 🛒");
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data);
    } else {
      toast.error("Failed to update quantity");
    }
  }
};
const formatPrice = (value) => {
  const locale = i18n.language === "ar" ? "ar-EG" : "en-US";
  const formattedNumber = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
  }).format(value);

  return `${formattedNumber} ${t("EGP")}`;
};


  return (

    <div className="container my-5 overflow-hidden position-relative">
      <div className="row g-5 align-items-start">

        {/* Product Carousel */}
        <div className="col-md-5">
          <Carousel className="product-carousel">
            {product?.productColors?.map((color, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100 carousel-image"
                  src={color.photoUrl?absoluteUrl(color.photoUrl):absoluteUrl(product.photoUrl)}
                  alt={`Slide ${index + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        {/* Product Info */}
        <div className="col-md-7">
          
       

          <div className='d-flex justify-content-between'>
            <h4 className="fw-bold">
              {i18n.language === 'en' ? product?.nameEn : product?.nameAr}
            </h4>
            <span
             onClick={handleFavourite}
              className="wishlist-icon"
            >
              {heartHovered ? <VscHeartFilled color="#E50046" /> : <VscHeart />}
            </span>
          </div>
               <Rating 
          initialValue={product.averageRating} 
               readonly 
             size={25}
                 />
          <h5 className="text-muted mb-3">
            {i18n.language === 'en' ? product?.notesEn : product?.notesAr}
          </h5>

          {/* Price */}
          <div>
            <p className={`fw-bold fs-4 d-inline ${product?.discount?'text-danger':"text-success"}`}>
              {formatPrice(calculatedPrice)}
            </p>
            {product?.discount > 0 && (
              <p className="text-muted text-decoration-line-through d-inline ms-2">
                 {formatPrice(calculatedTotalBeforeDiscount)}
              </p>
            )}
          </div>

          {/* Size Selection */}
          <div className="mb-4">
            <label className="form-label fw-bold me-2">{t("Size")}:</label>
            <select
              className="form-select w-auto d-inline-block shadow-sm border-1 m-3"
              value={selectedSize || ""}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="">{t("Select size")}</option>
              {product?.productSizes?.map((size) => (
                <option key={size.id} value={size.id}>
                  {i18n.language === 'en' ? size.nameEn : size.nameAr}
                </option>
              ))}
            </select>
          </div>
         
          {/* Color Selection */}
          <div className="mb-4">
            <strong>{t("Color")} :</strong>
            <div className="color-options">
              {product?.productColors?.map((color) => (
                <div
                  key={color.id}
                  className="d-flex flex-column justify-content-center align-items-center"
                >
                 
                    
                     <div
                    className={`color-option ${selectedColor === color.id ? 'selected' : ''}`}
                    onClick={() => setSelectedColor(color.id)}
                  >
                    {color.photoUrl?
                    <img src={absoluteUrl(color.photoUrl)} alt="color" className="color-Image" />
                    :
                        
                    <p className='no-image-text'>{t('No image found')}</p>
                       }
                     </div>
                    
                   
                    
                 <div>
                  <p className='text-center'>{i18n.language === 'en' ? color.nameEn : color.nameAr}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity + Add to Basket */}

       <div className="d-flex align-items-center mb-3">
            <button type="button" className=" quantity-button ">
            <select
              className="quantity-select me-3"
              value={quantity}
              onChange={(e) =>setQuantity(Number(e.target.value))}
            >
              {Array.from({ length: product?.quantity || 0 }, (_, index) => index + 1).map((num) => (
                <option key={num} value={num} className="quantity-option">{num}</option>
              ))}
            </select>
             </button>
            <button type="button" className="add-to-basket-button" onClick={handleAddtoBasket}>
              <div className="d-flex flex-column align-items-center">
                <span className="fw-bold">{t('Add to Basket')}</span>
                <small>{t('Get it shipped')}</small>
              </div>
            </button>
          </div>

         
          <a className='link' onClick={()=>handleReview()}>{t('Write Review')}</a>
       {review&&   <div className='z-3 bg-dark p-3 border-rounded-4 postion-absolute w-75 h-50'>
             <div className="d-flex flex-column gap-2">
              <h4 className='text-light'>{t('Rate this product')}</h4>
               <Rating onClick={handleRating} ratingValue={rating} size={25} />
               <h4 className='text-light'>{t('Review')}</h4>
    <input
      type="text"
      className="form-control"
      placeholder={t("Write a comment...")}
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
    />

    <button className="btn btn-danger mt-3" onClick={handleAddReview}>
      {t("Post")}
    </button>
  </div>
          </div>}
          {/* Comments Section */}
<div className="mt-5">
  <h5 className="fw-bold mb-3">{t("Comments")}</h5>

  {comments.length > 0 ? (
    <div className="comment-list">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="d-flex align-items-start border rounded p-3 mb-3 shadow-sm bg-light"
        >
          {/* Avatar/Icon */}
          <div className="me-3">
            <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
              style={{ width: "40px", height: "40px", fontSize: "18px" }}
            >
              {comment.userName ? comment.userName.charAt(0).toUpperCase() : "?"}
            </div>
          </div>

          {/* Comment Content */}
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-center">
              <strong>{comment.userName || t("Anonymous")}</strong>

              {/* Delete button only for owner */}
              {name === comment.userName && (
                <button
                  className="btn btn-sm btn-outline-danger rounded-circle shadow-sm"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  <FaTrash size={14} />
                </button>
              )}
            </div>

            <small className="text-muted d-block mb-2">
              {new Date(comment.createdAt).toLocaleString(
                i18n.language === "en" ? "en-SA" : "ar-EG",
                {
                  day: "numeric",
                  year: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </small>

            <p className="mb-0">{comment.message}</p>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-muted">{t("No comments yet. Be the first!")}</p>
  )}
</div>


        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
