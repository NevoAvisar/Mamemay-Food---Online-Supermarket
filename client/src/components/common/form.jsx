import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { t } from "i18next";

function CommonForm({
  formControls,
  onSubmit,
  buttonText,
  isBtnDisabled,
  control,
  errors,
}) {
  // Function to render form elements based on their type
  function renderInputsByComponentType(getControlItem) {
    let element = null;
    console.log({ getControlItem, control });
    // Decide which component to render based on componentType
    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Controller
            name={getControlItem.name}
            control={control}
            rules={{ required: getControlItem.required }}
            render={({ field }) => (
              <Input
                {...field} // Spread field properties from react-hook-form
                placeholder={t(getControlItem.placeholder)}
                id={t(getControlItem.name)}
                type={getControlItem.type}
              />
            )}
          />
        );
        break;
      case "select":
        element = (
          <Controller
            name={getControlItem.name}
            control={control}
            rules={{ required: getControlItem.required }}
            render={({ field }) => (
              // Render select input with options
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full" dir="rtl">
                  <SelectValue placeholder={t(getControlItem.label)} />
                </SelectTrigger>
                <SelectContent dir="rtl">
                  {getControlItem?.options?.length > 0
                    ? getControlItem.options.map((optionItem) => (
                        <SelectItem
                          dir="rtl"
                          key={optionItem.id}
                          value={optionItem.id}
                        >
                          {t(optionItem.label)}
                        </SelectItem>
                      ))
                    : null}
                </SelectContent>
              </Select>
            )}
          />
        );
        break;
      case "textarea":
        element = (
          <Controller
            name={getControlItem.name}
            control={control}
            rules={{ required: getControlItem.required }}
            render={({ field }) => (
              // Render textarea input
              <Textarea
                {...field} // Spread field properties from react-hook-form
                placeholder={t(getControlItem.placeholder)}
                id={getControlItem.id}
                style={{ direction: "rtl" }}
              />
            )}
          />
        );
        break;
      default:
        // Default to input component if no match found
        element = (
          <Controller
            name={getControlItem.name}
            control={control}
            rules={{ required: getControlItem.required }}
            render={({ field }) => (
              <Input
                {...field} // Spread field properties from react-hook-form
                placeholder={t(getControlItem.placeholder)}
                id={getControlItem.name}
                type={getControlItem.type}
              />
            )}
          />
        );
        break;
    }

    // Return the rendered form element with a label and error message if needed
    return (
      <div className="grid w-full gap-1.5">
        {/* Render the label for the input element */}
        <Label style={{ direction: "rtl" }} className="mb-1 direction-rtl">
          {t(getControlItem.label)}
        </Label>
        {/* Render the form input element */}
        {element}
        {/* Render error message if validation fails */}
        {errors[getControlItem.name] && (
          <p dir="rtl" className="text-red-500 text-sm">
            {t(
              errors[getControlItem.name]?.message || "This field is required"
            )}
          </p>
        )}
      </div>
    );
  }

  return (
    // Handle form submission using handleSubmit from react-hook-form
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {/* Render each form control item */}
        {formControls.map((controlItem) => (
          <div key={controlItem.name}>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      {/* Submit button for the form */}
      <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">
        {t(buttonText || "Submit")}
      </Button>
    </form>
  );
}

CommonForm.propTypes = {
  formControls: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired, // Name of the form field
      placeholder: PropTypes.string, // Placeholder text for the field
      type: PropTypes.string, // Type of the input field
      componentType: PropTypes.string.isRequired, // Type of form component (input, select, textarea)
      label: PropTypes.string, // Label for the form field
      options: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired, // Option value for select input
          label: PropTypes.string.isRequired, // Display label for the option
        })
      ),
      required: PropTypes.bool, // Whether the field is required
      errorMessage: PropTypes.string, // Custom error message for validation
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired, // Function to handle form submission
  buttonText: PropTypes.string, // Text for the submit button
  isBtnDisabled: PropTypes.bool, // Whether the submit button should be disabled
  control: PropTypes.object.isRequired, // Control object from react-hook-form
  errors: PropTypes.object, // Errors object from react-hook-form
};

export default CommonForm;
