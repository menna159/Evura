import React, { useEffect, useState } from 'react';

function EditModal({ show, product, onClose, onSave }) {
  const [formData, setFormData] = useState({
    ...product,
    productColors: product?.productColors || [],
    productSizes: product?.productSizes || [],
  });

  // Reset form when product changes
  useEffect(() => {
    setFormData({
      ...product,
      productColors: product?.productColors || [],
      productSizes: product?.productSizes || [],
    });
  }, [product]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNumberChange = (name, value) => {
    setFormData({ ...formData, [name]: Number(value) });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          photoBase64: reader.result.split(',')[1],
          photoFileName: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorChange = (idx, field, value) => {
    const updatedColors = formData.productColors.map((c, i) =>
      i === idx ? { ...c, [field]: value } : c
    );
    setFormData({ ...formData, productColors: updatedColors });
  };

  const handleColorFileChange = (idx, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedColors = formData.productColors.map((c, i) =>
        i === idx
          ? { ...c, photoBase64: reader.result.split(',')[1], photoFileName: file.name }
          : c
      );
      setFormData({ ...formData, productColors: updatedColors });
    };
    reader.readAsDataURL(file);
  };

  const handleSizeChange = (idx, field, value) => {
    const updatedSizes = formData.productSizes.map((s, i) =>
      i === idx ? { ...s, [field]: value } : s
    );
    setFormData({ ...formData, productSizes: updatedSizes });
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">✏️ Update Product</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            {/* Main Product Fields */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Name (EN)</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.nameEn || ''}
                  onChange={(e) => handleChange(e)}
                  name="nameEn"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Name (AR)</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.nameAr || ''}
                  onChange={(e) => handleChange(e)}
                  name="nameAr"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.quantity || ''}
                  onChange={(e) => handleNumberChange('quantity', e.target.value)}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Product Main Photo</label>
                <input type="file" className="form-control" accept="image/*" onChange={handleFileChange} />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Before Discount</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.toTalBeforeDiscount || ''}
                  onChange={(e) => handleNumberChange('toTalBeforeDiscount', e.target.value)}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Discount</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.discount || ''}
                  onChange={(e) => handleNumberChange('discount', e.target.value)}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Barcode</label>
              <input
                type="text"
                className="form-control"
                value={formData.productBarcode || ''}
                onChange={(e) => handleChange(e)}
                name="productBarcode"
              />
            </div>

            {/* Product Colors */}
            <h5 className="mt-4">🎨 Product Colors</h5>
            {formData.productColors.map((color, idx) => (
              <div key={idx} className="border p-2 mb-2 rounded">
                <div className="row">
                  <div className="col-md-6">
                    <label>Name (EN)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={color.nameEn || ''}
                      onChange={(e) => handleColorChange(idx, 'nameEn', e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Name (AR)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={color.nameAr || ''}
                      onChange={(e) => handleColorChange(idx, 'nameAr', e.target.value)}
                    />
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-md-6">
                    <label>Photo File</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) => handleColorFileChange(idx, e.target.files[0])}
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Barcode</label>
                    <input
                      type="text"
                      className="form-control"
                      value={color.productBarcode || ''}
                      onChange={(e) => handleColorChange(idx, 'productBarcode', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Product Sizes */}
            <h5 className="mt-4">📏 Product Sizes</h5>
            {formData.productSizes.map((size, idx) => (
              <div key={idx} className="border p-2 mb-2 rounded">
                <div className="row">
                  <div className="col-md-6">
                    <label>Name (EN)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={size.nameEn || ''}
                      onChange={(e) => handleSizeChange(idx, 'nameEn', e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Name (AR)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={size.nameAr || ''}
                      onChange={(e) => handleSizeChange(idx, 'nameAr', e.target.value)}
                    />
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-md-4">
                    <label>Price</label>
                    <input
                      type="number"
                      className="form-control"
                      value={size.price || ''}
                      onChange={(e) => handleSizeChange(idx, 'price', Number(e.target.value))}
                    />
                  </div>
                  <div className="col-md-4">
                    <label>Before Discount</label>
                    <input
                      type="number"
                      className="form-control"
                      value={size.toTalBeforeDiscount || ''}
                      onChange={(e) =>
                        handleSizeChange(idx, 'toTalBeforeDiscount', Number(e.target.value))
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label>Discount</label>
                    <input
                      type="number"
                      className="form-control"
                      value={size.discount || ''}
                      onChange={(e) => handleSizeChange(idx, 'discount', Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <label>Barcode</label>
                  <input
                    type="text"
                    className="form-control"
                    value={size.productBarcode || ''}
                    onChange={(e) => handleSizeChange(idx, 'productBarcode', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={() => onSave(formData)}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
