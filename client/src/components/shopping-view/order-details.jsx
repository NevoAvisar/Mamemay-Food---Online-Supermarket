import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { formatCurrency, formatDate } from "@/helpers";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div dir="rtl" className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">{t("order_id")}</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">{t("order_date")}</p>
            <Label>{formatDate(orderDetails?.orderDate)}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">{t("order_price")}</p>
            <Label>{formatCurrency(orderDetails?.totalAmount)}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">{t("payment_method")}</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">{t("payment_status")}</p>
            <Label>{t(orderDetails?.paymentStatus)}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">{t("order_status")}</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {t(orderDetails?.orderStatus)}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div dir="rtl" className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">{t("order_details")}</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span>
                        {t("product")}: {item.title}
                      </span>
                      <span>
                        {t("quantity")}: {item.quantity}
                      </span>
                      <span>
                        {t("price")}: {formatCurrency(item.price)}
                      </span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div dir="rtl" className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">{t("shipping_info")}</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{user.userName}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

// הגדרת PropTypes
ShoppingOrderDetailsView.propTypes = {
  orderDetails: PropTypes.shape({
    _id: PropTypes.string,
    orderDate: PropTypes.string,
    totalAmount: PropTypes.number,
    paymentMethod: PropTypes.string,
    paymentStatus: PropTypes.string,
    orderStatus: PropTypes.string,
    cartItems: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        quantity: PropTypes.number,
        price: PropTypes.number,
      })
    ),
    addressInfo: PropTypes.shape({
      address: PropTypes.string,
      city: PropTypes.string,
      pincode: PropTypes.string,
      phone: PropTypes.string,
      notes: PropTypes.string,
    }),
  }),
};

export default ShoppingOrderDetailsView;
