import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
import { t } from "i18next";

function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);

  // פונקציה שמופעלת כאשר הקובץ משתנה דרך האינפוט
  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  }

  // פונקציה שמונעת התנהגות ברירת מחדל כאשר גוררים קובץ לתוך האזור
  function handleDragOver(event) {
    event.preventDefault();
  }

  // פונקציה שמופעלת כאשר קובץ נופל על האזור - שומרת את הקובץ
  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      setImageFile(droppedFile);
    }
  }

  // פונקציה שמסירה את הקובץ שנבחר ומאתחלת את הקלט
  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  // פונקציה לאסינכרונית להעלאה של הקובץ ל-Cloudinary (או לשרת אחר)
  // כאשר קובץ נבחר, מתחילה העלאה לשרת
  useEffect(() => {
    async function uploadImageToCloudinary() {
      try {
        setImageLoadingState(true);
        const data = new FormData();
        data.append("my_file", imageFile);

        const response = await axios.post(
          "http://localhost:5000/api/admin/products/upload-image",
          data
        );

        if (response?.data?.success) {
          const uploadedUrl = response.data?.result?.url;
          setUploadedImageUrl(uploadedUrl);
          // נניח שיש לך state של formData שמחזיק את פרטי הטופס
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setImageLoadingState(false);
      }
    }
    if (imageFile) {
      uploadImageToCloudinary();
    }
  }, [imageFile, setImageLoadingState, setUploadedImageUrl]);

  return (
    <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-lg font-semibold mb-2 block">
        {t("Upload Image")}
      </Label>
      <div
        onDragOver={handleDragOver}
        onDrop={isEditMode ? null : handleDrop}
        className={`border-2 border-dashed rounded-lg p-4 ${
          isEditMode ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor={!isEditMode ? "image-upload" : undefined}
            className={`flex flex-col items-center justify-center h-32 ${
              isEditMode ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>{t("Drag & drop or click to upload image")}</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
              <p className="text-sm font-medium">{imageFile.name}</p>
            </div>
            {!isEditMode && (
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                onClick={handleRemoveImage}
              >
                <XIcon className="w-4 h-4" />
                <span className="sr-only">{t("Remove File")}</span>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

ProductImageUpload.propTypes = {
  imageFile: PropTypes.object,
  setImageFile: PropTypes.func.isRequired,
  imageLoadingState: PropTypes.bool.isRequired,
  uploadedImageUrl: PropTypes.string,
  setUploadedImageUrl: PropTypes.func.isRequired,
  setImageLoadingState: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  isCustomStyling: PropTypes.bool,
};

export default ProductImageUpload;
