import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

// Initial Form Data
const initialFormData = {
  image: "",
  title: "",
  category: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

// Joi Schema for Form Validation
const productSchema = Joi.object({
  title: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title must be at least 3 characters",
    "string.max": "Title cannot exceed 30 characters",
  }),
  category: Joi.string().required().messages({
    "string.empty": "Category is required",
  }),
  price: Joi.number().positive().precision(2).required().messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be greater than zero",
  }),
  salePrice: Joi.number()
    .positive()
    .precision(2)
    .allow(null, "")
    .optional()
    .messages({
      "number.base": "Sale price must be a number",
      "number.positive": "Sale price must be greater than zero",
    })
    .when("price", {
      is: Joi.number().positive(),
      then: Joi.number().less(Joi.ref("price")).messages({
        "number.less": "Sale price must be less than the regular price",
      }),
    }),
  totalStock: Joi.number().integer().positive().required().messages({
    "number.base": "Stock must be a number",
    "number.integer": "Stock must be an integer",
    "number.positive": "Stock must be greater than zero",
  }),
  image: Joi.string().allow(null, "").optional(), // Allow image to be optional initially
});

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  // Initialize useForm hook for form handling, with joiResolver
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange", // Update form validation on input change
    defaultValues: initialFormData,
    resolver: joiResolver(productSchema), // Add Joi resolver for validation
  });

  // Submit handler for the form, using handleSubmit from useForm
  function onSubmit(data) {
    const formDataWithImage = {
      ...data,
      image: uploadedImageUrl,
    };

    if (currentEditedId !== null) {
      dispatch(
        editProduct({ id: currentEditedId, formData: formDataWithImage })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          reset(initialFormData);
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          toast({
            title: t("Product edited successfully"),
            variant: "success",
          });
        }
      });
    } else {
      dispatch(addNewProduct(formDataWithImage)).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          setOpenCreateProductsDialog(false);
          setImageFile(null);
          reset(initialFormData);
          toast({
            title: t("Product added successfully"),
            variant: "success",
          });
        }
      });
    }
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          {t("Add New Product")}
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {productList?.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                key={productItem._id}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                handleDelete={handleDelete}
                setFormData={reset}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          reset(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null
                ? t("Edit Product")
                : t("Add New Product")}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={handleSubmit(onSubmit)}
              formControls={addProductFormElements}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              isBtnDisabled={!isValid || imageLoadingState} // Disable if form is invalid or image is uploading
              control={control}
              errors={errors}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default AdminProducts;
