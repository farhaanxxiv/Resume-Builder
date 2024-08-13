import { forwardRef, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useResume } from "../../context/ResumeContext";
import { CiLink } from "react-icons/ci";
import '../../styles/quillStyles.css';
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import parse, { domToReact } from 'html-react-parser';

const MinimalResume = ({ resumeData }) => {
    const ref = useRef(null);
    // Define styles using StyleSheet from @react-pdf/renderer
    const styles = StyleSheet.create({
        p: { color: 'blue', fontSize: 16, marginBottom: 10 },
        strong: { fontWeight: 'bold', color: 'red' },
        ul: { margin: 10, paddingLeft: 20 },
        li: { marginBottom: 5, display: 'block' }, // Ensuring line break
        ol: { margin: 10, paddingLeft: 20 },
        u:{textDecoration:'underline'},
        em:{fontStyle:'italic'}
    });

    const ListItem = ({ children }) => (
        <View>
            {children}
        </View>
    );

    const replaceWithText = (domNode) => {
        if (domNode.type === 'tag') {
            const tagName = domNode.name;
            const tagStyle = styles[tagName];

            // Handle <strong> and other tags
            if (tagName === 'strong') {
                return (
                    <Text style={tagStyle}>
                        {domToReact(domNode.children, { replace: replaceWithText })}
                    </Text>
                );
            }

            if (tagName === 'em') {
                return (
                    <Text style={tagStyle}>
                        {domToReact(domNode.children, { replace: replaceWithText })}
                    </Text>
                );
            }

            if (tagName === 'u') {
                return (
                    <Text style={tagStyle}>
                        {domToReact(domNode.children, { replace: replaceWithText })}
                    </Text>
                );
            }


            // Handle <li> items separately
            if (tagName === 'li') {
                return (
                    <Text style={tagStyle}>
                        {domToReact(domNode.children, { replace: replaceWithText })}
                    </Text>


                );
            }

            if (tagName === 'p') {
                return (
                    <Text style={tagStyle}>
                        {domToReact(domNode.children, { replace: replaceWithText })}
                    </Text>

                );
            }

            // Handle other tags
            if (['ul', 'ol'].includes(tagName)) {
                return (
                    <ListItem>
                        {domToReact(domNode.children, { replace: replaceWithText })}
                    </ListItem>
                );
            }
        }

        // For other cases, return the node unchanged
        return undefined;
    };

    const parseHtmlContent = (htmlContent) => {
        return parse(htmlContent, { replace: replaceWithText });
    };
    // Section rendering functions
    const educationSection = (education) => {
        return (
            <View key="education" style={styles.section}>
                {education.sections.map((section, index) => {
                    const educationBulletsField = section.fields.find(field => field.id === 'education_bullets');
                    const educationBullets = educationBulletsField ? educationBulletsField.data : '';
                    console.log('educationBullets :', educationBullets);

                    return (
                        <View key={index}>
                            {parseHtmlContent(educationBullets)}
                        </View>
                    );
                })}
            </View>
        );
    };

    // Add other section rendering functions as needed

    // Debug output
    useEffect(() => {
        console.log('resumeData:', resumeData);
    }, [resumeData]);

    return (
        <Document>
            <Page style={styles.page}>
                <View style={styles.section}>
                    {resumeData?.education && educationSection(resumeData.education)}
                    <Text>saasd</Text>
                </View>
            </Page>
        </Document>
    );
};


export default MinimalResume;
