"use client";

import { useState } from "react";
import Fillvoice from "@/components/fillvoice";
import Dashboard from "@/components/dashboard";
import '@fortawesome/fontawesome-free/css/all.min.css';


export default function Home() {
  const [showFillvoice, setShowFillvoice] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Dashboard Component */}
      <Dashboard />

      {/* Main Content */}
      
        
        {showFillvoice && <Fillvoice />}
      </div>
    
  );
}
