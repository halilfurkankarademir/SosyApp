import React from "react";
import { colors } from "../../../utils/constants"; // Path'i güncelle

// Artık sadece 'onClick' prop'unu alıyor
const NavbarLogo = ({ onClick }) => {
    return (
        <h1
            className="text-2xl md:text-3xl select-none cursor-pointer mb-2"
            style={{
                color: colors.pink,
                fontFamily: "Bagel Fat One",
            }}
            onClick={onClick}
        >
            SosyApp
        </h1>
    );
};

export default NavbarLogo;
