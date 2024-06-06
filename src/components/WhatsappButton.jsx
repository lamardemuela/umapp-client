import React from "react";
import WhatsApp from "@mui/icons-material/WhatsApp";
import IconButton from "@mui/material/IconButton";

function WhatsappButton(props) {
  const message =
    "¡Hola!👋🏻 Te contacto a través de *umapp* .Me gustaría saber más sobre tus servicios y poder tener una sesión contigo para ayudar a mi 🐶perritx";

  const handleClick = () => {
    //const phoneNumber = "1234567890"; // Reemplaza con el número de teléfono al que quieres enviar el mensaje
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${
      props.phoneTrainer
    }&text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };
  return (
    <IconButton
      sx={{
        borderRadius: "100px",
        boxShadow: "none",
        backgroundColor: "#34d366",
        color:"#fff"
      }}
      onClick={handleClick}
    >
      <WhatsApp />
    </IconButton>
  );
}

export default WhatsappButton;
