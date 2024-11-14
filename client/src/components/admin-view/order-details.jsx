import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { useToast } from "../ui/use-toast";
import { useTranslation } from "react-i18next";
import { formatCurrency, formatDate } from "@/helpers";

// הגדרת סכמה של Joi עבור סטטוס ההזמנה
const schema = Joi.object({
  status: Joi.string()
    .valid("pending", "inProcess", "inShipping", "delivered", "rejected")
    .required()
    .label("Order Status"),
});

function AdminOrderDetailsView({ orderDetails }) {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { t } = useTranslation();

  // שימוש ב-useForm עם Joi וולידציה דרך joiResolver
  const { handleSubmit, control, reset } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      status: orderDetails?.orderStatus || "",
    },
  });

  // פונקציה לטיפול בעדכון סטטוס ההזמנה
  async function handleUpdateStatus(formData) {
    const { status } = formData;

    if (!orderDetails?._id) {
      console.error("Order ID is missing.");
      return;
    }

    try {
      const response = await dispatch(
        updateOrderStatus({ id: orderDetails._id, orderStatus: status })
      ).unwrap();

      if (response.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails._id));
        dispatch(getAllOrdersForAdmin());
        reset(); // איפוס הטופס לאחר עדכון מוצלח

        toast({
          title: response.message,
          variant: "success",
        });
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  }

  // פונקציה להצגת פרטי ההזמנה בצורה מסודרת
  function renderOrderDetails() {
    const {
      _id,
      orderDate,
      totalAmount,
      paymentMethod,
      paymentStatus,
      orderStatus,
    } = orderDetails || {};

    if (!orderDetails) {
      return <div>Loading...</div>;
    }

    return (
      <>
        <DetailItem label={t("Order ID")} value={_id} />
        <DetailItem label={t("Order Date")} value={formatDate(orderDate)} />
        <DetailItem
          label={t("Order Price")}
          value={`${formatCurrency(totalAmount)}`}
        />
        <DetailItem label={t("Payment Method")} value={t(paymentMethod)} />
        <DetailItem label={t("Payment Status")} value={t(paymentStatus)} />
        <DetailItem
          label={t("Order Status")}
          value={
            <Badge
              className={`py-1 px-3 ${
                orderStatus === "confirmed"
                  ? "bg-green-500"
                  : orderStatus === "rejected"
                  ? "bg-red-600"
                  : "bg-black"
              }`}
            >
              {t(orderStatus)}
            </Badge>
          }
        />
      </>
    );
  }

  // פונקציה להצגת פרטי הפריטים בהזמנה
  function renderCartItems() {
    if (!orderDetails?.cartItems) return null;

    return (
      <div className="grid gap-4">
        <div className="grid gap-2">
          <div className="font-medium">{t("Order Details")}</div>
          <ul className="grid gap-3">
            {orderDetails.cartItems.map((item) => (
              <li
                key={item?.title}
                className="flex items-center justify-between"
              >
                <span>
                  {t("Title")}: {item?.title}
                </span>
                <span>
                  {t("Quantity")}: {item?.quantity}
                </span>
                <span>
                  {t("Price")}: {formatCurrency(item?.price)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  // פונקציה להצגת פרטי המשלוח
  function renderShippingInfo() {
    const { address, city, pincode, phone, notes } =
      orderDetails?.addressInfo || {};

    if (!address) return null;

    return (
      <div className="grid gap-4">
        <div className="grid gap-2">
          <div className="font-medium">{t("Shipping Info")}</div>
          <div className="grid gap-0.5 text-muted-foreground">
            <span>{address}</span>
            <span>{city}</span>
            <span>{pincode}</span>
            <span>{phone}</span>
            <span>{notes}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          {orderDetails ? (
            renderOrderDetails()
          ) : (
            <div>{t("Loading details...")}</div>
          )}
        </div>
        <Separator />
        {renderCartItems()}
        {renderShippingInfo()}

        {/* טופס לעדכון סטטוס ההזמנה */}
        <CommonForm
          formControls={[
            {
              name: "status",
              label: t("Order Status"),
              componentType: "select",
              options: [
                { id: "pending", label: t("Pending") },
                { id: "inProcess", label: t("In Process") },
                { id: "inShipping", label: t("In Shipping") },
                { id: "delivered", label: t("Delivered") },
                { id: "rejected", label: t("Rejected") },
              ],
            },
          ]}
          control={control}
          buttonText={t("Update Order Status")}
          onSubmit={handleSubmit(handleUpdateStatus)}
        />
      </div>
    </DialogContent>
  );
}

// פונקציה להצגת פרטי שדה בודד
function DetailItem({ label, value }) {
  return (
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">{label}</p>
      <Label>{value}</Label>
    </div>
  );
}

DetailItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
};

AdminOrderDetailsView.propTypes = {
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
        price: PropTypes.string,
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

export default AdminOrderDetailsView;
