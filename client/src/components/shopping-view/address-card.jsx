import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next"; // שימוש לתרגום

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  const { t } = useTranslation(); // שימוש בתרגום

  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer border-red-700 ${
        selectedId?._id === addressInfo?._id
          ? "border-red-900 border-[4px]"
          : "border-black"
      }`}
    >
      <CardContent dir="rtl" className="grid p-4 gap-4">
        <Label>
          {t("Address")}: {addressInfo?.address}
        </Label>
        <Label>
          {t("City")}: {addressInfo?.city}
        </Label>
        <Label>
          {t("Pincode")}: {addressInfo?.pincode}
        </Label>
        <Label>
          {t("Phone")}: {addressInfo?.phone}
        </Label>
        <Label>
          {t("Notes")}: {addressInfo?.notes}
        </Label>
      </CardContent>
      <CardFooter className="p-3 flex justify-between">
        <Button onClick={() => handleEditAddress(addressInfo)}>
          {t("Edit")}
        </Button>
        <Button
          onClick={() => handleDeleteAddress(addressInfo)}
          variant="destructive"
        >
          {t("Delete")}
        </Button>
      </CardFooter>
    </Card>
  );
}

// הוספת PropTypes לבדיקה אם כל השדות מתקבלים בצורה נכונה
AddressCard.propTypes = {
  addressInfo: PropTypes.shape({
    _id: PropTypes.string,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    pincode: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    notes: PropTypes.string,
  }).isRequired,
  handleDeleteAddress: PropTypes.func.isRequired,
  handleEditAddress: PropTypes.func.isRequired,
  setCurrentSelectedAddress: PropTypes.func,
  selectedId: PropTypes.shape({
    _id: PropTypes.string,
  }),
};

export default AddressCard;
