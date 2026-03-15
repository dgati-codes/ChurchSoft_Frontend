import ServiceTypeTag from "../AttendanceSeviceTypeTag";

function AttendanceViewModal({ record, isOpen, onClose }) {
  if (!isOpen || !record) return null;

  const total =
    record.boys +
    record.girls +
    record.juniorYouthMale +
    record.juniorYouthFemale +
    record.seniorYouthMale +
    record.seniorYouthFemale +
    record.adultMen +
    record.adultWomen +
    record.visitorMale +
    record.visitorFemale;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-10 rounded-lg max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">View Record</h3>
          <button onClick={onClose} className="text-gray-500">
            &times;
          </button>
        </div>
        <div className="space-y-4">
          <p>
            <strong>Date:</strong>{" "}
            {new Date(record.serviceDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Service Type:</strong>{" "}
            <ServiceTypeTag type={record.serviceType} />
          </p>
          <p>
            <strong>Submitted By:</strong> {record.submittedBy}
          </p>
          <p>
            <strong>Region:</strong> {record.region}
          </p>
          <p>
            <strong>District:</strong> {record.district}
          </p>
          <p>
            <strong>Assembly:</strong> {record.localAssembly}
          </p>
          <p>
            <strong>Total Attendance:</strong> {total}
          </p>
          <div className="mt-2">
            <strong>Detailed Split:</strong>
            <table className="w-full mt-2 text-sm border-collapse border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-3 py-2">Category</th>
                  <th className="border p-2">Male</th>
                  <th className="border p-2">Female</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">Children</td>
                  <td className="border p-2">{record.boys}</td>
                  <td className="border p-2">{record.girls}</td>
                </tr>
                <tr>
                  <td className="border p-2">Junior Youth</td>
                  <td className="border p-2">{record.juniorYouthMale}</td>
                  <td className="border p-2">{record.juniorYouthFemale}</td>
                </tr>
                <tr>
                  <td className="border p-2">Senior Youth</td>
                  <td className="border p-2">{record.seniorYouthMale}</td>
                  <td className="border p-2">{record.seniorYouthFemale}</td>
                </tr>
                <tr>
                  <td className="border p-2">Adults</td>
                  <td className="border p-2">{record.adultMen}</td>
                  <td className="border p-2">{record.adultWomen}</td>
                </tr>
                <tr>
                  <td className="border p-2">Visitors</td>
                  <td className="border p-2">{record.visitorMale}</td>
                  <td className="border p-2">{record.visitorFemale}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <strong>Notes:</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Observations:</strong>{" "}
              {record.generalObservations || "N/A"}
            </li>
            <li>
              <strong>Challenges:</strong> {record.challengesNoticed || "N/A"}
            </li>
            <li>
              <strong>Recommendations:</strong> {record.recommendation || "N/A"}
            </li>
          </ul>
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default AttendanceViewModal;
