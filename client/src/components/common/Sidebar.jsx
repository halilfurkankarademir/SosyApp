import React, { useState, useEffect } from "react";
import { NavigationPanel } from "./";
import { NavigationPanelSkeleton } from "../../utils/SkeletonGenerator";
import useUserStore from "../../hooks/useUserStore";

const Sidebar = () => {
    const [loading, setLoading] = useState(true);
    const user = useUserStore((state) => state.user);

    useEffect(() => {
        // Kullanıcı verisi yüklendiğinde loading durumunu false yap
        if (user) {
            setLoading(false);
        }
    }, [user]);

    return (
        <div className="hidden md:block md:col-span-1 fixed">
            {loading ? <NavigationPanelSkeleton /> : <NavigationPanel />}
        </div>
    );
};

export default Sidebar;
