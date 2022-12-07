import React, { useState } from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import { AccordionforSalary } from "layouts/accordion/index"
import { Button } from '@mui/material'
import bracketspic from "assets/images/bracketspvt.png"
import Swal from 'sweetalert2'
import moment from 'moment'
import Pdf from "react-to-pdf";
import { useParams } from 'react-router-dom'
const ref = React.createRef();
import { REACT_APP_BACKEND_PAYROLL_API } from 'config/backendApi'
// const tableStyling = {
//     border: "2px solid #2FAEB5",
//     borderCollapse: "collapse",
// };

const Salary = () => {
    const [filters, setFilter] = useState({
        id: ``,
        dateRange: [
            {
                startDate: moment().startOf('month').subtract(1, 'months').format('YYYY-MM-DD'),
                endDate: new Date(moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD')),
                key: 'selection'
            }
        ],
        advance: 0,
        leave: 0,
        paymentDate: new Date(),
        paymentDetails: `UBL Bank`,
    })
    const { Id } = useParams()
    const [Salary, setSalary] = useState([])
    const [loading, setLoading] = useState({
        loading: false,
        error: false,
        network: false,
    })
    const expandedAccordion = useState(true)

    const SalaryQuery = (value) => {
        setFilter(value)
    }



    const ApiSalaryCall = async () => {
        let dateArray = []
        if (filters.dateRange.length) {
            let startDate = new Date(filters?.dateRange[0].startDate)
            let endDate = new Date(filters?.dateRange[0].endDate)
            dateArray = [
                {
                    startDate: new Date(startDate.setMinutes(startDate.getMinutes() - startDate.getTimezoneOffset())).toISOString(),
                    endDate: new Date(endDate.setMinutes(endDate.getMinutes() - endDate.getTimezoneOffset())).toISOString(),
                    key: 'selection'
                }
            ]

        }

        let splitingStartDate = dateArray[0].startDate.split(`T`)[0];
        let splitingEndDate = dateArray[0].endDate.split(`T`)[0];

        let splitingDateArray = []

        splitingDateArray = [
            {
                startDate: splitingStartDate,
                endDate: splitingEndDate
            }
        ]

        try {
            setLoading({ loading: true, error: false, network: false })
            fetch(`${REACT_APP_BACKEND_PAYROLL_API}/${Id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    DateRange: splitingDateArray,
                    advance: filters?.advance?.length === 0 ? 0 : Number(filters?.advance),
                    paymentDate: filters?.paymentDate,
                    paymentDetails: filters?.paymentDetails,
                    leave: filters?.leave === 0 ? 0 : Number(filters?.leave),
                }),
            })
                .then((res) => {
                    return res.json()
                })
                .then((salarydata) => {
                    if (salarydata.hasError === true) {
                        setLoading({ loading: false, error: true, network: false })
                    } if (salarydata?.data?.payroll === "Employee not found") {
                        setLoading({ loading: false, error: false, network: false })
                        Swal.fire({
                            icon: 'warning',
                            title: `Select employee name!`,
                        })
                    }
                    else {
                        setLoading({ loading: false, error: false, network: false })
                        setSalary(salarydata.data.payroll)
                        expandedAccordion[1](false)
                    }
                })
                .catch(() => {
                    setLoading({ loading: false, error: false, network: true })
                    Swal.fire({
                        icon: 'error',
                        title: `Something went wrong!`,
                    })
                })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: `Something went wrong!`,
            })
        }
    }
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <AccordionforSalary SalaryQuery={SalaryQuery} ApiSalaryCall={ApiSalaryCall} loading={loading} expandedAccordion={expandedAccordion} />
            {Salary.employeeName &&
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
                                        <td >Salary Slip-{Salary?.month} {Salary?.year}</td>
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
                                <td className='td'><span style={{ background: "#2FAEB5", padding: "6px", color: "white", }}>{Salary?.employeeName}</span></td>
                                <th>Employee Id</th>
                                <td className='td'><span style={{ background: "#2FAEB5", padding: "6px", color: "white", }}>{Salary?.employeeId}</span></td>
                            </tr>
                            <br />
                            <tr>
                                <th>Designation</th>
                                <td className='td'><span>{Salary?.designation}</span></td>
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
                                <td className='td' width="12%">{Salary?.totalWorkingHours}</td>
                                <td className='td'>Total Working Days</td>
                                <td className='td' width="9%">{Salary?.totalWorkingDays}</td>
                            </tr>
                            <tr className='backgrond-color'>
                                <td className='td'>Present Days</td>
                                <td className='td'>{Salary?.workingDays}</td>
                                <td className='td'>Absent Days</td>
                                <td className='td'>{Salary?.absentDays}</td>
                            </tr>

                        </table>
                        <br />
                        <table border="1" className="attendance-overview">
                            <tr className='backgrond-color' height="50px" >
                                <th className='th' colSpan={4}>Performance Indicators</th>
                            </tr>
                            <tr className='backgrond-color'>
                                <td className='td' width="40%">Hourly Salary</td>
                                <td className='td' width="12%">{Salary?.hourlyRate.toFixed(2)}</td>
                                <td className='td'>Working Hours</td>
                                <td className='td' width="9%">{Salary?.totalTime.toFixed(2)}</td>
                            </tr>
                            <tr className='backgrond-color'>
                                <td className='td'>Working Days</td>
                                <td className='td'>{Salary?.workingDays}</td>
                                <td className='td'>Leaves</td>
                                <td className='td'>{Salary?.leave}</td>
                            </tr>
                            <tr className='backgrond-color'>
                                <td className='td'>Over Time Hours</td>
                                <td className='td'>{Salary?.overTime.toFixed(2)}</td>

                                <td className='td' width="40%">Missing Hours</td>
                                <td className='td' width="12%">{Salary?.missingHours.toFixed(2)}</td>
                            </tr>
                            <tr className='backgrond-color'>
                                <td className='td' width="40%">Late Hours</td>
                                <td className='td' width="12%">{Salary?.lateHours.toFixed(2)}</td>
                                <td className='td' width="40%">Early Checkout Hours</td>
                                <td className='td' width="12%">{Salary?.earlyCheckout.toFixed(2)}</td>
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
                                <td className='td' width="12%">{Salary?.monthlySalary}</td>
                                <td className='td'>Missing Hours Amount</td>
                                <td className='td'>{Salary?.missingHoursAmount.toFixed(2)}</td>
                            </tr>
                            <tr className='backgrond-color'>
                                <td className='td'>Over Time Bonus</td>
                                <td className='td'>{Salary?.overTimeBonus.toFixed(2)}</td>
                                <td className='td'>Late Hours Amount</td>
                                <td className='td'>{Salary?.lateHoursAmount.toFixed(2)}</td>
                            </tr>
                            <tr className='backgrond-color'>
                                <td className='td'>Travel Allowance</td>
                                <td className='td'>{Salary?.travelAllowence}</td>
                                <td className='td'>Advance</td>
                                <td className='td'>{Salary?.advance}</td>
                            </tr>
                            <tr className='backgrond-color'>
                                <td className='td'>Health Allowance</td>
                                <td className='td'>{Salary?.healthAllowence}</td>
                                <td className='td'>Income Tax</td>
                                <td className='td'>{Salary?.incomeTax.toFixed(2)}</td>
                            </tr>
                            <tr className='backgrond-color'>
                                <td className='td'>Residence Allowance</td>
                                <td className='td'>{Salary?.residenceAllowence}</td>
                                <td className='td' width="40%">Early Checkout Amount</td>
                                <td className='td' width="12%">{Salary?.earlyCheckoutAmount.toFixed(2)}</td>
                            </tr>
                            <tr className='backgrond-color'>
                                <td className='grossheading'>Gross Earnings</td>
                                <td className='td'>{Salary?.grossEarning.toFixed(2)}</td>
                                <td className='grossheading' >Gross Deductions</td>
                                <td className='td'>{Salary?.totalDeduction.toFixed(2)}</td>
                            </tr>
                            <tr className='backgrond-color'>
                                <td className='grossheading'><strong>NET PAY</strong></td>
                                <td className='td'>{Salary?.totalSalary.toFixed(2)}</td>
                                <td className='td' width="50%"><span style={{ textTransform: 'capitalize', textAlign: "left" }}>{Salary?.salaryInWords?.toLowerCase()} (PKR)</span></td>
                                <td className='td'></td>
                            </tr>
                        </table>

                        <br />
                        <br />
                        <br />
                        <div className='signature'>Employee Sign:______________________</div>
                        <br />
                        <br />
                        <span className='th' style={{ fontSize: "26px", padding: "4px" }}>Payment Date: </span><strong style={{ fontSize: "26px", marginLeft: "10px" }}>{Salary?.paymentDate.split(`G`)[0]}</strong>
                        <br />
                        <span className='th' style={{ fontSize: "26px", padding: "4px" }}>Payment Method: </span><strong style={{ fontSize: "26px", marginLeft: "10px" }}>{Salary?.paymentDetails}</strong>
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
        </DashboardLayout >
    )
}

export default Salary
