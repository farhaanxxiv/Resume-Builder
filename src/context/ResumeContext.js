import { createContext, useContext, useState, useEffect } from 'react';

const ResumeContext = createContext();


export const ResumeProvider = ({ children }) => {

    const [resumeData, setResumeData] = useState({});
    const [totalSections, setTotalSections] = useState(0);

    function incrementSection() {
        setTotalSections(totalSections + 1)
    }

    function decrementSection() {
        setTotalSections(totalSections - 1)
    }

    useEffect(() => {
        console.log('resumeData :', resumeData);
    }, [resumeData])

    return (
        <ResumeContext.Provider value={{ resumeData, setResumeData, totalSections, incrementSection, decrementSection }}>
            {children}
        </ResumeContext.Provider>
    );
};

export const useResume = () => useContext(ResumeContext);
