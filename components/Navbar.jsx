import Link from 'next/link'
import Image from 'next/image'
import logo from '../public/logo.png'

const Navbar = () => {
    return (
        <div>
            <nav className="level has-background-danger is-flex-mobile 	">
                <div className="level-left">
                    <div className="level-item">
                        <Link href="/">
                            <a>
                                <Image src={logo} width={110} height={35} alt="logoo"></Image>
                            </a>
                        </Link>
                    </div>

                </div>

                <div className="level-right ">
                    <Link href="/">
                        <a className="button is-danger is-small">Login</a>
                    </Link>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
