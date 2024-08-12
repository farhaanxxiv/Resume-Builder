import { BiData } from "react-icons/bi"
import { db } from ".."
import { arrayUnion, doc, getDoc, setDoc } from "firebase/firestore";
import ResumeUtils from "./ResumeUtils";

const DatabaseUtils = {

    'newResume': async (uid, title) => {
        console.log('uid, title :', uid, title);

        const data = {
            resumes: arrayUnion({
                id: ResumeUtils.uid(),
                title: title,
                created_on: new Date()
            })
        }

        try {
            await setDoc(doc(db, 'Users', uid), data, { merge: true });
            console.log('New Resume Created')

        } catch (e) {
            console.error(e)
        }

        return true

    },

    'getAllResumes': async (uid) => {
        const docRef = doc(db, "Users", uid);
        const docSnap = await getDoc(docRef);

        let allResumes = []

        if (docSnap.exists()) {
            const data = docSnap.data()
            const resumes = data.resumes

            return resumes

        } else {
            console.log("No such document!");
            return false
        }

        return allResumes
    },

    'getResumeByID': async (id) => {
        const docRef = doc(db, "Resumes", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const resume = docSnap.data()
        
            return resume

        } else {
            console.log("No such document!");
            return false
        }

    },

    'saveResumeByID': async (resumeID, resumeData) => {

        const data = {
            sections: resumeData
        }

        try {
            await setDoc(doc(db, 'Resumes', resumeID), data, { merge: true });
            console.log('Resume Saved')

        } catch (e) {
            console.error(e)
            return false
        }

        return true

    },

}

export default DatabaseUtils






//for (const resume of resumes) {
//     const docRef = doc(db, "Resumes", resume.id);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//         const data = docSnap.data()
//         if (data.sections) {
//             allResumes.push(data)
//         }
//     }

// }