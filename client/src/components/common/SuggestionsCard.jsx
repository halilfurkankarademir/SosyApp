import React, { memo } from "react";
import { useNavigation } from "../../context/NavigationContext";
import { BsPeopleFill, BsPersonAdd } from "react-icons/bs";
import { fakePeople } from "../../constants/fakeDatas";

const SuggestionsCard = () => {
    const { navigateToPage } = useNavigation();

    return (
        <div className="w-64 bg-neutral-800 h-auto text-white rounded-xl ">
            <div className="flex flex-row gap-2 p-4 text-sm">
                <BsPeopleFill size={16} />
                <h2 className="font-semibold">Tanıyor Olabilirsin</h2>
            </div>
            {/* Kullanıcı Bilgileri */}
            {fakePeople.map((person, index) => (
                <div
                    className="flex items-center p-4 cursor-pointer"
                    key={index}
                    onClick={() => navigateToPage(`profile/${person.username}`)}
                >
                    <img
                        src={person.profilePic} // Kullanıcı resmi URL'si
                        alt="Kullanıcı Resmi"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="ml-3">
                        <p className="text-sm font-semibold">{person.name}</p>{" "}
                        {/* Kullanıcı adı */}
                        <p className="text-xs text-neutral-400">
                            {person.username}
                        </p>{" "}
                        {/* Kullanıcı etiketi */}
                    </div>
                    <button className="ml-auto cursor-pointer hover:text-pink-500 duration-200 transition-all">
                        <BsPersonAdd size={24} />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default memo(SuggestionsCard);
