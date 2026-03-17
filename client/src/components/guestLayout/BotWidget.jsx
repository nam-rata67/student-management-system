import React, { useState } from "react";
import Bot from "../guestLayout/Bot";

function BotWidget() {

  const [open, setOpen] = useState(false);

  return (
    <div>

      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "350px",
            height: "450px",
            background: "white",
            border: "1px solid gray",
            borderRadius: "10px",
            zIndex: 1000
          }}
        >
          <Bot />
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "green",
          color: "white",
          fontSize: "25px",
          border: "none",
          cursor: "pointer",
          zIndex: 1000
        }}
      >
        💬
      </button>

    </div>
  );
}

export default BotWidget;