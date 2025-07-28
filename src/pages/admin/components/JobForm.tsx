import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { JobPortalInterface } from "../../../config/interface";

interface JobFormProps {
  selectedJob: JobPortalInterface | null;
  onSubmit: (data: JobPortalInterface) => void;
  loading: boolean;
}

const JobForm: React.FC<JobFormProps> = ({
  selectedJob,
  onSubmit,
  loading,
}) => {
  const { register, handleSubmit, reset } = useForm<JobPortalInterface>();

  // 👇 Reset form every time selectedJob changes
  useEffect(() => {
    if (selectedJob) {
      reset(selectedJob);
    }
  }, [selectedJob, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <input
          type="text"
          {...register("Role", { required: "Role is required" })}
          placeholder="Role"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          {...register("location", { required: "Location is required" })}
          placeholder="Location"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          {...register("type")}
          placeholder="Type"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          {...register("qualification", {
            required: "Qualification is required",
          })}
          placeholder="Qualification"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <label>
          <input type="checkbox" {...register("status")} className="mr-2" />
          Active
        </label>
      </div>
      <div className="flex justify-end p-4 mt-4 text-white bg-red-900 shadow-xl shadow-black rounded-2xl border-stone-950 hover:bg-red-600">
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-orange-500 rounded"
          disabled={loading}
        >UPDATE
        </button>
      </div>
    </form>
  );
};

export default JobForm;
