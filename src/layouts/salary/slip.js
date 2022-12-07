import React from 'react'
import Pdf from "react-to-pdf";
import { Button } from '@mui/material'
const ref = React.createRef();
import bracketspic from "assets/images/bracketspvt.png"
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'

const SalarySlip = ({ singleSalary }) => {
    console.log(`singleSalary`, singleSalary)
    return (
        <>
            <DashboardLayout>
                <DashboardNavbar />
                {singleSalary?.employeeName &&
                    <>
                        <div ref={ref}>
                            <br />
                            <center>
                                <div>
                                    <table>

                                        <tr>
                                            <th className='salaryheading'>Salary Slip</th>
                                            <td style={{ position: "absolute", left: "28px", }} ><img src={bracketspic} height="80px" /></td>
                                            <td style={{ position: "absolute", right: "28px", fontSize: "30px" }} ><strong>Confidential</strong></td>
                                        </tr>
                                        <tr >
                                            <td >Salary Slip-{singleSalary?.month} {singleSalary?.year}</td>
                                        </tr>
                                    </table>
                                </div>
                            </center>
                            <br />
                            <br />
                            <br />
                            <table className="attendance-overview">
                                <tr height="50px" >
                                    <th className='th' colSpan={4}>Personal Details</th>
                                </tr>
                                <br />
                                <tr>
                                    <th>Employee Name</th>
                                    <td className='td'><span style={{ background: "#2FAEB5", padding: "6px", color: "white", }}>{singleSalary?.employeeName}</span></td>
                                    <th>Employee Id</th>
                                    <td className='td'><span style={{ background: "#2FAEB5", padding: "6px", color: "white", }}>{singleSalary?.employeeId}</span></td>
                                </tr>
                                <br />
                                <tr>
                                    <th>Designation</th>
                                    <td className='td'><span>{singleSalary?.designation}</span></td>
                                    <th></th>
                                    <td className='td'></td>
                                </tr>
                            </table>
                            <br />

                            <table border="1" className="attendance-overview">
                                <tr height="50px" >
                                    <th className='th' colSpan={4}>Attendance Overview</th>
                                </tr>
                                <tr className='backgrond-color'>
                                    <td className='td' width="40%">Total Working Hours</td>
                                    <td className='td' width="12%">{singleSalary?.totalWorkingHours}</td>
                                    <td className='td'>Total Working Days</td>
                                    <td className='td' width="9%">{singleSalary?.totalWorkingDays}</td>
                                </tr>
                                <tr className='backgrond-color'>
                                    <td className='td'>Present Days</td>
                                    <td className='td'>{singleSalary?.workingDays}</td>
                                    <td className='td'>Absent Days</td>
                                    <td className='td'>{singleSalary?.absentDays}</td>
                                </tr>

                            </table>
                            <br />
                            <table border="1" className="attendance-overview">
                                <tr className='backgrond-color' height="50px" >
                                    <th className='th' colSpan={4}>Performance Indicators</th>
                                </tr>
                                <tr className='backgrond-color'>
                                    <td className='td' width="40%">Hourly Salary</td>
                                    <td className='td' width="12%">{singleSalary?.hourlyRate.toFixed(2)}</td>
                                    <td className='td'>Working Hours</td>
                                    <td className='td' width="9%">{singleSalary?.totalTime.toFixed(2)}</td>
                                </tr>
                                <tr className='backgrond-color'>
                                    <td className='td'>Working Days</td>
                                    <td className='td'>{singleSalary?.workingDays}</td>
                                    <td className='td'>Leaves</td>
                                    <td className='td'>{singleSalary?.leave}</td>
                                </tr>
                                <tr className='backgrond-color'>
                                    <td className='td'>Over Time Hours</td>
                                    <td className='td'>{singleSalary?.overTime.toFixed(2)}</td>

                                    <td className='td' width="40%">Missing Hours</td>
                                    <td className='td' width="12%">{singleSalary?.missingHours.toFixed(2)}</td>
                                </tr>
                                <tr className='backgrond-color'>
                                    <td className='td' width="40%">Late Hours</td>
                                    <td className='td' width="12%">{singleSalary?.lateHours.toFixed(2)}</td>
                                    <td className='td' width="40%">Early Checkout Hours</td>
                                    <td className='td' width="12%">{singleSalary?.earlyCheckout.toFixed(2)}</td>
                                </tr>
                            </table>
                            <br />

                            <table border="1" className="attendance-overview">
                                <tr className='backgrond-color' height="50px" >
                                    <th className='th' colSpan={4}>Calculations</th>
                                </tr>
                                <tr>
                                    <th>Earnings</th>
                                    <th>Amount</th>
                                    <th>Deductions</th>
                                    <th>Amount</th>
                                </tr>
                                <tr className='backgrond-color'>
                                    <td className='td' width="43%">Basic Salary</td>
                                    <td className='td' width="12%">{singleSalary?.monthlySalary}</td>
                                    <td className='td'>Missing Hours Amount</td>
                                    <td className='td'>{singleSalary?.missingHoursAmount.toFixed(2)}</td>
                                </tr>
                                <tr className='backgrond-color'>
                                    <td className='td'>Over Time Bonus</td>
                                    <td className='td'>{singleSalary?.overTimeBonus.toFixed(2)}</td>
                                    <td className='td'>Late Hours Amount</td>
                                    <td className='td'>{singleSalary?.lateHoursAmount.toFixed(2)}</td>
                                </tr>
                                <tr className='backgrond-color'>
                                    <td className='td'>Travel Allowance</td>
                                    <td className='td'>{singleSalary?.travelAllowence}</td>
                                    <td className='td'>Advance</td>
                                    <td className='td'>{singleSalary?.advance}</td>
                                </tr>
                                <tr className='backgrond-color'>
                                    <td className='td'>Health Allowance</td>
                                    <td className='td'>{singleSalary?.healthAllowence}</td>
                                    <td className='td'>Income Tax</td>
                                    <td className='td'>{singleSalary?.incomeTax.toFixed(2)}</td>
                                </tr>
                                <tr className='backgrond-color'>
                                    <td className='td'>Residence Allowance</td>
                                    <td className='td'>{singleSalary?.residenceAllowence}</td>
                                    <td className='td' width="40%">Early Checkout Amount</td>
                                    <td className='td' width="12%">{singleSalary?.earlyCheckoutAmount.toFixed(2)}</td>
                                </tr>
                                <tr className='backgrond-color'>
                                    <td className='grossheading'>Gross Earnings</td>
                                    <td className='td'>{singleSalary?.grossEarning.toFixed(2)}</td>
                                    <td className='grossheading' >Gross Deductions</td>
                                    <td className='td'>{singleSalary?.totalDeduction.toFixed(2)}</td>
                                </tr>
                                <tr className='backgrond-color'>
                                    <td className='grossheading'><strong>NET PAY</strong></td>
                                    <td className='td'>{singleSalary?.totalSalary.toFixed(2)}</td>
                                    <td className='td' width="50%"><span style={{ textTransform: 'capitalize', textAlign: "left" }}>{singleSalary?.salaryInWords?.toLowerCase()} (PKR)</span></td>
                                    <td className='td'></td>
                                </tr>
                            </table>

                            <br />
                            <br />
                            <br />
                            <div className='signature'>Employee Sign:______________________</div>
                            <br />
                            <br />
                            <span className='th' style={{ fontSize: "26px", padding: "4px" }}>Payment Date: </span><strong style={{ fontSize: "26px", marginLeft: "10px" }}>{singleSalary?.paymentDate.split(`G`)[0]}</strong>
                            <br />
                            <span className='th' style={{ fontSize: "26px", padding: "4px" }}>Payment Method: </span><strong style={{ fontSize: "26px", marginLeft: "10px" }}>{singleSalary?.paymentDetails}</strong>
                            <br />
                            <br />

                            <p style={{ fontSize: "25px" }}>*This is a computer generated slip. Not required sign.</p>
                        </div>
                        <br />
                        <Pdf targetRef={ref} filename="SalarySlip.pdf" x={34} y={25} scale={0.5}>
                            {({ toPdf }) => <>
                                <Button
                                    variant="contained"
                                    disableElevation
                                    onClick={toPdf}
                                    style={{
                                        color: 'white',
                                        background: '#2FAEB5',
                                    }}
                                >
                                    Download Pdf
                                </Button>
                            </>
                            }
                        </Pdf>
                    </>
                }
            </DashboardLayout>
        </>

    )
}

export default SalarySlip