import LayoutTemplate from "../../../components/Layout/layout";
import Profile from "../../../components/indUserProfile/profile";
import { Tabs } from "antd";
import UserOrders from "../../../components/indUserProfile/orders";

export default function UsersHome(){
    const {TabPane} = Tabs

    return(
    <LayoutTemplate>
        <Profile/>
    </LayoutTemplate>
    )
}