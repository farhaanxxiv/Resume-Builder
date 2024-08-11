import { useEffect, useRef } from "react"
import generatePDF, { usePDF } from "react-to-pdf";
import { useReactToPrint } from "react-to-print";
import { useResume } from "../../context/ResumeContext";

export default function MinimalResume() {

    const ref = useRef(null)
    const { resumeData } = useResume()



    const handlePrint = useReactToPrint({
        documentTitle: `Minimal Resume`,
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    });

    const profileSection = (profileData) => {
        const profileNameField = profileData.sections[0].fields.find(field => field.id === 'profile_name');
        const profileName = profileNameField ? profileNameField.data : null;

        const profileLinkedinField = profileData.sections[0].fields.find(field => field.id === 'profile_linkedin');
        const profileLinkedin = profileLinkedinField ? profileLinkedinField.data : null;

        const profileMobileField = profileData.sections[0].fields.find(field => field.id === 'profile_mobile');
        const profileMobile = profileMobileField ? profileMobileField.data : null;

        const profileEmailField = profileData.sections[0].fields.find(field => field.id === 'profile_email');
        const profileEmail = profileEmailField ? profileEmailField.data : null;

        const profileGithubField = profileData.sections[0].fields.find(field => field.id === 'profile_github');
        const profileGithub = profileGithubField ? profileGithubField.data : null;

        const profileLocationField = profileData.sections[0].fields.find(field => field.id === 'profile_location');
        const profileLocation = profileLocationField ? profileLocationField.data : null;

        return (
            <>
                <h1 className="text-center text-black text-[22px]">{profileName}</h1>
                <div className="flex gap-x-2 justify-center">
                    <p>{profileGithub}</p>
                    <p>{profileMobile}</p>
                    <p>{profileLocation}</p>
                    <p>{profileEmail}</p>
                    <p>{profileLinkedin}</p>
                </div>
            </>
        )
    }

    const educationSection = (education) => {
        return (
            <div>
                <h2>Education</h2>
                <div className="h-[1px] w-full bg-black my-1"></div>

                {education.sections.map((section, index) => {
                    // Define variables outside the JSX return statement
                    const educationCollegeField = section.fields.find(field => field.id === 'education_college');
                    const educationCollege = educationCollegeField ? educationCollegeField.data : null; // Default value if field is not found

                    const educationCollegeCourse = section.fields.find(field => field.id === 'education_major');
                    const educationCourse = educationCollegeCourse ? educationCollegeCourse.data : null; // Default value if field is not found

                    const educationFromField = section.fields.find(field => field.id === 'education_from');
                    const educationFrom = educationFromField ? educationFromField.data : null; // Default value if field is not found

                    const educationToField = section.fields.find(field => field.id === 'education_to');
                    const educationTo = educationToField ? educationToField.data : null; // Default value if field is not found

                    const educationCGPAField = section.fields.find(field => field.id === 'education_cgpa');
                    const educationCGPA = educationCGPAField ? educationCGPAField.data : null; // Default value if field is not found

                    const educationSGPAField = section.fields.find(field => field.id === 'education_sgpa');
                    const educationSGPA = educationSGPAField ? educationSGPAField.data : null; // Default value if field is not found

                    const educationPercentageField = section.fields.find(field => field.id === 'education_percentage');
                    const educationPercentage = educationPercentageField ? educationPercentageField.data : null; // Default value if field is not found
                    return (
                        <>
                            <div className="flex gap-x-2">
                                <p className="font-semibold">{educationCourse}</p>
                                <p className="italic font-light">{educationCollege}</p>
                                <p className="italic font-light">{educationFrom} - {educationTo}</p>
                            </div>
                            <div className="flex gap-x-2">
                                <p className=""> <b>CGPA</b> : {educationCGPA}</p>
                                <p className=""> <b>SGPA</b> : {educationSGPA}</p>
                                <p className=""> <b>Percentage</b> : {educationPercentage}</p>
                            </div>

                        </>
                    )

                })}
            </div>
        );
    }

    return (
        <>
            <section ref={ref} className="bg-white a4-paper all-children-black">
                {
                    resumeData.profile && profileSection(resumeData.profile)
                }
                {
                    resumeData.education && educationSection(resumeData.education)
                }
            </section>
            <button onClick={() => handlePrint(null, () => ref.current)}>
                Download Resume
            </button >
        </>
    )

}