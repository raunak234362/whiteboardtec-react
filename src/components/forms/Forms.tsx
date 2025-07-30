import { useId, useState } from "react";

type FormField = {
  name: string;
  type: "text" | "email" | "textarea" | "file";
  placeholder?: string;
};

type FormType = {
  title: string;
  field: FormField[];
  submitMail?: string;
};

function Forms(props: FormType): JSX.Element {
  const formId = useId();
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setStatusMessage("");

    const data: Record<string, any> = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // 🔁 Replace the URL below with your backend endpoint or use Formspree/FormSubmit
    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/" + props.submitMail,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        setStatusMessage("Message sent successfully!");
      } else {
        setStatusMessage("Failed to send message.");
      }
    } catch (err) {
      setStatusMessage("An error occurred. Please try again.");
      console.error("Form submission error:", err);
    }

    setLoading(false);
  }

  return (
    <div className="bg-[#6abd45] rounded-lg flex flex-wrap flex-col w-80 h-fit shadow-2xl max-md:w-full max-md:rounded-xl">
      <h1 className="p-4 pb-2 text-3xl text-white">{props.title}</h1>

      <form id={formId}>
        {props.field &&
          props.field.map((field, index) => (
            <div key={index} className="px-3 py-2">
              {field.type === "textarea" ? (
                <textarea
                  required
                  id={formId + "_" + field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  className="w-full h-24 p-2 text-lg placeholder-black rounded-md placeholder-opacity-70"
                />
              ) : (
                <input
                  type={field.type}
                  required
                  id={formId + "_" + field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  className="w-full p-2 text-lg placeholder-black rounded-md placeholder-opacity-70"
                />
              )}
            </div>
          ))}

        <div className="px-3 py-2 mb-2">
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              const form = document.getElementById(formId) as HTMLFormElement;
              const formData = new FormData(form);
              handleSubmit(formData);
            }}
            disabled={loading}
            className="bg-white text-[#6abd45] text-xl px-2 rounded-full items-center w-1/2 h-10 hover:bg-[#6abd45] hover:text-white hover:font-semibold hover:border-white border-4 shadow-lg"
          >
            {loading ? "Sending..." : "Submit"}
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
