import React, { useState } from "react";
import LoginForm from "../components/Account/LoginForm";
import LoginHeader from "../components/Account/LoginHeader";
import RegisterForm from "../components/Account/RegisterForm";

const LoginPage = () => {
  const [wantsToLogin, setWantsToLogin] = useState(true);

  return (
    <div
      className="flex ml-20 pr-20 h-screen w-screen bg-cover mt-10 transition ease-in-out delay-80"
      style={{
        backgroundImage: `url('/bg.jpg')`,
      }}
    >
      <div className="min-h-[calc(70vh)] flex-2/3 w-1/2">
        <LoginForm setWantsToLogin={setWantsToLogin} />
      </div>
      <div className="min-h-[calc(70vh)] flex-1/3 w-1/2">
        <LoginHeader />
      </div>
    </div>
  );
};

export default LoginPage;
