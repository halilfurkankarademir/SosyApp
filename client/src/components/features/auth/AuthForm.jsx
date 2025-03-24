import React from "react";
import { PrimaryButton } from "../../ui/buttons";
import { useNavigate } from "react-router-dom";

/**
 * Kimlik doğrulama formları için temel bileşen
 * Login ve Register sayfalarında kullanılabilir
 */
const AuthForm = ({
    title,
    subtitle,
    fields,
    buttonText,
    onSubmit,
    alternateLink,
    alternateLinkText,
    forgotPasswordLink,
}) => {
    const navigate = useNavigate();

    return (
        <div className="max-w-md w-full space-y-8 z-10">
            <div>
                <h1
                    className="md:text-8xl text-4xl mb-8 select-none text-center"
                    style={{
                        color: "#f986f3",
                        fontFamily: "Bagel Fat One",
                    }}
                >
                    {title}
                </h1>
                <p className="text-md text-gray-300 text-center mb-8">
                    {subtitle}
                </p>
            </div>

            <form className="space-y-6" onSubmit={onSubmit}>
                {fields.map((field) => (
                    <div key={field.id}>
                        <label
                            htmlFor={field.id}
                            className="block text-sm font-medium text-gray-300"
                        ></label>
                        <input
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            autoComplete={field.autoComplete}
                            className="mt-1 block w-full px-4 py-2 bg-neutral-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                            placeholder={field.placeholder}
                        />
                    </div>
                ))}

                <div>
                    <PrimaryButton
                        type="submit"
                        buttonText={buttonText}
                        fullWidth={true}
                        className="w-full"
                    />
                </div>
            </form>

            {forgotPasswordLink && (
                <div className="text-center">
                    <p className="text-md text-gray-400">
                        <button
                            onClick={() => navigate(forgotPasswordLink)}
                            className="text-gray hover:text-pink-600  cursor-pointer"
                        >
                            Şifremi Unuttum
                        </button>
                    </p>
                </div>
            )}

            <hr className="border-t border-white opacity-15" />

            {alternateLink && (
                <div className="text-center">
                    <p className="text-md text-gray-400">
                        {alternateLinkText}{" "}
                        <button
                            onClick={() => navigate(alternateLink)}
                            className="text-pink-500 hover:text-pink-600 font-medium cursor-pointer"
                        >
                            {alternateLink === "/register"
                                ? "Kayıt Ol"
                                : "Giriş Yap"}
                        </button>
                    </p>
                </div>
            )}
        </div>
    );
};

export default AuthForm;
