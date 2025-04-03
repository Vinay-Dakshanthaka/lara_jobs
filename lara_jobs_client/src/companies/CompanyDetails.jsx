import React, { useState, useEffect } from "react";
import { getAllCompanies } from "../api/companiesApi";
import { EnvelopeIcon,  MapPinIcon, PhoneIcon } from "@heroicons/react/20/solid";

const CompanyDetails = () => {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await getAllCompanies();
        setCompanies(response.data);
      } catch (error) {
        setError("Error fetching companies");
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-4">Companies</h2>
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto text-black">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left text-gray-700">Company Name</th>
              <th className="px-4 py-2 text-left text-gray-700">Website</th>
              <th className="px-4 py-2 text-left text-gray-700">Contact Phone</th>
              <th className="px-4 py-2 text-left text-gray-700">Contact Email</th>
              <th className="px-4 py-2 text-left text-gray-700">Location</th>
              <th className="px-4 py-2 text-left text-gray-700">Pincode</th>
              <th className="px-4 py-2 text-left text-gray-700">District</th>
              <th className="px-4 py-2 text-left text-gray-700">State</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.company_id} className="border-b">
                <td className="px-4 py-2">{company.company_name}</td>
                <td className="px-4 py-2">
                  <a
                    href={company.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {company.website_url}
                  </a>
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <PhoneIcon className="h-5 w-5 text-gray-500" />
                    <span>{company.contact_phone}</span>
                  </div>
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <EnvelopeIcon className="h-5 w-5 text-gray-500" />
                    <span>{company.contact_email}</span>
                  </div>
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <MapPinIcon className="h-5 w-5 text-gray-500" />
                    <span>{company.location}</span>
                  </div>
                </td>
                <td className="px-4 py-2">{company.pincode}</td>
                <td className="px-4 py-2">{company.district}</td>
                <td className="px-4 py-2">{company.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyDetails;
