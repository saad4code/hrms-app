/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
/**
Created By Muhammad Saad
*/

/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from 'layouts/dashboard'
import Employes from 'layouts/tables'
import TalentHunt from 'layouts/talenthunt'
// import Billing from "layouts/billing";
// import RTL from "layouts/rtl";
// import Notifications from 'layouts/notifications'
import Profile from 'layouts/employeeprofile'
import Candidateprofile from 'layouts/candidatesprofile'
import SignIn from 'layouts/authentication/sign-in'
import AddEmploys from 'layouts/addemploy'
import Salary from 'layouts/salary/index'
import Holidays from 'layouts/paidholidays/index'
// import SignUp from "layouts/authentication/sign-up";


import PersonIcon from '@mui/icons-material/Person'
import DashboardIcon from '@mui/icons-material/Dashboard'
import { Protect } from 'layouts/Protectedroutes/Protect'
import ProtectSignin from 'layouts/Protectedroutes/ProtectSignin'
import Attendance from 'layouts/attendance'
import Expensetracker from 'layouts/expensetracker'
import Accountmanagement from "layouts/accountmanagement"
import Accounts from "layouts/accounts/index"
import { GetAllSalary } from "layouts/salary/getAllSalary"
import MoneyIcon from '@mui/icons-material/Money'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import logo from "./assets/images/Asset_10.svg"

const routes = [
  {
    type: `collapse`,
    name: `Dashboard`,
    key: `dashboard`,
    icon: <DashboardIcon fontSize="small">dashboard</DashboardIcon>,
    route: `/dashboard`,
    component: (
      <Protect>
        <Dashboard />
      </Protect>
    ),
  },
  {
    type: `collapse`,
    name: `Employees`,
    key: `employees`,
    icon: <PersonIcon fontSize="small">PersonIcon</PersonIcon>,
    route: `/employees`,
    component: (
      <Protect>
        <Employes />
      </Protect>
    ),
  },

  {
    type: `collapse`,
    name: `Talent Hunt`,
    key: `talenthunt`,
    icon: <PersonIcon fontSize="small">PersonIcon</PersonIcon>,
    route: `/talenthunt`,
    component: (
      <Protect>
        <TalentHunt />
      </Protect>
    ),
  },
  {
    type: `collapse`,
    name: `Attendance`,
    key: `attendance`,
    icon: <CalendarMonthIcon fontSize="small">CalendarMonthIcon</CalendarMonthIcon>,
    route: `/attendance`,
    component: (
      <Protect>
        <Attendance />
      </Protect>
    ),
  },
  {
    type: `collapse`,
    name: `GetAllSalary`,
    key: `getallsalary`,
    icon: <AccountBalanceWalletIcon fontSize="small">AccountBalanceWalletIcon</AccountBalanceWalletIcon>,
    route: `/getallsalary`,
    component: (
      <Protect>
        <GetAllSalary />
      </Protect>
    ),
  },
  {
    type: `collapse`,
    name: `Paid Holidays`,
    key: `holidays`,
    icon: <img src={logo} />,
    route: `/holidays`,
    component: (
      <Protect>
        <Holidays />
      </Protect>
    ),
  },
  {
    type: `collapse`,
    name: `Accounts`,
    key: `accounts`,
    icon: <AccountBalanceWalletIcon fontSize="small">AccountBalanceWalletIcon</AccountBalanceWalletIcon>,
    route: `/accounts`,
    component: (
      <Protect>
        <Accounts />
      </Protect>
    ),
  },
  {
    type: `collapse`,
    name: `Expenses`,
    key: `expenses`,
    icon: <MoneyIcon fontSize="small">MoneyIcon</MoneyIcon>,
    route: `/expenses`,
    component: (
      <Protect>
        <Expensetracker />
      </Protect>
    ),
  },
  {
    // type: `collapse`,
    // name: `Accountmanagement`,
    key: `accountmanagement`,
    // icon: <CalendarMonthIcon fontSize="small">CalendarMonthIcon</CalendarMonthIcon>,
    route: `/accounts/add`,
    component: (
      <Protect>
        <Accountmanagement />
      </Protect>
    ),
  },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  // {
  //   // type: "collapse",
  //   // name: "Notifications",
  //   key: `notifications`,
  //   // icon: <PersonIcon fontSize="small">notifications</PersonIcon>,
  //   route: `/notifications`,
  //   component: <Notifications />
  // },
  {
    // type: "collapse",
    // name: "Notifications",
    key: `AddEmploys`,
    // icon: <Icon fontSize="small">notifications</Icon>,
    route: `/employees/add`,
    component: (
      <Protect>
        <AddEmploys />
      </Protect>
    ),
  },
  {
    //   type: "collapse",
    //   name: "Profile",
    key: `profile`,
    //   icon: <Icon fontSize="small">person</Icon>,
    route: `/employees/:Id/update`,
    component: (
      <Protect>
        <Profile />
      </Protect>
    ),
  },
  {
    key: `salary`,
    route: `/salary/:Id`,
    component: (
      <Protect>
        <Salary />
      </Protect>
    ),
  },
  {
    //   type: "collapse",
    //   name: "Profile",
    key: `candidateprofile`,
    //   icon: <Icon fontSize="small">person</Icon>,
    route: `/candidates/:Id/view`,
    component: (
      <Protect>
        <Candidateprofile />
      </Protect>
    ),
  },

  {
    //   type: "collapse",
    //   name: "Profile",
    key: `attendance`,
    //   icon: <Icon fontSize="small">person</Icon>,
    route: `/attendance/:attendanceId`,
    component: (
      <Protect>
        <Attendance />
      </Protect>
    ),
  },
  {
    // type: "collapse",
    // name: "Sign In",
    key: `sign-in`,
    // icon: <Icon fontSize="small">login</Icon>,
    route: `/sign-in`,
    component: (
      <ProtectSignin>
        <SignIn />
      </ProtectSignin>
    ),
  },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  // },
]

export default routes
