import React, { useEffect, useState } from "react";
import { Sidebar } from "../../components/common";
import { BsPeopleFill } from "react-icons/bs";
import LargeSearchInput from "../../components/ui/inputs/LargeSearchInput";
import { useDebounce } from "use-debounce";
import { getCurrentUser } from "../../api/userApi";
import FollowerCard from "../../components/ui/cards/FollowerCard";
import useUserStore from "../../hooks/useUserStore";
import { getFollowers } from "../../api/followApi";
import { Spinner } from "@heroui/react";

const FollowersPage = () => {
    const [search, setSearch] = useState("");
    const [debouncedSearch] = useDebounce(search, 300);
    const [allFollowers, setAllFollowers] = useState([]);

    const setUser = useUserStore((state) => state.setUser);

    const filteredFollowers = allFollowers.filter((follower) => {
        const followerData = follower.FollowerUser;
        return (
            followerData.username
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase().trim()) ||
            followerData.firstName
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase().trim()) ||
            followerData.lastName
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase().trim())
        );
    });

    const fetchData = async () => {
        try {
            const followers = await getFollowers();
            const user = await getCurrentUser();
            setUser(user);
            setAllFollowers(followers);
        } catch (error) {
            console.log("Error fetching followers:", error);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Takipçilerim";
        fetchData();
    }, []);

    return (
        <>
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

                            {!filteredFollowers && <Spinner />}

                            {/* Takipçi Listesi */}
                            {filteredFollowers.map((follower, index) => (
                                <FollowerCard
                                    follower={follower.FollowerUser}
                                    key={index}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FollowersPage;
