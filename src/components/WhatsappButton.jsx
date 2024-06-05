import React from "react";
import Button from '@mui/material/Button';
import WhatsApp from "@mui/icons-material/WhatsApp";

function WhatsappButton(props) {
  const message =
    "¡Hola! Me gustaría saber más sobre tus servicios y poder tener una sesión contigo para ayudar a mi perritx";

  const handleClick = () => {
    //const phoneNumber = "1234567890"; // Reemplaza con el número de teléfono al que quieres enviar el mensaje
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${props.phoneTrainer}&text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };
  return (
    <Button
      sx={{ borderRadius: "100px", boxShadow: "none" }}
      variant="contained"
      color="primary"
      startIcon={<WhatsApp />}
      onClick={handleClick}
    >
      {" "}
      Contactar por whatsapp{" "}
    </Button>
  );
}

export default WhatsappButton;
