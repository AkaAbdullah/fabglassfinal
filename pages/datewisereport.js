import dynamic from 'next/dynamic'
import Head from 'next/head'

const DynamicComponentWithNoSSR = dynamic(
    () => import('../components/datewise.jsx'),
    { ssr: false }
)


const DatewisePage = () => {
    return (
        <>
            <Head>
                <title>Datewise Printing Report</title>
            </Head>
            <DynamicComponentWithNoSSR />
        </>
    )
}

export default DatewisePage
