"use client";

import { signOut } from "next-auth/react";
import React from "react";

const EmergencySignOut = () => {
  return <button onClick={() => signOut()}>Sign Out</button>;
};

export default EmergencySignOut;
