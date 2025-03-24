import React, { useState } from "react";
import GlowEffect from "../../components/ui/effects/GlowEffect";
import Navbar from "../../components/common/Navbar";
import PrimaryButton from "../../components/ui/buttons/PrimaryButton";
import { useNavigation } from "../../context/NavigationContext";
import { useAuth } from "../../context/AuthContext";
import { userInfoFields } from "../../utils/constants";
import FormInput from "../../components/ui/inputs/FormInput";

const UserInfoPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        about: "",
        profession: "",
        location: "",
        website: "",
        birthdate: "",
        phone: "",
    });

    const { navigateToPage } = useNavigation();
    const { setIsAuthenticated } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Bilgiler kaydedildikten sonra yönlendirme
        setIsAuthenticated(true);
        navigateToPage("/");
    };

    return (
        <>
            <Navbar isInAppPage={false} />
            <div className="min-h-screen flex items-center justify-center bg-neutral-900 py-24 px-8 sm:px-6 lg:px-24 z-10">
                <GlowEffect />
                <div className="max-w-md w-full space-y-8 z-10">
                    <div>
                        <h1
                            className="md:text-6xl text-4xl mb-8 select-none text-center"
                            style={{
                                color: "#f986f3",
                                fontFamily: "Bagel Fat One",
                            }}
                        >
                            Profilini Tamamla
                        </h1>
                        <p className="text-md text-gray-300 text-center mb-8">
                            Profilini tamamla ve SosyApp'teki deneyimini
                            kişiselleştir!
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {userInfoFields.map((field) => (
                            <FormInput
                                key={field.id}
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                required={field.required}
                                placeholder={field.placeholder}
                                label={field.label}
                                value={formData[field.name]}
                                onChange={handleChange}
                            />
                        ))}

                        {/* Kaydet Butonu */}
                        <div>
                            <PrimaryButton
                                type="submit"
                                buttonText={"Kaydı Tamamla"}
                                handleClick={handleSubmit}
                                fullWidth={true}
                                className="w-full"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UserInfoPage;
