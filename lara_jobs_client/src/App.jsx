import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import EmailForm from './components/signUp/EmailForm';
import PhoneForm from './components/signUp/PhoneForm';
import PasswordForm from './components/signUp/PasswordForm';

function App() {

  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {!emailVerified && <EmailForm onOtpVerified={() => setEmailVerified(true)} />}
      {emailVerified && !phoneVerified && (
        <PhoneForm onPhoneVerified={() => setPhoneVerified(true)} />
      )}
      {phoneVerified && <PasswordForm />}
    </div>
  );
}

export default App
