// src/pages/AddProducts.jsx
import React, { useState } from "react";
import ExcelJS from "exceljs"; // ✅ use exceljs for Excel parsing
import "./AddProduct.css";
import { toast } from "react-toastify";
import api from "../../api/client";

function AddProducts() {
  const [categoryEn, setCategoryEn] = useState("");
  const [categoryAr, setCategoryAr] = useState("");
  const [subCategories, setSubCategories] = useState([{ nameAr: "", nameEn: "" }]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [brandEn, setBrandEn] = useState("");
  const [brandAr, setBrandAr] = useState("");
  const [barandloading, setBrandLoading] = useState(false);
  const [brandMessage, setBrandMessage] = useState("");

  // ============ IMAGE HANDLING ============
  const [imagesMap, setImagesMap] = useState({});
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
          const key = file.name.trim().toLowerCase();
        setImagesMap((prev) => ({ ...prev, [key]: reader.result })); // store base64 by filename
      };
      reader.readAsDataURL(file);
    });
    
  };

  const getFileName = (filePath) => {
  if (!filePath) return null;
  return filePath.split(/[/\\]/).pop().trim().toLowerCase();
};

  // ============ FILE UPLOAD ============
  const [excelData, setExcelData] = useState({
    products: [],
    colors: [],
    sizes: [],
  });
  const [fileMessage, setFileMessage] = useState("");

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const workbook = new ExcelJS.Workbook();
      const arrayBuffer = await file.arrayBuffer();
      await workbook.xlsx.load(arrayBuffer);

      const productsSheet = workbook.getWorksheet("Products");
      const colorsSheet = workbook.getWorksheet("ProductColors");
      const sizesSheet = workbook.getWorksheet("ProductSizes");

      if (!productsSheet || !colorsSheet || !sizesSheet) {
        setFileMessage("❌ One or more sheets missing in Excel (Products, ProductColors, ProductSizes)");
        return;
      }

      const products = productsSheet.getSheetValues().slice(2).map((row) => ({
        id: row[1],
        nameEn: row[2],
        nameAr: row[3],
        quantity: row[4],
        toTalBeforeDiscount: row[5],
        discount: row[6],
        barCode: row[7],
        notesEn: row[8],
        notesAr: row[9],
        imageFileName: row[10], // ✅ store image filename only
        categoryId: row[11],
        subCategoryId: row[12],
        brandId: row[13],
        productBarcode: row[14],
      }));

      const colors = colorsSheet.getSheetValues().slice(2).map((row) => ({
        productId: row[1],
        nameEn: row[2],
        nameAr: row[3],
        photoFileName: row[4], // ✅ store filename
        productBarcode: row[5],
      }));

      const sizes = sizesSheet.getSheetValues().slice(2).map((row) => ({
        productId: row[1],
        nameEn: row[2],
        nameAr: row[3],
        price: row[4],
        toTalBeforeDiscount: row[5],
        discount: row[6],
        productBarcode: row[7],
      }));

      setExcelData({ products, colors, sizes });
      setFileMessage(`✅ Loaded ${products.length} products from Excel`);
    } catch (err) {
      console.error("Excel parse error:", err);
      setFileMessage("❌ Failed to read Excel file");
    }
  };

  const handleFileSubmit = async () => {
    try {
      if (!excelData.products || !excelData.colors || !excelData.sizes) {
        console.error("❌ Excel data not loaded properly:", excelData);
        return;
      }
     
      
      const payload = excelData.products
        .map((product) => {
          if (!product) return null;

          const productColors =
            excelData.colors?.filter((c) => c.productId === product.id) || [];

          const productSizes =
            excelData.sizes?.filter((s) => s.productId === product.id) || [];

          
          return {
            ...product,
            imageBase64: imagesMap[getFileName(product.imageFileName)] || null, 
            productColors: productColors.map((c) => ({
              ...c,
              photoBase64: imagesMap[getFileName(c.photoFileName)] || null, // ✅ attach base64 for colors
            })),
            productSizes,
          };
        })
        .filter(Boolean);
   let response=   await api.post("/Product/AddProductLis", payload);
   
      toast.success("✅ Products uploaded successfully!");
    } catch (err) {
      console.error("❌ Upload Error:", err.response?.data || err.message);
      toast.error("❌ Upload failed.");
    }
  };



  return (
    <div className="container mt-5">
      {/* Excel Import */}
      <div className="container mt-5">
        <h2>📦 Import Products From Excel</h2>
        <input type="file" accept=".xlsx" onChange={handleFileUpload} />

        {/* Image Upload */}
        <div className="mt-3">
          <label>Upload Product Images (must match Excel filenames)</label>
          <input type="file" multiple onChange={handleImageUpload} />
        </div>

        {excelData.products.length > 0 && (
          <div className="mt-3">
            <button className="btn btn-primary" onClick={handleFileSubmit}>
              🚀 Upload to API
            </button>
          </div>
        )}

        {fileMessage && <p className="mt-3">{fileMessage}</p>}
      </div>
    </div>
  );
}

export default AddProducts;
