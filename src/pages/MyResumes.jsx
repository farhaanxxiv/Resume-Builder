import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import DatabaseUtils from "../utils/DatabaseUtils"
import DateUtils from "../utils/DateUtils"
import { Link } from "react-router-dom"

export default function MyResumes() {

    const { user, loading } = useAuth()
    const [loadingResumes, setLoadingResumes] = useState(true)
    const [resumes, setResumes] = useState([])

    async function createResume() {
        const resumes = await DatabaseUtils.newResume(user.uid, 'SDE Amazon')
        if (resumes) {

        } else {

        }
    }

    async function fetchAllResume() {
        const resumes = await DatabaseUtils.getAllResumes(user.uid)
        console.log('resumes :', resumes);
        setResumes(resumes)
        setLoadingResumes(false)
    }


    useEffect(() => {
        if (user)
            fetchAllResume()
    }, [user])

    return (

        <section>
            <h1 className="text-4xl">My Resumes</h1>

            {
                (loadingResumes || loading) ?
                    <p>Loading</p>
                    :
                    <div className="mt-12">
                        <button onClick={() => console.log(';sa')} className="white w-fit font-medium">Create New Resume&nbsp;&nbsp;&nbsp;+</button>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">

                            {
                                resumes.length != 0 ?
                                    resumes.map((resume) => {

                                        return (
                                            <Link to={`/app/builder/${resume.id}`} >

                                                <div className="aspect-[1/1.414] w-full h-full rounded hover:bg-[#252525] bg-[#1c1c1c] relative">
                                                    <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">{resume.title}</p>
                                                    <p className="absolute bottom-2 left-2 text-xs">Created On : {DateUtils.DDMMYYYY(resume.created_on)}</p>
                                                </div>
                                            </Link>

                                        )

                                    }) :
                                    <p>You have no saved Resumes</p>
                            }
                        </div>
                    </div>
            }

        </section >

    )
}