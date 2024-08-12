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
import Navbar from "../components/Builder/MobileNavbar";
import RenderSections from "../components/Builder/RenderSections";
import AddSection from "../components/Builder/AddSection";

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
    return (
        <section className="px-0 mt-20 lg:mt-0">
            {
                <div className="block lg:hidden ">
                    <Navbar />
                </div>
            }
            <div className="grid lg:grid-cols-[20%_60%_20%]">
                <div className="hidden lg:block">
                    <AddSection />
                </div>
                <div>
                    <RenderSections />
                </div>
                <div className="hidden lg:block">
                    <AvailableTemplates />

                </div>
                <FloatingBar resumeid={id} />

            </div>
        </section>
    )
}