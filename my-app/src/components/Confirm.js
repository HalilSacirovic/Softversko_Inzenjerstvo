import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const ConfirmAccount = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  console.log("email", email);

  useEffect(() => {
    const confirmEmail = async () => {
      fetch(`http://localhost:5000/confirm?email=${encodeURIComponent(email)}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP greška! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Odgovor sa servera:", data);
        })
        .catch((error) => {
          console.error("Greška prilikom poziva API-ja:", error);
        });
    };

    confirmEmail();
  }, [email]);

  return <h1>Confirming your account...</h1>;
};

export default ConfirmAccount;
