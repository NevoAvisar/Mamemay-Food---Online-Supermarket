import { formatCurrency } from "@/helpers";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next"; // ייבוא לשם שימוש בתרגום

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  const { t } = useTranslation(); // שימוש בפונקציית t לצורך תרגום

  // פונקציה לניהול פעולת העריכה של מוצר
  function handleEditProduct() {
    setOpenCreateProductsDialog(true);
    setCurrentEditedId(product?._id);
    const { category, image, price, salePrice, title, totalStock } = product;
    setFormData({
      category,
      image,
      price,
      title,
      totalStock,
      salePrice: !salePrice ? "" : salePrice,
    });
  }

  // פונקציה לניהול פעולת המחיקה של מוצר
  function handleDeleteProduct() {
    handleDelete(product?._id);
  }

  return (
    <Card className="w-[300px] max-w-sm mx-auto">
      {/* תמונת המוצר */}
      <div className="relative">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-[200px] object-fit rounded-t-lg"
        />
      </div>

      {/* פרטי המוצר */}
      <CardContent>
        <h2 dir="rtl" className="text-xl font-bold mb-2 mt-2">
          {product?.title}
        </h2>
        <div className="flex justify-between items-center mb-2">
          <span
            dir="rtl"
            className={`${
              +product?.salePrice > 0 ? "line-through" : ""
            } text-lg font-semibold text-primary`}
          >
            {formatCurrency(product?.price)}
          </span>
          {+product?.salePrice > 0 && (
            <span dir="rtl" className="text-lg font-bold">
              {formatCurrency(product?.salePrice)}
            </span>
          )}
        </div>

        <h3 dir="rtl" className="text-zinc-900 mb-2 mt-2">
          {t("state in stock", {
            state: product?.totalStock,
          })}
        </h3>
      </CardContent>

      {/* כפתורי פעולה */}
      <CardFooter className="flex justify-between items-center">
        <Button onClick={handleEditProduct}>{t("Edit")}</Button>
        <Button variant="destructive" onClick={handleDeleteProduct}>
          {t("Delete")}
        </Button>
      </CardFooter>
    </Card>
  );
}

// בדיקת טיפוסי הפרופס
AdminProductTile.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    totalStock: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    salePrice: PropTypes.number,
    image: PropTypes.string,
  }).isRequired,
  setFormData: PropTypes.func,
  setOpenCreateProductsDialog: PropTypes.func.isRequired,
  setCurrentEditedId: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default AdminProductTile;
