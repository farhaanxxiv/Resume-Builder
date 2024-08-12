import { BiDownload, BiSave } from "react-icons/bi";
import MinimalResume from "../../pages/SampleResumes/MinimalResume";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import DatabaseUtils from "../../utils/DatabaseUtils";
import { useResume } from "../../context/ResumeContext";
import toastify from "../Toastify";

export default function FloatingBar({ resumeid }) {

    const { resumeData } = useResume()
    const minimalResumeRef = useRef(null)


    const handlePrint = useReactToPrint({
        documentTitle: `Minimal Resume`,
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    });

    async function saveResume() {
        const result = DatabaseUtils.saveResumeByID(resumeid, resumeData)
        toastify.success('Resume Saved')
    }

    return (
        <div className="p-2 px-4 rounded-lg border-[#606060] border bg-[#131313] fixed bottom-12 left-1/2 -translate-x-1/2 shadow-[0px_0px_30px_#303030]">
            <div className="flex gap-x-4">
                <button className="white" onClick={() => saveResume()}>
                    <div className="flex gap-x-2">
                        <BiSave className=" my-auto h-fit" fill="black" size={20} />
                        <p className="text-black">Save</p>
                    </div>
                </button>
                <button className="white" onClick={() => handlePrint(null, () => minimalResumeRef.current)}>
                    <div className="flex gap-x-2">
                        <BiDownload className=" my-auto h-fit" fill="black" size={20} />
                        <p className="text-black">Download</p>
                    </div>
                </button>
            </div>

            <div className="w-0 h-0 overflow-hidden">
                <MinimalResume ref={minimalResumeRef} />
            </div>
        </div>
    )
}