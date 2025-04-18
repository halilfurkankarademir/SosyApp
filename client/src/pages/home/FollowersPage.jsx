import React, { useEffect, useState } from "react";
import { Navbar, Sidebar } from "../../components/common";
import { BsPeopleFill } from "react-icons/bs";
import LargeSearchInput from "../../components/ui/inputs/LargeSearchInput";
import { allFollowers } from "../../constants/fakeDatas";
import { useDebounce } from "use-debounce";
import { getAllUsers, getCurrentUser } from "../../api/userApi";
import FollowerCard from "../../components/ui/cards/FollowerCard";
import useUserStore from "../../hooks/useUserStore";

const FollowersPage = () => {
    const [search, setSearch] = useState("");
    const [debouncedSearch] = useDebounce(search, 300);
    const [allUsers, setAllUsers] = useState([]);

    const setUser = useUserStore((state) => state.setUser);

    // Filtreleme
    const filteredFollowers = allFollowers.filter(
        (follower) =>
            follower.name
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase()) ||
            follower.username
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase())
    );

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Takipçilerim";
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const users = await getAllUsers();
            const currentUser = await getCurrentUser();
            setAllUsers(users);
            setUser(currentUser);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    return (
        <>
            <Navbar isInAppPage={true} />
            <div className="page-container py-24 md:py-36 px-4 md:px-0">
                <div className="page-grid-layout-other">
                    {/* Sidebar - Mobilde gizli */}
                    <Sidebar />

                    {/* Takipçiler Bölümü */}
                    <div className="md:col-span-3  md:ml-72 w-full">
                        <div className="bg-neutral-800 p-4 md:p-6 rounded-lg mb-4 md:mb-6">
                            <div className="flex items-center mb-6">
                                <div
                                    className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 mr-3 rounded-full text-white"
                                    style={{ backgroundColor: "#62c8ff" }}
                                >
                                    <BsPeopleFill className="text-lg md:text-xl" />
                                </div>
                                <h1 className="text-xl md:text-2xl font-semibold text-white">
                                    Takipçilerim
                                </h1>
                            </div>

                            {/* Arama cubugu*/}

                            <LargeSearchInput
                                search={search}
                                setSearch={setSearch}
                                placeholderText="Takipçileri Ara"
                            />

                            {/* Takipçi Listesi */}
                            <div className="space-y-4">
                                {filteredFollowers.length === 0 ? (
                                    <div className="text-center py-10">
                                        <div className="flex justify-center mb-4">
                                            <BsPeopleFill className="text-6xl text-neutral-600" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-white mb-2">
                                            Henüz takipçin yok
                                        </h3>
                                        <p className="text-sm text-neutral-400">
                                            Paylaşımlarını artırarak takipçi
                                            kazanabilirsin.
                                        </p>
                                    </div>
                                ) : (
                                    allUsers.map((follower, index) => (
                                        <FollowerCard
                                            follower={follower}
                                            key={index}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FollowersPage;
