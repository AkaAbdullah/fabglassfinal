import Link from 'next/link'


const Cards = () => {
    return (
        <div className="container is-justify-content-center i">
            <div className="columns is-centered ">
                <div className="column is-3">
                    <div className="card has-background-black-bis">
                        <div className="card-content">
                            <p className=" is-size-3 has-text-white"> <span className="is-size-1 has-text-white">C</span>ustom Cut</p>
                            <p className=" is-size-3 has-text-white"> <span className="is-size-1 has-text-white">P</span>rinting</p>
                            <p className=" is-size-3 mb-6 has-text-white"> <span className="is-size-1 has-text-white">R</span>eport</p>
                            <Link href="/customcutprintreport">
                                <a className="button is-outlined is-dark has-text-white is-fullwidth">View Status</a>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="column is-3">
                    <div className="card has-background-black-bis">
                        <div className="card-content">
                            <p className=" is-size-3 has-text-white"> <span className="is-size-1 has-text-white">R</span>eady Made</p>
                            <p className=" is-size-3 has-text-white"> <span className="is-size-1 has-text-white">P</span>rinting</p>
                            <p className=" is-size-3 mb-6 has-text-white"> <span className="is-size-1 has-text-white">R</span>eport</p>
                            <Link href="/readymadeprintreport">
                                <a className="button is-outlined is-dark has-text-white is-fullwidth">View Status</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cards
