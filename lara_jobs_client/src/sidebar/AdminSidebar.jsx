import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeIcon, ArrowRightEndOnRectangleIcon, AcademicCapIcon, ClipboardDocumentListIcon } from "@heroicons/react/20/solid";
import { ListBulletIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/20/solid";

const AdminSidebar = () => {
    const navigate = useNavigate();
  
    const [isManageQuestionsOpen, setIsManageQuestionsOpen] = useState(false);
  
    const logout = () => {
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('candidate_id');
      window.location.href = "/signin";
    };
  
    return (
      <div className="flex flex-col h-screen p-3 bg-gray-800 shadow w-60">
        <div className="space-y-3">
          <div className="flex items-center">
            <h2 className="text-xl font-bold text-white">Admin Dashboard</h2>
          </div>
  
          <div className="flex-1 overflow-y-auto">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              <li className="rounded-sm">
                <button
                  onClick={() => navigate("/admin")}
                  className="flex items-center p-2 space-x-3 rounded-md w-full"
                >
                  <HomeIcon className="w-6 h-6 text-gray-100" />
                  <span className="text-gray-100">Home</span>
                </button>
              </li>
  
              {/* Manage Subjects Menu */}
              <li className="rounded-sm">
                <button
                  onClick={() => navigate('/admin/subject/add-subject')}
                  className="flex items-center p-2 space-x-3 rounded-md w-full"
                >
                  <AcademicCapIcon className="w-6 h-6 text-gray-100" />
                  <span className="text-gray-100">Manage Subjects</span>
                </button>
              </li>
  
              {/* Manage Tests Menu */}
              {/* <li className="rounded-sm">
                <button
                  onClick={() => navigate('/admin/manage-tests')}
                  className="flex items-center p-2 space-x-3 rounded-md w-full"
                >
                  <ClipboardDocumentListIcon className="w-6 h-6 text-gray-100" />
                  <span className="text-gray-100">Manage Tests</span>
                </button>
              </li> */}
  
              {/* Manage Questions Menu */}
              <li className="rounded-sm">
                <button
                  onClick={() => setIsManageQuestionsOpen(!isManageQuestionsOpen)}
                  className="flex items-center p-2 space-x-3 rounded-md w-full"
                >
                  <ClipboardDocumentListIcon className="w-6 h-6 text-gray-100" />
                  <span className="text-gray-100">Test Link</span>
                </button>
  
                {/* Sub-menu for Managing Questions */}
                {isManageQuestionsOpen && (
                  <ul className="space-y-1 pl-6 mt-2">
                    <li>
                      <button
                        onClick={() => navigate("/admin/testlink/create")}
                        className="flex items-center p-2 text-gray-100 rounded-md hover:bg-gray-700"
                      >
                        <PencilIcon className="w-4"/>
                        <span>Create Test link</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => navigate("/admin/testlink/all-links")}
                        className="flex items-center p-2  text-gray-100 rounded-md hover:bg-gray-700"
                      >
                        <ListBulletIcon className="w-4"/>
                        <span>Test Links</span>
                      </button>
                    </li>
                  </ul>
                )}
              </li>
  
              {/* Logout */}
              <li className="rounded-sm">
                <button
                  onClick={logout}
                  className="flex items-center p-2 space-x-3 rounded-md w-full"
                >
                  <ArrowRightEndOnRectangleIcon className="w-6 h-6 text-gray-100" />
                  <span className="text-gray-100">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };
  
  export default AdminSidebar;