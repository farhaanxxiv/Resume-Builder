import * as docx from "docx";
import { Document, Packer, Paragraph, TextRun, ExternalHyperlink } from "docx";
import { saveAs } from "file-saver";
import resumeFormat from '../config/minimal-resume.json'
import { useResume } from "../context/ResumeContext";
import ResumeUtils from "../utils/ResumeUtils";

export default function Builder() {

    const { resumeData, setResumeData, totalSections, incrementSection, decrementSection } = useResume()

    const resumeKeys = Object.keys(resumeFormat);

    const doc = new Document({
        sections: [
            {
                properties: {},
                children: [
                    new Paragraph({
                        spacing: {
                            after: 100, // Adds space before the paragraph (240 twips = 12pt)
                        },
                        children: [
                            new TextRun({
                                text: "Syed Farhaan Yousuf",
                                bold: true,
                                size: 48
                            }),
                        ],

                        alignment: docx.AlignmentType.CENTER

                    }),
                    new Paragraph({
                        children: [

                            new TextRun({
                                text: "+91 8143920170",
                                size: 20
                            }),

                            new ExternalHyperlink({
                                children: [
                                    new TextRun({
                                        text: "sfyousuf24@gmail.com",
                                        style: "Hyperlink",
                                        size: 20
                                    }),
                                ],
                                link: "mailto:sfyousuf24@gmail.com",

                            }),
                            new TextRun({
                                text: "Hyderabad, India",
                                size: 20
                            }),
                            new ExternalHyperlink({
                                children: [
                                    new TextRun({
                                        text: "github.com",
                                        style: "Hyperlink",
                                        size: 20
                                    }),
                                ],
                                link: "https://github.com/farhaanxxiv",
                            }),
                        ],

                        alignment: docx.AlignmentType.CENTER

                    }),

                    new Paragraph({

                        children: [

                            new TextRun({
                                text: "SUMMARY",
                                heading: docx.HeadingLevel.HEADING_1,
                                size: 22,
                                break: 2,

                            }),
                        ],
                        border: {
                            bottom: {
                                color: "auto",
                                space: 5,
                                style: "single",
                                size: 6,
                            }

                        },


                    }),
                    new Paragraph({
                        spacing: {
                            before: 100, // Adds space before the paragraph (240 twips = 12pt)
                        },
                        children: [

                            new TextRun({
                                text: "Seeking a challenging position where I could work and maintain large-scale applications where I can use my skills to the best. All the knowledge I have with Fullstack Development & DevOps could be used to its best where I tend to solve problems frequently. My clear understanding of the development process from Alpha and Beta stages to Production can be utilized.",
                                size: 20,

                            }),
                        ],

                    }),
                ],
            },

        ],
    });

    function downloadResume() {
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
        return fields.map(field => (
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
        ));
    };

    const renderSections = (sectionKey, sections) => {
        return sections.map((section, index) => (
            <div key={section.id}>
                {renderFields(section.fields, sectionKey, index)}
                <button onClick={() => handleDeleteSection(sectionKey, index)}>Delete</button>

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
        return Object.keys(resumeData).map(sectionKey => (
            resumeData[sectionKey].sections != 0 &&

            <div key={sectionKey}>
                <h2>{sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)}</h2>
                {renderSections(sectionKey, resumeData[sectionKey].sections)}
            </div>
        ));
    };
    return (
        <section>
            <div className="grid grid-cols-[20%_80%] ">
                <div className="border-r border-white pr-4">
                    <button onClick={() => downloadResume()}>Download Resume</button>

                    <div className="flex flex-col gap-4 mt-4">
                        <input type="text" placeholder="Name" />
                        <input type="text" placeholder="Mobile" />
                        <input type="text" placeholder="Email" />
                        <input type="text" placeholder="Location" />
                        <input type="text" placeholder="GitHub" />
                    </div>

                    <h1 className="text-3xl font-semibold mt-6 mb-3">Sections :</h1>
                    <div className="flex flex-col gap-4">
                        {
                            resumeKeys.map((section) => {
                                return (
                                    <button className="" onClick={() => { addSection(section) }}>{section}</button>
                                )
                            })

                        }
                    </div>
                </div>
                <div>
                    {renderForm()}
                </div>
            </div>
        </section>
    )
}