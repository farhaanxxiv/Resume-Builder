import { useResume } from "../../context/ResumeContext";
import resumeFormat from '../../config/minimal-resume.json'
import ReactQuill from "react-quill";
import ResumeUtils from "../../utils/ResumeUtils";
import toastify from "../Toastify";

export default function AddSection() {

    const { resumeData, setResumeData, totalSections, incrementSection, decrementSection } = useResume()
    const resumeKeys = Object.keys(resumeFormat);


    function addSection(section) {
        // Create a deep copy of the section schema to avoid modifying the original
        const sectionSchema = JSON.parse(JSON.stringify(resumeFormat[section]));

        // Generate a new unique id for the copied section
        sectionSchema.id = ResumeUtils.uid();
        console.log('sectionSchema :', sectionSchema);

        const newOrder = totalSections + 1;
        incrementSection();

        // Create a copy of the resume data to avoid directly modifying state
        const updatedData = { ...resumeData };
        console.log('updatedData :', updatedData);

        if (resumeData[section] && resumeData[section].sections && sectionSchema.multiple) {
            console.log('updatedData[section].sections :', updatedData[section].sections);
            updatedData[section].sections.push(sectionSchema);
            console.log('updatedData[section].sections :', updatedData[section].sections);
        } else {
            updatedData[section] = {
                "sections": [sectionSchema]
            };
        }

        updatedData[section].order = newOrder;
        console.log('updatedData :', updatedData);

        setResumeData(updatedData);
        toastify.success(`Added Section ${section}`)
    }


    return (
        <div className="border-r border-[#606060] px-6">

            <h1 className="text-3xl font-semibold mb-3">Sections :</h1>
            <div className="flex flex-col gap-4">
                {
                    resumeKeys.map((section) => {
                        return (

                            <button className="text-left" onClick={() => { addSection(section) }}> <div className="flex justify-between"> <p> {section}</p><p>+</p></div>  </button>
                        )
                    })

                }
            </div>
        </div>
    )
}