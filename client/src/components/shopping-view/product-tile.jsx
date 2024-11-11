import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { formatCurrency } from "@/helpers";
import { t } from "i18next";
import PropTypes from "prop-types";

// רכיב להצגת מוצר בתוך הרשת החברתית (ShoppingProductTile)
function ShoppingProductTile({ product, handleAddToCart }) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      {/* קליק על תמונת המוצר או אזור הכותרת יוביל לפרטים נוספים על המוצר */}
      <div className="relative">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-[300px] object-cover rounded-t-lg"
        />
        {/* הצגת באדג' בהתאם למצב המלאי או למבצע */}
        {product?.totalStock === 0 ? (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            {t("Out Of Stock")}
          </Badge>
        ) : product?.totalStock < 10 ? (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            {t("Only state items left", {
              state: product?.totalStock,
            })}
          </Badge>
        ) : product?.salePrice > 0 ? (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            {t("Sale")}
          </Badge>
        ) : null}
      </div>
      {/* תוכן המוצר - כותרת, קטגוריה, מותג ומחיר */}
      <CardContent className="p-4">
        <h2 dir="rtl" className="text-xl font-bold mb-2">
          {product?.title}
        </h2>
        <div className="flex justify-between items-center mb-2">
          <span dir="rtl" className="text-[16px] text-muted-foreground">
            {categoryOptionsMap[product?.category]}
          </span>
        </div>
        {/* הצגת המחיר המקורי והמחיר במבצע אם קיים */}
        <div className="flex justify-between items-center mb-2">
          <span
            className={`${
              product?.salePrice > 0 ? "line-through" : ""
            } text-lg font-semibold text-primary`}
          >
            {formatCurrency(product?.price)}
          </span>
          {product?.salePrice > 0 ? (
            <span className="text-lg font-semibold text-primary">
              {formatCurrency(product?.salePrice)}
            </span>
          ) : null}
        </div>
      </CardContent>
      {/* כפתור להוספה לסל הקניות או חיווי מלאי חסר */}
      <CardFooter>
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed">
            {t("Out Of Stock")}
          </Button>
        ) : (
          <Button
            onClick={() => handleAddToCart(product?._id, product?.totalStock)}
            className="w-full"
          >
            {t("Add to cart")}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

// PropTypes מגדירים את סוגי הפרמטרים שהרכיב מקבל - משפר את תחזוקת הקוד והבנתו
ShoppingProductTile.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired, // מזהה ייחודי של המוצר
    image: PropTypes.string.isRequired, // קישור לתמונה של המוצר
    title: PropTypes.string.isRequired, // שם המוצר
    category: PropTypes.string.isRequired, // קטגוריה של המוצר
    price: PropTypes.number.isRequired, // מחיר המוצר
    salePrice: PropTypes.number, // מחיר המוצר בהנחה (אם קיים)
    totalStock: PropTypes.number.isRequired, // כמות המלאי של המוצר
  }).isRequired,
  handleGetProductDetails: PropTypes.func, // פונקציה לקבלת פרטי מוצר
  handleAddToCart: PropTypes.func.isRequired, // פונקציה להוספת מוצר לסל
};

export default ShoppingProductTile;
