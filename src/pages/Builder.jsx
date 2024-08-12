import * as docx from "docx";
import { Document, Packer, Paragraph, TextRun, ExternalHyperlink } from "docx";
import { saveAs } from "file-saver";
import resumeFormat from '../config/minimal-resume.json'
import { useResume } from "../context/ResumeContext";
import ResumeUtils from "../utils/ResumeUtils";
import ViewDoc from "../components/Resume/ViewDoc";
import { useEffect, useState } from "react";
import DocxViewer from "../components/Resume/ViewDoc";
import generateResume from "../resumes/minimal";
import MinimalResume from "./SampleResumes/MinimalResume";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'; // import styles
import FloatingBar from "../components/Builder/FloatingBar";
import { useParams } from "react-router-dom";
import DatabaseUtils from "../utils/DatabaseUtils";
import AvailableTemplates from "../components/Resume/AvailableTemplates";

export default function Builder() {

    const { resumeData, setResumeData, totalSections, incrementSection, decrementSection } = useResume()
    const resumeKeys = Object.keys(resumeFormat);


    let { id } = useParams();
    console.log('id :', id);

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
    }

    const handleInputChange = (sectionKey, sectionIndex, fieldId, value) => {
        setResumeData(prevState => {
            const updatedSections = prevState[sectionKey].sections.map((section, index) => {
                if (index === sectionIndex) {
                    return {
                        ...section,
                        fields: section.fields.map(field =>
                            field.id === fieldId ? { ...field, data: value } : field
                        )
                    };
                }
                return section;
            });

            return {
                ...prevState,
                [sectionKey]: {
                    ...prevState[sectionKey],
                    sections: updatedSections
                }
            };
        });
    };

    const renderFields = (fields, sectionKey, sectionIndex) => {
        return (
            <div className={`space-y-2 `}>
                {
                    fields.map(field => (
                        field.type === 'custom' ? (
                            <div key={field.id}>
                                <label htmlFor={field.id}>{field.placeholder}</label>

                                <ReactQuill

                                    id={field.id}
                                    value={field.data}
                                    modules={{
                                        toolbar: [
                                            [{ header: [false] }],
                                            ['bold', 'italic', 'underline'],
                                            [{ list: 'ordered' }, { list: 'bullet' }],
                                            [{ align: [] }],
                                            [{ indent: '-1' }, { indent: '+1' }],
                                            ['clean']
                                        ]
                                    }}
                                    onChange={(value) =>
                                        handleInputChange(sectionKey, sectionIndex, field.id, value)
                                    }
                                    theme="snow"
                                />

                            </div>
                        ) : (
                            <div key={field.id}>
                                <label htmlFor={field.id}>{field.placeholder}</label>
                                <input
                                    id={field.id}
                                    type={field.type}
                                    value={field.data}
                                    onChange={(e) =>
                                        handleInputChange(sectionKey, sectionIndex, field.id, e.target.value)
                                    }
                                />
                            </div>
                        )
                    ))
                }
            </div>
        )

    };

    const renderSections = (sectionKey, sections) => {
        return sections.map((section, index) => (
            <div key={section.id}>
                <div>
                    <p className="text-sm mb-2">{sectionKey} #{index + 1}</p>
                    {renderFields(section.fields, sectionKey, index)}
                    <button className="white py-1 my-2 w-fit px-6" onClick={() => handleDeleteSection(sectionKey, index)}>Delete</button>
                </div>
            </div>
        ));
    };

    const handleDeleteSection = (sectionKey, sectionIndex) => {
        setResumeData(prevState => {
            const updatedSections = prevState[sectionKey].sections.filter((_, index) => index !== sectionIndex);
            return {
                ...prevState,
                [sectionKey]: {
                    ...prevState[sectionKey],
                    sections: updatedSections
                }
            };
        });
    };

    const renderForm = () => {
        const gridLayouts = ['skills', 'languages']
        return (
            <div className="space-y-12 px-6">
                {Object.keys(resumeData).map(sectionKey => (
                    resumeData[sectionKey].sections != 0 &&
                    <div>
                        <h2 className="text-3xl font-semibold">{sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)}</h2>

                        <div className={`${gridLayouts.includes(sectionKey) ? 'grid grid-cols-2 gap-4 ' : 'space-y-6'} `} key={sectionKey}>
                            {renderSections(sectionKey, resumeData[sectionKey].sections)}
                        </div>
                    </div>
                ))
                }
            </div>
        )
    };

    async function fetchResume() {
        const resume = await DatabaseUtils.getResumeByID(id)
        console.log('resume :', resume);
        if (resume) {
            setResumeData(resume.sections)
        }
    }


    useEffect(() => {
        setResumeData([])
        fetchResume()
    }, [])
    return  (
        <section className="px-0">
            <div className="grid grid-cols-[20%_60%_20%]  ">
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
                <div>
                    {renderForm()}
                </div>
                <div>
                    <FloatingBar resumeid={id} />
                    <AvailableTemplates/>

                </div>
            </div>
        </section>
    )
}