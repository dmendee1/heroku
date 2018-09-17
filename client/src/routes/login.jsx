// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
// core components/views
import DashboardPage from "../views/Dashboard/Dashboard.jsx";
import UserProfile from "../views/UserProfile/UserProfile.jsx";
import Login from "../views/Dashboard/Login.jsx";
import Register from "../views/Dashboard/Register.jsx";
import ShowOrderList from "../views/OrderList/ShowOrderList.jsx";
import WorkerList from "../views/Worker/WorkerList.jsx";
import TableList from "../views/TableList/TableList.jsx";
import Typography from "../views/Typography/Typography.jsx";
import Maps from "../views/Maps/Maps.jsx";
import NotificationsPage from "../views/Notifications/Notifications.jsx";
import UpgradeToPro from "../views/UpgradeToPro/UpgradeToPro.jsx";

const loginRoutes = [
  {
    path: "/login",
    sidebarName: "Нэвтрэх",
    navbarName: "Нэвтрэх",
    icon: Dashboard,
    component: Login,
  },
  { redirect: true, path: "/", to: "/login", navbarName: "Redirect" }
];

export default loginRoutes; 
