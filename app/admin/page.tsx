"use client";

import Btn from "@/components/Btn";
import Container from "@/components/Container";

export default function Admin() {
  const handleDeleteMess = async () => {
    try {
      await fetch("/api/upload-care/uuid", {
        method: "DELETE",
      });
    } catch (error) {}
  };

  return (
    <div className="ancestor-container">
      <Container>
        <div className="">
          <Btn
            styles="bg-color1"
            content={"Delete Mess"}
            onClick={handleDeleteMess}
          />
        </div>
      </Container>
    </div>
  );
}
