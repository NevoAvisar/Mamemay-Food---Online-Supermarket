import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { t } from "i18next";
import PropTypes from "prop-types";
import { formatCurrency } from "@/helpers";

// רכיב עוטף לסל הקניות של המשתמש
function UserCartWrapper({ cartItems = [], setOpenCartSheet }) {
  const navigate = useNavigate();

  // חישוב סך הכל הקנייה (סה"כ מחיר לכל המוצרים בסל)
  const totalCartAmount =
    cartItems?.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md">
      {/* כותרת לסל הקניות */}
      <SheetHeader>
        <SheetTitle>{t("Your Cart")}</SheetTitle>
      </SheetHeader>
      {/* הצגת תוכן הסל */}
      <div className="mt-8 space-y-4">
        {cartItems?.length > 0
          ? cartItems.map((item) => (
              <UserCartItemsContent key={item.productId} cartItem={item} />
            ))
          : null}
      </div>
      {/* סך הכל הקנייה */}
      <div className="mt-8 space-y-4">
        <div className="flex justify-between ">
          <span className="font-bold">{formatCurrency(totalCartAmount)}</span>
          <span className="font-bold">{t("Total")}</span>
        </div>
      </div>
      {/* כפתור מעבר לעמוד הקופה */}
      <Button
        onClick={() => {
          navigate("/shop/checkout"); // מעבר לעמוד הקופה
          setOpenCartSheet(false); // סגירת ה-Drawer של הסל
        }}
        className="w-full mt-6"
      >
        {t("Checkout")}
      </Button>
    </SheetContent>
  );
}

// PropTypes מגדירים את סוגי הפרמטרים שהרכיב מקבל - משפר את תחזוקת הקוד והבנתו
UserCartWrapper.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      productId: PropTypes.string.isRequired, // מזהה ייחודי של פריט בסל
      price: PropTypes.number.isRequired, // מחיר פריט בסל
      salePrice: PropTypes.number, // מחיר הפריט במבצע (אם קיים)
      quantity: PropTypes.number.isRequired, // כמות של הפריט בסל
    })
  ),
  setOpenCartSheet: PropTypes.func.isRequired, // פונקציה לסגירת ה-Drawer של הסל
};

export default UserCartWrapper;
