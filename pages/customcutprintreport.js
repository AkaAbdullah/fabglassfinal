
export const getStaticProps = async () => {
    const res = await fetch('https://nextfabglass.vercel.app/api/orders');
    const { data } = await res.json();
    console.log(typeof data);
    const count = Object.keys(data).length;
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
    var len = result.length;
    console.log(len);

    return {
        props: { reports: data, count: count, result: result, len: len },
        revalidate: 300,

    }
}

import { useState } from 'react';
import router from 'next/router';
import styles from '../styles/Home.module.css';
import Head from 'next/head'

const Customcutprintreport = ({ reports, count, result, len }) => {

    const [searchOrder, SetSearchOrder] = useState('');
    const [date, SetDate] = useState('');

    //const [datewisereport, setDateWiseReport] = useState([]);

    //Getting Date and Arrangeing
    const myArray = date.split("-");
    const year = myArray[0];
    const month = myArray[1];
    const day = myArray[2];
    const finalDate = day + '/' + month + '/' + year;
    if (typeof window !== "undefined") {
        localStorage.setItem('date', finalDate);
    }
    //getting report datewise
    function getDatewiseData() {
        const setDateWiseReport = reports.filter(x => x.Time === finalDate);
        if (typeof window !== "undefined") {
            localStorage.setItem('allRec', JSON.stringify(setDateWiseReport));
        }
        const count = Object.keys(setDateWiseReport).length;
        if (typeof window !== "undefined") {
            localStorage.setItem('count', count);
        }
        console.log(count);
        const repeated = setDateWiseReport.reduce((acc, cur) => {
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
        if (typeof window !== "undefined") {
            localStorage.setItem('repeated', JSON.stringify(result));
        }
        console.log(result);
        var len = result.length;
        if (typeof window !== "undefined") {
            localStorage.setItem('len', len);
        }
        router.push('/datewisereport');
    }

    const [doubleshow, SetDoubleShow] = useState(false);
    const HandleDoublePrint = () => {
        SetDoubleShow(!doubleshow);
    }
    return (
        <>
            <Head>
                <title>Custom Cut Printing Report</title>
            </Head>
            <div className="columns">
                <div className="column">
                    <div className=" has-background-dark">
                        <h1 className="title has-text-centered has-text-white">Custom-Cut Printing Report</h1>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="columns is-vcentered">
                    <div className="column is-3">
                        <div className="box has-background-dark">
                            <p className="subtitle has-text-centered has-text-white">Search Order No</p>
                            <input className="input is-small mb-5" type="search" onChange={event => { SetSearchOrder(event.target.value) }} placeholder="Search...."></input>
                        </div>
                    </div>
                    <div className="column is-3">
                        <div className="box has-background-dark">
                            <p className="subtitle has-text-centered has-text-white mb-1">Select Date</p>
                            <input className="input mb-1" onChange={event => { SetDate(event.target.value) }} type="date"></input>
                            <button onClick={getDatewiseData} className="button is-link is-small is-fullwidth">Search</button>
                        </div>
                    </div>
                    <div className="column is-3">
                        <div className="box has-background-warning-dark	">
                            <p className="subtitle has-text-centered has-text-white">Total printed Orders</p>
                            <p className="subtitle has-text-centered has-text-white mb-5"> <strong className="has-text-white"> {count}</strong></p>
                        </div>
                    </div>
                    <div className="column is-3">
                        <div className="box has-background-dark">
                            <p className="subtitle has-text-centered has-text-white ">Double Printed Orders</p>
                            <p className="subtitle has-text-centered has-text-white m-1">{len}</p>
                            <a className="has-text-centered button is-small is-link is-fullwidth" onClick={HandleDoublePrint}> View Details</a>
                        </div>
                    </div>
                </div>
                {
                    !doubleshow ?
                        <div className={styles.tablewrapper}>
                            <div className="columns is-centered" >
                                <table className="has-background-white-ter table has-text-centered">
                                    <thead className=" has-text-centered">
                                        <tr className=" has-background-dark has-text-centered is-selected">
                                            <th className="has-text-white has">ID</th>
                                            <th className="has-text-white has">Order Number</th>
                                            <th className="has-text-white has">Time</th>
                                            <th className="has-text-white has">Status</th>
                                            <th className="has-text-white has">Printer</th>
                                            <th className="has-text-white has">Copies</th>
                                            <th className="has-text-white has">Size</th>
                                            <th className="has-text-white has">Page Height</th>
                                            <th className="has-text-white has">Page Width</th>
                                            <th className="has-text-white has">Duplex</th>
                                        </tr>
                                    </thead>
                                    {reports.filter((val) => {
                                        if (searchOrder === '') {
                                            return val
                                        } else if (val.DocumentName.toLowerCase().includes(searchOrder.toLowerCase())) {
                                            return val;
                                        }
                                    }).slice(0, 200).map(report => {
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
                        <div className=" mb-6 columns is-centered" >
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
