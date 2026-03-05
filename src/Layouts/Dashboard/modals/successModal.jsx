import { CircleCheckBig } from 'lucide-react';


/** Reusable Modal Component */
const SuccessModal = ({  successModal, setSuccessModal }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 text-center">
            <div>
               <span className="font-semibold text-green-600">
                {successModal.fullName}
              </span>{" "}
            </div>
            <p className="mb-6">
             
              has been successfully {successModal.action}.
            </p>
            <button
              onClick={() => setSuccessModal(null)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
  
);

export default SuccessModal;