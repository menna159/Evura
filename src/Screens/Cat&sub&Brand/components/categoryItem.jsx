import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

function CategoryItem({ category, fetchSubcategories, onEdit, onDelete, onAddSub, onEditSub, onDeleteSub }) {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    fetchSubcategories(category.id).then(setSubs);
  }, [category.id]);

  return (
    <div className="mb-3">
        <div className="d-flex align-items center justify-content-between bg-light w-100 mb-2 p-2">
      <h5>
        {category.nameEn} | {category.nameAr}
        
      </h5>
      <div>
      <FaEdit className="text-primary ms-2" style={{ cursor: "pointer" }} onClick={onEdit} />
        <FaTrash className="text-danger ms-2" style={{ cursor: "pointer" }} onClick={onDelete} />
        <FaPlus className="text-success ms-2" style={{ cursor: "pointer" }} onClick={onAddSub} />
      </div>
      </div>
      <ul>
        {subs.map((sub) => (
          <li key={sub.id} className="d-flex align-items-center justify-content-between mb-3">
            <span>
              {sub.nameEn} <span className="text-muted">| {sub.nameAr}</span>
            </span>
            <span>
              <FaEdit
                className="text-primary ms-2"
                style={{ cursor: "pointer" }}
                onClick={() => onEditSub(sub)}
              />
              <FaTrash
                className="text-danger ms-2"
                style={{ cursor: "pointer" }}
                onClick={() => onDeleteSub(sub.id)}
              />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryItem;