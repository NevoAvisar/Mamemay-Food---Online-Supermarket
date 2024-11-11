import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { t } from "i18next";
import { formatCurrency } from "@/helpers";
import PropTypes from "prop-types";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  // עדכון הכמות של פריט מסוים בעגלת הקניות
  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (typeOfAction === "plus") {
      let getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );
        console.log({
          getCurrentProductIndex,
          productList,
          indexOfCurrentCartItem,
        });
        const getTotalStock = productList[getCurrentProductIndex]?.totalStock;

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            // אם הכמות המבוקשת גדולה מהסטוק הקיים, יש להציג הודעת שגיאה
            toast({
              title: t("Only state quantity can be added for this item", {
                state: getQuantity,
              }),
              variant: "destructive",
            });
            return;
          }
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is updated successfully",
          variant: "success",
        });
      }
    });
  }

  // מחיקת פריט מעגלת הקניות
  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is deleted successfully",
          variant: "success",
        });
      }
    });
  }

  return (
    <div className="flex items-center space-x-4">
      {/* תמונה של הפריט */}
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        {/* שם הפריט */}
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          {/* כפתור הפחתת כמות */}
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">{t("Decrease")}</span>
          </Button>
          {/* כמות הפריט */}
          <span className="font-semibold">{cartItem?.quantity}</span>
          {/* כפתור הוספת כמות */}
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">{t("Increase")}</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        {/* מחיר כולל עבור הפריט הנוכחי */}
        <p className="font-semibold">
          {formatCurrency(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
              cartItem?.quantity
          )}
        </p>
        {/* כפתור מחיקת הפריט */}
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1 hover:text-red-600 transition-colors duration-200"
          size={20}
        />
      </div>
    </div>
  );
}

// PropTypes לווידוא טיפוסים של props
UserCartItemsContent.propTypes = {
  cartItem: PropTypes.shape({
    productId: PropTypes.string.isRequired,
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    salePrice: PropTypes.number,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default UserCartItemsContent;