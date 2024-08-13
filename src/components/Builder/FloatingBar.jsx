import { BiDownload, BiSave } from "react-icons/bi";
import MinimalResume from "../../pages/SampleResumes/MinimalResume";
import { useReactToPrint } from "react-to-print";
import { useMemo, useRef } from "react";
import DatabaseUtils from "../../utils/DatabaseUtils";
import { useResume } from "../../context/ResumeContext";
import toastify from "../Toastify";
import ReactPDF, { PDFDownloadLink } from '@react-pdf/renderer';
import { Underline } from "docx";
import Home from "../../pages/Home";
import AvailableTemplates from "../Resume/AvailableTemplates";


export default function FloatingBar({ resumeid }) {
    const { resumeData, setResumeData } = useResume();
    // setInterval(() => {


    //     const data = {
    //         "education": {
    //             "sections": [
    //                 {
    //                     "fields": [
    //                         {
    //                             "type": "text",
    //                             "id": "education_college",
    //                             "data": "",
    //                             "placeholder": "Enter College Name"
    //                         },
    //                         {
    //                             "data": "",
    //                             "type": "text",
    //                             "placeholder": "Enter Major (CSE,MBA)",
    //                             "id": "education_major"
    //                         },
    //                         {
    //                             "id": "education_from",
    //                             "data": "",
    //                             "placeholder": "From",
    //                             "type": "text"
    //                         },
    //                         {
    //                             "id": "education_to",
    //                             "placeholder": "To",
    //                             "type": "text",
    //                             "data": ""
    //                         },
    //                         {
    //                             "id": "education_cgpa",
    //                             "type": "text",
    //                             "data": "",
    //                             "placeholder": "CGPA"
    //                         },
    //                         {
    //                             "placeholder": "SGPA",
    //                             "type": "text",
    //                             "data": "",
    //                             "id": "education_sgpa"
    //                         },
    //                         {
    //                             "type": "text",
    //                             "data": "",
    //                             "placeholder": "Percentage (100%)",
    //                             "id": "education_percentage"
    //                         },
    //                         {
    //                             "placeholder": "Additional Info In Bullets",
    //                             "data": "<ul><li>sdf</li><li>sd</li><li>fds</li><li>fds</li><li>sd</li><li>sfdfd</li></ul>",
    //                             "type": "custom",
    //                             "id": "education_bullets"
    //                         }
    //                     ],
    //                     "id": "resume-1723544819546-NC5",
    //                     "multiple": true
    //                 }
    //             ],
    //             "order": 1
    //         }
    //     }

    //     setResumeData(data)

    // }, 1000);

    const minimalResumeRef = useRef(null)

    async function saveResume() {
        const result = await DatabaseUtils.saveResumeByID(resumeid, resumeData);
        toastify.success('Resume Saved');
    }

    async function downloadResume() {
        ReactPDF.render(minimalResumeRef.current, `${__dirname}/example.pdf`);
    }
    const memoizedDocument = useMemo(() => <MinimalResume resumeData={resumeData} />, [resumeData]);

    return (
        <div className="p-2 px-4 rounded-lg border-[#606060] border bg-[#131313] fixed bottom-12 left-1/2 -translate-x-1/2 shadow-[0px_0px_30px_#303030]">
            <div className="flex gap-x-4">
                <button className="white" onClick={() => saveResume()}>
                    <div className="flex gap-x-2">
                        <BiSave className="my-auto h-fit" fill="black" size={20} />
                        <p className="text-black">Save</p>
                    </div>
                </button>
                <button className="white" onClick={() => downloadResume()}>
                    <div className="flex gap-x-2">
                        <BiSave className="my-auto h-fit" fill="black" size={20} />
                        <p className="text-black">Download</p>
                    </div>
                </button>
                {/* <PDFDownloadLink document={<AvailableTemplates />} fileName="report.pdf">
                    Download PDF
                </PDFDownloadLink> */}
                <PDFDownloadLink document={memoizedDocument} fileName="report.pdf">
                    {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
                </PDFDownloadLink>
            </div>
            <div className="w-0 h-0 overflow-hidden">
                <MinimalResume ref={minimalResumeRef} />
            </div>
        </div>
    );
}