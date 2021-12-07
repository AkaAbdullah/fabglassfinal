import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
    () => import('../components/datewise.jsx'),
    { ssr: false }
)


const DatewisePage = () => {
    return (
        <div>
            <DynamicComponentWithNoSSR />
        </div>
    )
}

export default DatewisePage
