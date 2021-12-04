
export const getStaticProps = async () => {
    const res = await fetch('https://fabglass.vercel.app/api/customcutprintingreport');
    const { data } = await res.json();
    const count = Object.keys(data).length;
    console.log(count);
    const repeated = data.reduce((acc, cur) => {
        const name = cur.DocumentName;
        if (acc[name]) {
            acc[name]++;
        } else {
            acc[name] = 1;
        }
        return acc;
    }, {})

    var result = []
    for (var key in repeated) {
        if (repeated[key] >= 2) {
            result.push(key + ': ' + repeated[key]);
        }
    }
    console.log(result);
    var len = result.length;
    console.log(len);


    return {
        props: { reports: data, count: count, result: result, len: len },
        revalidate: 20,

    }
}
import { useState } from 'react';
import styles from '../styles/Home.module.css';

const Customcutprintreport = ({ reports, count, result, len }) => {
    const [searchOrder, SetSearchOrder] = useState('');

    const [doubleshow, SetDoubleShow] = useState(false);
    const HandleDoublePrint = () => {
        SetDoubleShow(!doubleshow);
    }
    return (
        <>
            <div className="columns">
                <div className="column">
                    <div className=" has-background-dark">
                        <h1 className="title has-text-centered has-text-white">Custom Cut Printing Report</h1>
                    </div>
                </div>
            </div>
            <div className="container">

                <div className="columns is-vcentered">
                    <div className="column is-4">
                        <div className="box has-background-dark">
                            <p className="subtitle has-text-centered has-text-white">Search Order No</p>
                            <input className="input" type="search" onChange={event => { SetSearchOrder(event.target.value) }} placeholder="Search...."></input>
                        </div>
                    </div>
                    <div className="column is-4">
                        <div className="box has-background-dark">
                            <p className="subtitle has-text-centered has-text-white">Total printed Orders</p>
                            <p className="subtitle has-text-centered has-text-white"> <strong className="has-text-white"> {count}</strong></p>
                        </div>
                    </div>
                    <div className="column is-4">
                        <div className="box has-background-dark">
                            <p className="subtitle has-text-centered has-text-white">Double Printed Orders</p>
                            <p className="subtitle has-text-centered has-text-white">{len}</p>
                            <a className="has-text-centered button is-small is-rounded is-success is-fullwidth" onClick={HandleDoublePrint}> View Details</a>
                        </div>
                    </div>
                </div>
                {
                    !doubleshow ?
                        <div className={styles.tablewrapper}>
                            <div className="columns is-centered" >
                                <table className="table has-text-centered">
                                    <thead className="has-text-centered">
                                        <tr className="has-text-centered is-selected">
                                            <th className="has-text-black">ID</th>
                                            <th className="has-text-black">Order Number</th>
                                            <th className="has-text-black">Time</th>
                                            <th className="has-text-black">Status</th>
                                            <th className="has-text-black">Printer</th>
                                            <th className="has-text-black">Copies</th>
                                            <th className="has-text-black">Size</th>
                                            <th className="has-text-black">Height</th>
                                            <th className="has-text-black">Width</th>
                                            <th className="has-text-black">Duplex</th>
                                        </tr>
                                    </thead>
                                    {reports.filter((val) => {
                                        if (searchOrder === '') {
                                            return val
                                        } else if (val.DocumentName.toLowerCase().includes(searchOrder.toLowerCase())) {
                                            return val;
                                        }
                                    }).map(report => {
                                        return (
                                            <tbody key={report._id} className="has-text-centered">
                                                <tr key={report._id} style={{ border: '1px solid #e5e5e5' }}>
                                                    <td>{report._id}</td>
                                                    <td>{report.DocumentName}</td>
                                                    <td>{report.Time}</td>
                                                    <td>Printed</td>
                                                    <td>{report.Printer}</td>
                                                    <td>{report.Copies}</td>
                                                    <td>{report.Size}</td>
                                                    <td>{report.Height}</td>
                                                    <td>{report.Width}</td>
                                                    <td>{report.Duplex}</td>
                                                </tr>
                                            </tbody>
                                        )
                                    })}
                                </table>
                            </div>

                        </div> :
                        <div className="columns is-centered" >
                            <table className="table has-text-centered">
                                <thead className="has-text-centered">
                                    <tr className="has-text-centered is-selected">
                                        <th className="has-text-black">Double Printed Files</th>
                                    </tr>
                                </thead>
                                {
                                    result.map(function (item, i) {

                                        return (<tbody key={result.id} className="has-text-centered">
                                            <tr key={result.id} style={{ border: '1px solid #e5e5e5' }}>
                                                <td>{item}</td>
                                            </tr>
                                        </tbody>);
                                    })
                                }
                            </table>
                        </div>
                }
            </div>
        </>
    )
}

export default Customcutprintreport
