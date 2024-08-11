import { useEffect, useRef } from "react"
import generatePDF, { usePDF } from "react-to-pdf";
import { useReactToPrint } from "react-to-print";
import { useResume } from "../../context/ResumeContext";
import { CiLink } from "react-icons/ci";

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
            <div>
                <h2 className="text-center text-3xl mb-1">{profileName}</h2>
                <div className="flex gap-x-2 justify-center flex-wrap">
                    {profileGithub && <p>{profileGithub}</p>}
                    {profileMobile && <p>{profileMobile}</p>}
                    {profileLocation && <p>{profileLocation}</p>}
                    {profileEmail && <p>{profileEmail}</p>}
                    {profileLinkedin && <p>{profileLinkedin}</p>}

                </div>
            </div>
        )
    }

    const educationSection = (education) => {
        return (
            <div>
                <h2 className="section_heading">Education</h2>
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

    const projectSection = (project) => {
        return (
            <div>
                <h2 className="section_heading">Projects</h2>
                <div className="h-[1px] w-full bg-black my-1"></div>

                {project.sections.map((section, index) => {
                    // Define variables outside the JSX return statement
                    const projectTitleField = section.fields.find(field => field.id === 'project_title');
                    const projectTitle = projectTitleField ? projectTitleField.data : null; // Default value if field is not found

                    const projectLinkField = section.fields.find(field => field.id === 'project_link');
                    const projectLink = projectLinkField ? projectLinkField.data : null; // Default value if field is not found

                    const projectDesignationField = section.fields.find(field => field.id === 'project_designation');
                    const projectDesignation = projectDesignationField ? projectDesignationField.data : null; // Default value if field is not found

                    const projectBulletsField = section.fields.find(field => field.id === 'project_bullets');
                    const projectBullets = projectBulletsField ? projectBulletsField.data : null; // Default value if field is not found

                    return (
                        <>
                            <div className="flex gap-x-2">
                                <p className="font-semibold">{projectTitle}</p>
                                {
                                    projectLink != null &&
                                    <a href={projectLink} target="_blank" className="block my-auto h-fit">
                                        <CiLink className="block my-auto h-fit" />
                                    </a>
                                }
                            </div>

                            <p className="italic font-light">{projectBullets}</p>

                        </>
                    )

                })}
            </div>
        );
    }

    const skillsSection = (skills) => {


        return (
            <div>
                <h2 className="section_heading">Skills</h2>
                <div className="h-[1px] w-full bg-black my-1"></div>
                <div className="flex flex-wrap">

                    {skills.sections.map((section, index) => {
                        // Define variables outside the JSX return statement
                        const skillsSkillField = section.fields.find(field => field.id === 'skills_skill');
                        const skillsSkill = skillsSkillField ? skillsSkillField.data : null; // Default value if field is not found


                        return (
                            <>
                                <div className="flex">
                                    <p className="">{skillsSkill}{index != skills.sections.length - 1 && ','}&nbsp;</p>
                                </div>

                            </>
                        )

                    })}
                </div>
            </div>
        )
    }

    const languagesSection = (languages) => {


        return (
            <div>
                <h2 className="section_heading">Languages</h2>
                <div className="h-[1px] w-full bg-black my-1"></div>
                <div className="flex flex-wrap">

                    {languages.sections.map((section, index) => {
                        // Define variables outside the JSX return statement
                        const languagesLanguageField = section.fields.find(field => field.id === 'languages_language');
                        const languagesLanguage = languagesLanguageField ? languagesLanguageField.data : null; // Default value if field is not found


                        return (
                            <>
                                <div className="flex">
                                    <p className="">{languagesLanguage}{index != languages.sections.length - 1 && ','}&nbsp;</p>
                                </div>

                            </>
                        )

                    })}
                </div>
            </div>
        )
    }

    const experienceSection = (experience) => {
        return (
            <div>
                <h2 className="section_heading">Experience</h2>
                <div className="h-[1px] w-full bg-black my-1"></div>

                {experience.sections.map((section, index) => {
                    // Define variables outside the JSX return statement
                    const experienceCompanyField = section.fields.find(field => field.id === 'experience_company');
                    const experienceCompany = experienceCompanyField ? experienceCompanyField.data : null; // Default value if field is not found

                    const experiencePositionField = section.fields.find(field => field.id === 'experience_position');
                    const experiencePosition = experiencePositionField ? experiencePositionField.data : null; // Default value if field is not found

                    const experienceFromField = section.fields.find(field => field.id === 'experience_from');
                    const experienceFrom = experienceFromField ? experienceFromField.data : null; // Default value if field is not found

                    const experienceToField = section.fields.find(field => field.id === 'experience_to');
                    const experienceTo = experienceToField ? experienceToField.data : null; // Default value if field is not found

                    const experienceBulletsField = section.fields.find(field => field.id === 'experience_bullets');
                    const experienceBullets = experienceBulletsField ? experienceBulletsField.data : null; // Default value if field is not found

                    const experienceLocationField = section.fields.find(field => field.id === 'experience_location');
                    const experienceLocation = experienceLocationField ? experienceLocationField.data : null; // Default value if field is not found

                    return (
                        <>
                            <p className="font-semibold">{experienceCompany}</p>
                            <div className="flex gap-x-2">
                                <p className="italic font-light">{experiencePosition}</p>
                                <p className="italic font-light">{experienceLocation}</p>

                                <p className="italic font-light">({experienceFrom} - {experienceTo})</p>
                            </div>

                            <div className="flex gap-x-2">
                                <p className=""> {experienceBullets}</p>

                            </div>

                        </>
                    )

                })}
            </div>
        );
    }

    const summarySection = (summary) => {
        const SummaryTextField = summary.sections[0].fields.find(field => field.id === 'summary_text');
        const summaryText = SummaryTextField ? SummaryTextField.data : null;

        return (
            <div>
                <h2 className="section_heading">Summary</h2>
                <div className="h-[1px] w-full bg-black my-1"></div>
                <p>{summaryText}</p>

            </div>
        );

    }

    const certificatesSection = (certificates) => {
        return (
            <div>
                <h2 className="section_heading">Certificates</h2>
                <div className="h-[1px] w-full bg-black my-1"></div>

                {certificates.sections.map((section, index) => {
                    // Define variables outside the JSX return statement
                    const certificateIssuedByField = section.fields.find(field => field.id === 'certificate_issued_by');
                    const certificateIssuedBy = certificateIssuedByField ? certificateIssuedByField.data : null; // Default value if field is not found

                    const certificateNameField = section.fields.find(field => field.id === 'certificate_name');
                    const certificateName = certificateNameField ? certificateNameField.data : null; // Default value if field is not found

                    const certificateLinkField = section.fields.find(field => field.id === 'certificate_link');
                    const certificateLink = certificateLinkField ? certificateLinkField.data : null; // Default value if field is not found

                    return (
                        <>
                            <div className="flex gap-x-2">
                                <p className="italic font-light"> <b className="font-semibold">{certificateIssuedBy}</b> - {certificateName}</p>
                                {certificateLink && <a href={certificateLink} target="_blank" className="block my-auto h-fit">
                                    <CiLink className="block my-auto h-fit" />
                                </a>}
                            </div>
                        </>
                    )

                })}
            </div>
        );
    }

    const achievementSection = (achievements) => {
        return (
            <div>
                <h2 className="section_heading">Achievements</h2>
                <div className="h-[1px] w-full bg-black my-1"></div>

                {achievements.sections.map((section, index) => {
                    // Define variables outside the JSX return statement
                    const achievementPlaceField = section.fields.find(field => field.id === 'achievement_place');
                    const achievementPlace = achievementPlaceField ? achievementPlaceField.data : null; // Default value if field is not found

                    const achievementPositionField = section.fields.find(field => field.id === 'achievement_position');
                    const achievementPosition = achievementPositionField ? achievementPositionField.data : null; // Default value if field is not found

                    const achievementFromField = section.fields.find(field => field.id === 'achievement_from');
                    const achievementFrom = achievementFromField ? achievementFromField.data : null; // Default value if field is not found

                    const achievementToField = section.fields.find(field => field.id === 'achievement_to');
                    const achievementTo = achievementToField ? achievementToField.data : null; // Default value if field is not found

                    const achievementLocationField = section.fields.find(field => field.id === 'achievement_location');
                    const achievementLocation = achievementLocationField ? achievementLocationField.data : null; // Default value if field is not found

                    const achievementBulletsField = section.fields.find(field => field.id === 'achievement_bullets');
                    const achievementBullets = achievementBulletsField ? achievementBulletsField.data : null; // Default value if field is not found


                    const achievementLinkField = section.fields.find(field => field.id === 'achievement_link');
                    const achievementLink = achievementLinkField ? achievementLinkField.data : null; // Default value if field is not found

                    return (
                        <>
                            <div className="flex gap-x-2">
                                <p className="font-semibold">{achievementPlace}</p>

                                {
                                    achievementLink && <a href={achievementLink} target="_blank" className="block my-auto h-fit">
                                        <CiLink className="block my-auto h-fit" />
                                    </a>
                                }

                            </div>

                            <div className="flex gap-x-2">
                                <p className="italic font-light">{achievementPosition}</p>
                                <p className="italic font-light">{achievementLocation}</p>
                            </div>

                            <p className=""> {achievementBullets}</p>

                        </>
                    )

                })}
            </div>
        );
    }

    const leadershipSection = (leadership) => {
        return (
            <div>
                <h2 className="section_heading">Leadership</h2>
                <div className="h-[1px] w-full bg-black my-1"></div>
                <div className="flex flex-col gap-y-3">

                    {leadership.sections.map((section, index) => {
                        // Define variables outside the JSX return statement
                        const leadershipPlaceField = section.fields.find(field => field.id === 'leadership_place');
                        const leadershipPlace = leadershipPlaceField ? leadershipPlaceField.data : null; // Default value if field is not found

                        const leadershipPositionField = section.fields.find(field => field.id === 'leadership_position');
                        const leadershipPosition = leadershipPositionField ? leadershipPositionField.data : null; // Default value if field is not found

                        const leadershipFromField = section.fields.find(field => field.id === 'leadership_from');
                        const leadershipFrom = leadershipFromField ? leadershipFromField.data : null; // Default value if field is not found

                        const leadershipToField = section.fields.find(field => field.id === 'leadership_to');
                        const leadershipTo = leadershipToField ? leadershipToField.data : null; // Default value if field is not found

                        const leadershipLocationField = section.fields.find(field => field.id === 'leadership_location');
                        const leadershipLocation = leadershipLocationField ? leadershipLocationField.data : null; // Default value if field is not found

                        const leadershipBulletsField = section.fields.find(field => field.id === 'leadership_bullets');
                        const leadershipBullets = leadershipBulletsField ? leadershipBulletsField.data : null; // Default value if field is not found


                        const leadershipLinkField = section.fields.find(field => field.id === 'leadership_link');
                        const leadershipLink = leadershipLinkField ? leadershipLinkField.data : null; // Default value if field is not found

                        return (
                            <div>
                                <div className="flex gap-x-2">
                                    <p className="font-semibold">{leadershipPlace}</p>

                                    {
                                        leadershipLink && <a href={leadershipLink} target="_blank" className="block my-auto h-fit">
                                            <CiLink className="block my-auto h-fit" />
                                        </a>
                                    }

                                </div>

                                <div className="flex gap-x-2">
                                    <p className="italic font-light">{leadershipPosition}</p>
                                    <p className="italic font-light">{leadershipLocation}</p>
                                </div>

                                <p className=""> {leadershipBullets}</p>

                            </div>
                        )
                    })}

                </div>
            </div>
        );
    }

    return (
        <>
            <section ref={ref} className="bg-white a4-paper minimal-resume-css">
                <div className="flex flex-col gap-y-8">
                    {
                        resumeData.profile && profileSection(resumeData.profile)
                    }
                    {
                        resumeData.education && educationSection(resumeData.education)
                    }
                    {
                        resumeData.projects && projectSection(resumeData.projects)
                    }
                    {
                        resumeData.skills && skillsSection(resumeData.skills)
                    }
                    {
                        resumeData.experience && experienceSection(resumeData.experience)
                    }
                    {
                        resumeData.summary && summarySection(resumeData.summary)
                    }
                    {
                        resumeData.certificates && certificatesSection(resumeData.certificates)
                    }
                    {
                        resumeData.achievements && achievementSection(resumeData.achievements)
                    }
                    {
                        resumeData.languages && languagesSection(resumeData.languages)
                    }
                    {
                        resumeData.leadership && leadershipSection(resumeData.leadership)
                    }

                </div>
            </section>
            <button onClick={() => handlePrint(null, () => ref.current)}>
                Download Resume
            </button >
        </>
    )

}