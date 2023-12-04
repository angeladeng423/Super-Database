import './EmailVerification.css';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EmailVerification() {
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/authy/verify/${token}`);
        const data = await response.json();

        console.log(data);

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (error) {
        console.error('Error during email verification:', error);
      }
    };

    fetchData();

    return () => clearTimeout();
  }, [token, navigate]);

  return (
    <div>
      <div id="email-verified">
        <p id="emailver-text">Your email has been verified. You are now being redirected to the login page.</p>
      </div>
    </div>
  );
}

export default EmailVerification;
