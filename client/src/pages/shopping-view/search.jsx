import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { t } from "i18next";
import { fetchAllProducts } from "@/store/admin/products-slice";

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.shopProducts); // שימוש ברשימת המוצרים מהסטור
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { toast } = useToast();

  // מוצרים המתאימים לחיפוש
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // פונקציה לעדכון תוצאות החיפוש
  useEffect(() => {
    if (keyword.trim().length > 0) {
      // חיפוש מקומי מתוך רשימת המוצרים בסטור
      const results = productList.filter((product) =>
        product.title.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]); // איפוס תוצאות החיפוש אם המחרוזת ריקה
    }
  }, [keyword, productList]);

  // פונקציה להוספת מוצר לעגלה
  const handleAddToCart = useCallback(
    (productId, totalStock) => {
      const cartItemsList = cartItems.items || [];
      const existingCartItem = cartItemsList.find(
        (item) => item.productId === productId
      );

      if (existingCartItem && existingCartItem.quantity + 1 > totalStock) {
        toast({
          title: t("Only {state} quantity can be added for this item", {
            state: existingCartItem.quantity,
          }),
          variant: "destructive",
        });
        return;
      }

      dispatch(
        addToCart({
          userId: user?.id,
          productId: productId,
          quantity: 1,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(user?.id));
          toast({
            title: t("Product is added to cart"),
            variant: "success",
          });
        }
      });
    },
    [cartItems, dispatch, toast, user?.id]
  );

  // פונקציה להוצאת פרטים על מוצר ופתיחת הדיאלוג
  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            name="keyword"
            onChange={(event) => setKeyword(event.target.value)}
            className="py-6"
            placeholder={t("Search Products...")}
          />
        </div>
      </div>
      {filteredResults.length === 0 && keyword.trim().length > 3 ? (
        <h1 dir="rtl" className="text-5xl font-extrabold">
          {t("No result found")}!
        </h1>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredResults.map((item) => (
          <ShoppingProductTile
            key={item._id}
            handleAddToCart={handleAddToCart}
            product={item}
          />
        ))}
      </div>
    </div>
  );
}

SearchProducts.propTypes = {
  productList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      salePrice: PropTypes.number,
      totalStock: PropTypes.number,
      image: PropTypes.string,
    })
  ),
  user: PropTypes.shape({
    id: PropTypes.string,
  }),
  cartItems: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        productId: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
      })
    ),
  }),
};

export default SearchProducts;
