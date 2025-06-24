import { Outlet } from "react-router-dom"
import { SideBar } from "../../components/Sidebar/SideBar"

export const BasePage = () => {
  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div style={{ flex: 1, padding: '20px' }}>
        <Outlet />
      </div>
    </div>
  )
}