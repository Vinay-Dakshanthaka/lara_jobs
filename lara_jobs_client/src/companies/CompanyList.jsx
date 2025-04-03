import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteCompany, getAllCompanies } from "../api/companiesApi";
import toast from "react-hot-toast"; 
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await getAllCompanies();
        setCompanies(response.data);
      } catch (error) {
        setError("Error fetching companies");
        toast.error("Error fetching companies"); 
      }
    };

    fetchCompanies();
  }, []);

  const handleDelete = async (companyId) => {
    try {
      await deleteCompany(companyId);
      setCompanies(companies.filter((company) => company.company_id !== companyId));
      toast.success("Company deleted successfully!"); 
    } catch (error) {
      setError("Error deleting company");
      toast.error("Error deleting company");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-4">Companies List</h2>
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto text-black">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left text-gray-700">Company Name</th>
              <th className="px-4 py-2 text-left text-gray-700">Website</th>
              <th className="px-4 py-2 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.company_id} className="border-b">
                <td className="px-4 py-2">{company.company_name}</td>
                <td className="px-4 py-2">{company.website_url}</td>
                <td className="px-4 py-2">
                  <div className="flex space-x-4">
                    <Link
                      to={`/admin/company/edit/${company.company_id}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(company.company_id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyList;
