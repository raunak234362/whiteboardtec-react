import { useId } from "react";

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

function handleSubmit(formData: FormData) {
    const data: Record<string, any> = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    console.log(data);
}

  return (
    <>
      <div className="bg-[#6abd45] rounded-lg flex flex-wrap flex-col w-72 h-fit shadow-2xl">
        <h1 className="text-white text-2xl p-4 pb-2">{props.title}</h1>
        <form id={formId}>
          {props.field &&
            props.field.map((field, index) => {
              return (
                <div key={index} className="px-3 py-2">
                  {field.type === "textarea" ? (
                    <textarea
                      required={true}
                      id={formId + "_" + field.name}
                      name={field.name}
                      placeholder={field.placeholder}
                      className="w-full p-2 h-24 rounded-md placeholder-black placeholder-opacity-70 text-sm"
                    />
                  ) : (
                    <input
                      type={field.type}
                      required={true}
                      id={formId + "_" + field.name}
                      name={field.name}
                      placeholder={field.placeholder}
                      className="w-full p-2 rounded-md placeholder-black placeholder-opacity-70 text-sm"
                    />
                  )}
                </div>
              );
            })}
          <div className="px-3 py-2 mb-2">
            <button
              type="submit" onClick={(e) => {
                e.preventDefault();
                const formData = new FormData(document.getElementById(formId) as HTMLFormElement);
                handleSubmit(formData);
              }}
              className="bg-white text-[#6abd45] text-lg px-2 rounded-full items-center w-1/2 h-10 hover:bg-[#6abd45] hover:text-white hover:font-semibold hover:border-white border-4 shadow-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export { Forms };

export type { FormType };
