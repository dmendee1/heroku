// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
// core components/views
import DashboardPage from "../views/Dashboard/Dashboard.jsx";
import ShowOrderList from "../views/OrderList/ShowOrderList.jsx";
import WorkerList from "../views/Worker/WorkerList.jsx";
import Notifications from "../views/Notifications/Notifications.jsx"
import TableList from "../views/TableList/TableList.jsx"

const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Нүүр",
    navbarName: "Нүүр",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/order",
    sidebarName: "Захиалгын жагсаалт",
    navbarName: "Захиалгын жагсаалт",
    icon: "content_paste",
    component: ShowOrderList
  },
  {
    path: "/worker",
    sidebarName: "Ажилчидын жагсаалт",
    navbarName: "Ажилчидын жагсаалт",
    icon: LibraryBooks,
    component: WorkerList
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes; 
