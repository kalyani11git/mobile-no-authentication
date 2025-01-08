import React, { useState } from 'react';
import { auth } from './firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const PhoneAuth = () => {
  const [phone, setPhone] = useState('');
  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [showOtp, setShowOtp] = useState(false);

  const sendOtp = async () => {
    try {
      setError('');
      const recaptha = new RecaptchaVerifier(auth, "recaptcha-container", { size: 'invisible' });
      const confirmation = await signInWithPhoneNumber(auth, phone, recaptha);
      setUser(confirmation);
      setShowOtp(true); // Show OTP section
      console.log(confirmation);
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  const verifyOtp = async () => {
    try {
      setError('');
      const data = await user.confirm(otp);
      console.log('Verification successful:', data);
      alert('Phone number verified successfully!');
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Phone Authentication</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number (e.g., +1234567890)"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendOtp}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 mt-2"
            >
              Send OTP
            </button>
            <div id="recaptcha-container"></div>
          </div>

          {showOtp && (
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter the OTP"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={verifyOtp}
                className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 mt-2"
              >
                Verify Code
              </button>
            </div>
          )}

          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default PhoneAuth;
