import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { useToast } from "../ui/use-toast";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { t } from "i18next";

// Joi schema for form validation
const addressSchema = Joi.object({
  address: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      "string.empty": t("Address is required"),
      "string.min": t("Address must be at least 3 characters"),
      "string.max": t("Address cannot exceed 50 characters"),
    }),
  city: Joi.string()
    .required()
    .messages({
      "string.empty": t("City is required"),
    }),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.empty": t("Phone is required"),
      "string.pattern.base": t("Phone must be a valid 10 digit number"),
    }),
  pincode: Joi.string()
    .pattern(/^[0-9]{5,6}$/)
    .required()
    .messages({
      "string.empty": t("Pincode is required"),
      "string.pattern.base": t("Pincode must be a valid 5-6 digit number"),
    }),
  notes: Joi.string().allow("").optional(),
});

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address({ setCurrentSelectedAddress, selectedId }) {
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const { toast } = useToast();

  // Initialize useForm hook with Joi validation
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialAddressFormData,
    resolver: joiResolver(addressSchema),
    mode: "onChange",
  });


  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch, user?.id]);

  useEffect(() => {
    // Update form values when editing an address
    if (currentEditedId) {
      const addressToEdit = addressList.find(
        (address) => address._id === currentEditedId
      );
      if (addressToEdit) {
        reset({
          address: addressToEdit?.address || "",
          city: addressToEdit?.city || "",
          phone: addressToEdit?.phone || "",
          pincode: addressToEdit?.pincode || "",
          notes: addressToEdit?.notes || "",
        });
      }
    } else {
      reset(initialAddressFormData);
    }
  }, [currentEditedId, addressList, reset]);

  function handleManageAddress(data) {
    if (addressList.length >= 3 && currentEditedId === null) {
      toast({
        title: t("You can add max 3 addresses"),
        variant: "destructive",
      });
      return;
    }

    const action = currentEditedId
      ? editAddress({
          userId: user?.id,
          addressId: currentEditedId,
          formData: data,
        })
      : addNewAddress({
          ...data,
          userId: user?.id,
        });

    dispatch(action).then((result) => {
      if (result?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        setCurrentEditedId(null);
        reset(initialAddressFormData);
        toast({
          title: currentEditedId
            ? t("Address updated successfully")
            : t("Address added successfully"),
          variant: "success",
        });
      }
    });
  }

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((result) => {
      if (result?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        toast({
          title: t("Address deleted successfully"),
          variant: "success",
        });
      }
    });
  }

  function handleEditAddress(getCurrentAddress) {
    setCurrentEditedId(getCurrentAddress?._id);
  }

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem) => (
              <AddressCard
                key={singleAddressItem._id}
                selectedId={selectedId}
                handleDeleteAddress={handleDeleteAddress}
                addressInfo={singleAddressItem}
                handleEditAddress={handleEditAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? t("Edit Address") : t("Add New Address")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          control={control}
          errors={errors}
          buttonText={currentEditedId !== null ? t("Edit") : t("Add")}
          onSubmit={handleSubmit(handleManageAddress)}
          isBtnDisabled={!isValid}
        />
      </CardContent>
    </Card>
  );
}

Address.propTypes = {
  setCurrentSelectedAddress: PropTypes.func.isRequired,
  selectedId: PropTypes.shape({
    _id: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    phone: PropTypes.string,
    pincode: PropTypes.string,
    notes: PropTypes.string,
  }),
};

export default Address;
