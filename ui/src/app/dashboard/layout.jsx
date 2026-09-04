// app/dashboard/layout.jsx
// import AdminSidebar from '../../components/admin/admin-sidebar'
// import AdminNavbar from '../../components/common/admin-navbar'
// import AuthGuard from '../../components/common/auth/AuthGuard'

import AuthGuard from "@/common/auth/AuthGuard";

export default function DashboardLayout({ children }) {
  return (
    <AuthGuard>
      <div className="d-flex flex-column vh-100">
        {/* Navbar */}
        <div className="admin-navbar flex-shrink-0">
          {/* <AdminNavbar /> */}
        </div>

        {/* Body */}
        <div className="container-fluid flex-grow-1 overflow-hidden px-0">
          <div className="row user-dashboard g-0 h-100">
            {/* Sidebar */}
            <div className="col-xl-2 col-lg-3 d-none d-lg-block h-100 overflow-auto">
              {/* <AdminSidebar /> */}
            </div>

            {/* Content */}
            <div className="col-xl-10 col-lg-9 col-md-12 h-100 overflow-auto">
              <div className="user-dashboard-box bg-light p-3 min-h-100">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
