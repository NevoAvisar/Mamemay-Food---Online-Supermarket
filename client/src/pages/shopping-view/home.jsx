import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Fish, Popcorn, ShirtIcon, Wheat } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts } from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import fruits_vegetablesImg from "../../assets/images/fruits_and_vegetables.jpg";
import meat_fishImg from "../../assets/images/meat_fish.jpg";
import legumes_grainsImg from "../../assets/images/legumes_grains.jpg";
import snacks_sweetsImg from "../../assets/images/snacks_sweets.jpg";
import { t } from "i18next";

const categoriesWithIcon = [
  {
    id: "fruits_vegetables",
    label: "פירות וירקות",
    icon: ShirtIcon,
    backgroundImage: fruits_vegetablesImg,
  },
  {
    id: "meat_fish",
    label: "בשר ודגים",
    icon: Fish,
    backgroundImage: meat_fishImg,
  },
  {
    id: "legumes_grains",
    label: "קטניות ודגנים",
    icon: Wheat,
    backgroundImage: legumes_grainsImg,
  },
  {
    id: "snacks_sweets",
    label: "חטיפים ומתוקים",
    icon: Popcorn,
    backgroundImage: snacks_sweetsImg,
  },
];

function ShoppingHome() {
  const { productList } = useSelector((state) => state.shopProducts);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    // Set the filters in session storage
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    // Create query string for the filters
    const searchParams = new URLSearchParams();
    searchParams.append(section, getCurrentItem.id);

    // Navigate to the listing page with filter parameters in URL
    navigate(`/shop/listing?${searchParams.toString()}`);
  }

  function handleAddToCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
          variant: "success",
        });
      }
    });
  }

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            {t("Shop by category")}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                key={categoryItem.id}
                style={{
                  backgroundImage: `url(${categoryItem.backgroundImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="flex flex-col items-center justify-end w-40 h-48 cursor-pointer hover:shadow-lg hover:scale-105 hover:border transition-all duration-300 ease-in-out relative overflow-hidden rounded-lg"
              >
                {/* Overlay for contrast */}
                <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-t from-black/70 to-transparent absolute inset-0 z-0"></div>

                <CardContent className="relative z-10 flex flex-col items-center">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-white" />
                  <div className="bg-white/80 backdrop-blur-sm p-2 rounded-lg text-center">
                    <span className="font-bold">{categoryItem.label}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            {t("Feature Products")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList?.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    product={productItem}
                    key={productItem._id}
                    handleAddToCart={handleAddToCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ShoppingHome;
