import { useState } from "react";
import { useForm } from "react-hook-form";
import Service from "../../config/service";
import { ConnectProps } from "../../config/interface"; 

type FormField = {
  name: string;
  type: "text" | "email" | "textarea" | "file";
  placeholder?: string;
};

type FormType = {
  title: string;
  field: FormField[];
};

function Forms(props: FormType): JSX.Element {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }, 
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const onSubmit = async (data: any) => {
    setLoading(true);
    setStatusMessage("");

    const formData = new FormData();
    props.field.forEach((field) => {
      if (field.type === "file" && data[field.name]?.[0]) {
        formData.append(field.name, data[field.name][0]);
      } else {
        formData.append(field.name, data[field.name] ?? "");
      }
    });
    try {
      await Service.connectPostMethod(formData);
      setStatusMessage("✅ Message sent successfully!");
      reset();
    } catch (err) {
      console.error(err);
      setStatusMessage("❌ Failed to send message.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-[#6abd45] rounded-lg flex flex-wrap flex-col w-80 h-fit shadow-2xl max-md:w-full max-md:rounded-xl">
      <h1 className="p-4 pb-2 text-3xl font-semibold text-white">
        {props.title}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {props.field &&
          props.field.map((field, index) => (
            <div key={index} className="px-3 py-2">
              {field.type === "textarea" ? (
                <textarea
                  {...register(field.name, { required: true })}
                  placeholder={field.placeholder}
                  className="w-full h-24 p-2 text-lg placeholder-black rounded-md placeholder-opacity-70"
                />
              ) : field.type === "file" ? (
                <input
                  type="file"
                  {...register(field.name, { required: true })}
                  className="w-full p-2 text-lg placeholder-black rounded-md placeholder-opacity-70"
                  accept="*"
                />
              ) : (
                <input
                  type={field.type}
                  {...register(field.name, { required: true })}
                  placeholder={field.placeholder}
                  className="w-full p-2 text-lg placeholder-black rounded-md placeholder-opacity-70"
                />
              )}
              {errors[field.name] && (
                <p className="mt-1 text-sm text-red-200">
                  This field is required
                </p>
              )}
            </div>
          ))}

        <div className="px-3 py-2 mb-2">
          <button
            type="submit"
            className={`bg-white text-[#6abd45] text-xl px-2 rounded-full items-center w-1/2 h-10 border-4 shadow-lg 
              hover:bg-[#6abd45] hover:text-white hover:font-semibold hover:border-white`}
          >
            Submit
          </button>
        </div>
      </form>

      {statusMessage && (
        <div className="px-4 pb-4 font-medium text-white">{statusMessage}</div>
      )}
    </div>
  );
}

export { Forms };
export type { FormType };
