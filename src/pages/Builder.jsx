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

export default function Builder() {

    const { resumeData, setResumeData, totalSections, incrementSection, decrementSection } = useResume()
    const resumeKeys = Object.keys(resumeFormat);

    function downloadResume() {

        const doc = generateResume(resumeData)

        Packer.toBlob(doc).then(blob => {
            console.log(blob);
            saveAs(blob, "example.docx");
            console.log("Document created successfully");
        });
    }


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
                                <ReactQuill
                                    value={field.data}
                                    modules={{
                                        toolbar: [
                                                ['bold', 'italic', 'underline'],
                                            [{ list: 'ordered' }, { list: 'bullet' }],
                                            [{ align: [] }], // Alignment options
                                            [{ indent: '-1' }, { indent: '+1' }],
                                            ['clean'] // Clear formatting button
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
                                <input
                                    type={field.type}
                                    placeholder={field.placeholder}
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
                    <p className="text-xs">{sectionKey} #{index + 1}</p>
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
        return (
            <div className="space-y-12 px-4">
                {Object.keys(resumeData).map(sectionKey => (
                    resumeData[sectionKey].sections != 0 &&
                    <div>
                        <h2 className="text-2xl font-semibold">{sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)}</h2>

                        <div className={`${sectionKey == 'skills' ? 'grid grid-cols-2 gap-4 ' :'space-y-6'} `} key={sectionKey}>
                            {renderSections(sectionKey, resumeData[sectionKey].sections)}
                        </div>
                    </div>
                ))
                }
            </div>
        )
    };
    return (
        <section>
            <div className="grid grid-cols-[20%_50%_30%] ">
                <div className="border-r border-white pr-4">
                    <button onClick={() => downloadResume()}>Download Resume</button>

                    <h1 className="text-3xl font-semibold mt-6 mb-3">Sections :</h1>
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
                    <MinimalResume />

                </div>
            </div>
        </section>
    )
}