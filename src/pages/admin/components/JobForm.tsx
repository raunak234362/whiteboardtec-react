import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { JobPortalInterface } from "../../../config/interface";

export interface EditJobFormInputs extends JobPortalInterface {
  jdFile?: FileList;
}

interface JobFormProps {
  selectedJob: JobPortalInterface | null;
  onSubmit: (data: EditJobFormInputs) => void;
  loading: boolean;
}

const JobForm: React.FC<JobFormProps> = ({
  selectedJob,
  onSubmit,
  loading,
}) => {
  const { register, handleSubmit, reset } = useForm<EditJobFormInputs>();

  // Reset form every time selectedJob changes
  useEffect(() => {
    if (selectedJob) {
      reset(selectedJob);
    }
  }, [selectedJob, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Job Role Name
          </label>
          <input
            type="text"
            {...register("Role", { required: "Role is required" })}
            placeholder="e.g. SDS/2 Checker"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6abd45]/20 focus:border-[#6abd45] transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Location
          </label>
          <input
            type="text"
            {...register("location", { required: "Location is required" })}
            placeholder="e.g. Bangalore"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6abd45]/20 focus:border-[#6abd45] transition-all"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Job Type
            </label>
            <input
              type="text"
              {...register("type")}
              placeholder="e.g. Full time"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6abd45]/20 focus:border-[#6abd45] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Qualification / Experience
            </label>
            <input
              type="text"
              {...register("qualification", {
                required: "Qualification is required",
              })}
              placeholder="e.g. BE/B.Tech Civil"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6abd45]/20 focus:border-[#6abd45] transition-all"
            />
          </div>
        </div>

        {/* New Job Description File Upload Field */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Update Job Description Document (PDF)
          </label>
          <input
            type="file"
            accept="application/pdf"
            {...register("jdFile")}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-250 file:text-xs file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 file:cursor-pointer transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input 
            type="checkbox" 
            id="job-form-active"
            {...register("status")} 
            className="w-4.5 h-4.5 text-[#6abd45] border-gray-300 rounded focus:ring-[#6abd45] cursor-pointer"
          />
          <label htmlFor="job-form-active" className="text-sm font-semibold text-gray-700 cursor-pointer">
            Active
          </label>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          style={{ backgroundColor: "#6abd45", color: "#ffffff" }}
          className="w-full py-2.5 hover:!bg-[#5baf38] rounded-lg font-bold uppercase transition-all duration-150 shadow-md text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  );
};

export default JobForm;
