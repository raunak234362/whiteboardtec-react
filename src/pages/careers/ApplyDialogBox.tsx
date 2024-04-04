import { JobDescType } from ".";

function ApplyDialogBox(jobs: JobDescType, setModal:any) {
  return (
    <>
    <div className="modal">
      <div>{jobs.jd}</div>
      <button onClick={() => setModal(false)}>Close</button>
    </div>

    </>
  );
}

export default ApplyDialogBox;
