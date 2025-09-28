import React, { useEffect, useState } from "react";
import { fetchProducts } from "../../redux/ProductsRedux/Products";
import { useDispatch, useSelector } from "react-redux";
import api, { absoluteUrl } from "../../api/client";
import EditModal from "./components/editModal";
import './productDashboard.css';
function ProductsDashboard() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState(null); 
  const pageSize = 5;

  const { all: products, totalPages, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts({ pageNumber: page, pageSize }));
    
  }, [dispatch, page]);

  if (loading.all) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!products || products.length === 0) return <p>No products found</p>;

  let headers = Object.keys(products[0]);
  headers = headers.filter((key) => key !== "isDeleted");

  // 🚀 Action Handlers
  const handleUpdate = (product) => {
    setEditingProduct(product);
    // setFormData(product); 
  };

  const handleDelete = async (id) => {
    let accepted = confirm("Are you sure to delete product?");
    if (accepted) {
      try {
        await api.delete(`/Product/${id}`);
      } catch (error) {
        if (error.response) {
          alert(error.response.data);
        }
      }
    }
    dispatch(fetchProducts({ pageNumber: page, pageSize }));
  };

const handleSave = async (formData) => {
  try {
    const payload = {
      ...formData,
      id: editingProduct.id,
      photoBase64: formData.photoBase64 || "", // main image
      productColors: formData.productColors?.map(c => ({
        ...c,
        photoBase64: c.photoBase64 || "", // each color image
        productId: editingProduct.id
      })) || [],
      productSizes: formData.productSizes?.map(s => ({
        ...s,
        productId: editingProduct.id
      })) || []
    };

    await api.put("/Product/update", payload);

    alert("✅ Product updated successfully!");
    setEditingProduct(null);
    dispatch(fetchProducts({ pageNumber: page, pageSize }));
  } catch (error) {
    alert("❌ Update failed");
    console.error(error);
  }
};


  return (
    <div className="container ">
      <h2 className="text-center mb-5"> Products Dashboard</h2>
      <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            {headers.map((key) => {
              const displayKey = key === "photoUrl" ? "photo" : key;
              return <th key={key}>{displayKey}</th>;
            })}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((key) => (
                <td key={key}>
                  {key === "photoUrl" && product[key] ? (
                    <img
                      src={absoluteUrl(product[key])}
                      alt="product"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                  ) : key === "productColors" &&
                    Array.isArray(product[key]) ? (
                    <div>
                      {product[key].map((color, idx) => (
                        <div
                          key={idx}
                          className="d-flex align-items-center mb-1"
                        >
                          {color.photoFileName && (
                            <img
                              src={`http://localhost:5047/${color.photoFileName}`}
                              alt={color.nameEn}
                              style={{
                                width: "30px",
                                height: "30px",
                                objectFit: "cover",
                                borderRadius: "50%",
                                marginRight: "8px",
                              }}
                            />
                          )}
                          <div className="d-flex flex-column">
                            <span>
                              {color.nameEn} ({color.nameAr})
                            </span>
                            {color.productBarcode && (
                              <div>
                                <span className="fw-bold">BarCode: </span>
                                <span>{color.productBarcode}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : key === "productSizes" &&
                    Array.isArray(product[key]) ? (
                    <div>
                      {product.productSizes.map((size, index) => (
                        <div key={index}>
                          <span>
                            {size.nameEn} ({size.nameAr})
                          </span>
                          <div>
                            <span className="fw-bold">Price: </span>
                            <span>{size.price}</span>
                          </div>
                          <div>
                            <span className="fw-bold">
                              toTalBeforeDiscount:{" "}
                            </span>
                            <span>{size.toTalBeforeDiscount}</span>
                          </div>
                          <div>
                            <span className="fw-bold">Discount: </span>
                            <span>{size.discount}</span>
                          </div>
                          <div>
                            <span className="fw-bold">BarCode: </span>
                            <span>{size.productBarcode}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : typeof product[key] === "object" ? (
                    JSON.stringify(product[key])
                  ) : (
                    product[key]
                  )}
                </td>
              ))}

              <td className="actionCol">
                <div className="actionCell">
                <button
                  className="btn btn-sm btn-warning "
                  onClick={() => handleUpdate(product)}
                >
                  Update
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {/* Modal for Update */}
     {editingProduct && (
           <EditModal
        show={!!editingProduct}
        product={editingProduct}
        onClose={() => setEditingProduct(null)}
        onSave={handleSave}
      />
)}

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-3 gap-2">
        <button
          className="btn btn-outline-secondary"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="align-self-center">Page {page}</span>
        <button
          className="btn btn-outline-secondary"
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductsDashboard;
