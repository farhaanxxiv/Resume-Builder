import * as docx from "docx";
import { Document, Packer, Paragraph, TextRun, ExternalHyperlink } from "docx";

const pageMargin = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
}

let totalSections = []

const profileSection = {
    properties: {
        type: docx.SectionType.CONTINUOUS,
        page: {
            margin: pageMargin,
        },
    },
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

        })
    ]
}

const summarySection = {
    properties: {
        type: docx.SectionType.CONTINUOUS,
        page: {
            margin: pageMargin
        },
    },
    children: [

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
}


function generateResume(resumeData) {

    const sections = Object.keys(resumeData)

    totalSections.push(profileSection)

    if (sections.includes('summary')) {
        totalSections.push(summarySection)
    }

    console.log('totalSections :', totalSections);

    const minimalDoc = new Document({
        sections: totalSections
    });

    return minimalDoc
}

export default generateResume