import React, { useEffect } from "react";

const Register = () => {
  useEffect(() => {
    const getUserData = async () => {
      const res = await fetch("/api/users/register");
      const data = await res.json();
      console.log(data);
    };
    getUserData();
  }, []);
  return <div>register</div>;
};

// export const getServerSideProps = async (context) => {
//     try {

//     } catch (error) {
//         console.error(error)
//     }
// }

export default Register;
