
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import React from 'react'
const Datewisecomponent = () => {
    const [searchOrder, SetSearchOrder] = useState('');

    var reports;
    var date;
    var count;
    var result;
    var len;
    if (typeof window !== "undefined") {
        reports = JSON.parse(localStorage.getItem('allRec'));
        date = localStorage.getItem('date');
        count = localStorage.getItem('count');
        result = JSON.parse(localStorage.getItem('repeated'));
        len = localStorage.getItem('len');
    }
    console.log(typeof date)
    console.log(typeof reports)

    const [doubleshow, SetDoubleShow] = useState(false);
    const HandleDoublePrint = () => {
        SetDoubleShow(!doubleshow);
    }

    return (
        <>
            <div className="mb-6">
                <p className="title has-text-centered has-background-dark has-text-white">
                    Datewise Report {date}
                </p>
            </div>
            <div className="container">
                <div className="columns is-vcentered">
                    <div className="column is-4">
                        <div className="box has-background-dark">
                            <p className="subtitle has-text-centered has-text-white">Search Order No</p>
                            <input className="input is-small mb-5" type="search" onChange={event => { SetSearchOrder(event.target.value) }} placeholder="Search...."></input>
                        </div>
                    </div>

                    <div className="column is-4">
                        <div className="box has-background-warning-dark	">
                            <p className="subtitle has-text-centered has-text-white">Total printed Orders</p>
                            <p className="subtitle has-text-centered has-text-white mb-5"> <strong className="has-text-white"> {count}</strong></p>
                        </div>
                    </div>
                    <div className="column is-4">
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

export default Datewisecomponent
