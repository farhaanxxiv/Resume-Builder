import { Link } from "react-router-dom";

export default function Home() {


    return (
        <>
            <section>
                <h1 className="font-semibold text-center text-5xl">Build Your Resume</h1>
                <h1 className="mt-4 font-medium text-center text-2xl bg-[white] text-black w-fit mx-auto px-4 shadow-[0px_0px_30px_#888888] rounded">For Free</h1>

            </section>

            <section>
                <Link className="w-fit mx-auto" to='/app'>
                    <button className="w-fit mx-auto">
                        Build Resume
                    </button>
                </Link>
            </section>
        </>
    )

}