import React, { useState, useRef, useEffect } from 'react';
import CategoryItems from '../../../Screens/Home/components/CategoryItem/CategoryItems';
import './SecondHeader.css';
import i18n from '../../../i18n';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchProductsByCategory, fetchProductsBySubCategory } from '../../../redux/ProductsRedux/Products';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../api/client';
export const SecondHeader = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef(null);
  const titleRefs = useRef([]);
  const [titles,setTitles]=useState([]);
  const [subCategories, setSubCategories] = useState({}); 
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {byCategory:products}=useSelector((state)=>state.products)
   useEffect(()=>{
  async function fetchData(){
      let response=await api.get('/Category/GetAll');
  let data=response.data;
  setTitles(data);
  }

  fetchData()
 },[])
 const fetchSubCategory=async(id)=>{
      let response=await api.get(`/SubCategory/GetAllSubCategoryByCategory/${id}`);
        setSubCategories((prev) => ({ ...prev, [id]: response.data }));   
            
 }
 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setActiveIndex(null);
        setActiveSubCategory(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTitleClick = (index) => {
  setActiveIndex((prev) => (prev === index ? null : index));
  setActiveSubCategory(null);
  };

  return (
    <>
     <div className="second-header-wrapper mt-5">
  <div className="second-header-bar">
{titles.map((element, index) => (
  <div key={index} className="mainContainer">
    <span
      className={`category-title ${activeIndex === index ? 'active' : ''}`}
      onClick={() => {
        handleTitleClick(index);
        fetchSubCategory(element.id);
      }}
    >
      {i18n.language=='en'?element.nameEn:element.nameAr}
    </span>

    {activeIndex === index && (
      <div ref={dropdownRef} className="dropdown-wrapper">
        <div className="categoryDropdown">
          <div
    className={`brand-item all-products ${activeSubCategory === "all" ? "active" : ""} text-decoration-underline`}
   onClick={async () => { 
  try {
    const response = await dispatch(fetchProductsByCategory({ id: element.id })).unwrap();
    
    navigate('/CustomProducts', {
      state: {
        categoryName: { en: element.nameEn, ar: element.nameAr },
        products: response, 
      },
    });

    setActiveSubCategory("all");
  } catch (error) {
    toast.error(error.message || "Failed to fetch products");
  }
}}

  >
    All Products
  </div>
  <div className="dropdown-divider" />
          {subCategories[element.id]?.map((cat, i) => (
            <div
              key={i}
              className={`brand-item ${activeSubCategory === cat.name ? 'active' : ''}`}
              onClick={async() => {
                try {
                   let response = await dispatch(fetchProductsBySubCategory({ id:cat.id })).unwrap();
                        navigate('/CustomProducts', {
                state: {
                    categoryName: { en: cat.nameEn, ar: cat.nameAr },
                     products: response, 
                     },
                    });
                  
                } catch (error) {
                  toast.error(error)
                }
                
                setActiveSubCategory(i18n.language === 'en' ? cat.nameEn : cat.nameAr);}}
            >
              {i18n.language=='en'?cat.nameEn:cat.nameAr}
            </div>
          ))}
        </div>

        {/* {activeSubCategory &&
          subCategories[element.id]
            ?.find((cat) => cat.name === activeSubCategory)?.subCategory && (
            <div className="subCategoryDropdown">
              <CategoryItems
                Items={
                  subCategories[element.id].find((cat) => cat.name === activeSubCategory).subCategory
                }
              />
            </div>
          )} */}
      </div>
    )}
  </div>
))}

  </div>
</div>

    </>
  );
};
