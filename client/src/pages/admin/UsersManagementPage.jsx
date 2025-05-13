import { useState, useEffect, useCallback } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
    FiSearch,
    FiEye,
    FiEdit,
    FiUsers,
    FiShield,
    FiFileText,
    FiUserCheck,
} from "react-icons/fi";
import {
    getAllUsersForAdmin,
    updateUserRoleForAdmin,
} from "../../api/adminApi";
import { useNavigation } from "../../context/NavigationContext";
import { dateFormatter } from "../../utils/helpers";
import { ShowToast } from "../../components/ui/toasts/ShowToast";
import Modal from "react-modal";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDebounce } from "use-debounce";

const UsersManagementPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState("");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalUsersCount, setTotalUsersCount] = useState(0);
    const [debouncedSearch] = useDebounce(searchTerm, 300);

    const { navigateToPage } = useNavigation();

    const loadInitialUsers = useCallback(async () => {
        setIsLoading(true);
        setUsers([]);
        setPage(1);
        setHasMore(true);
        setTotalUsersCount(0);
        try {
            const response = await getAllUsersForAdmin(1, debouncedSearch);
            const fetchedUsers = response?.users || [];
            const fetchedCount = response?.count ?? 0;
            setUsers(fetchedUsers);
            setTotalUsersCount(fetchedCount);
            setPage(2);
            setHasMore(fetchedUsers.length < fetchedCount);
        } catch (error) {
            console.error("Error loading initial users:", error);
            setHasMore(false);
        } finally {
            setIsLoading(false);
        }
    }, [debouncedSearch]);

    useEffect(() => {
        const timer = setTimeout(() => {
            loadInitialUsers();
        }, 100); // Kısa bir gecikme ekleyerek state güncellemelerinin tamamlanmasını sağlıyoruz

        return () => clearTimeout(timer);
    }, [loadInitialUsers]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setIsLoading(true); // Arama başladığında loading'i aktif et
    };

    const fetchMoreUsers = useCallback(async () => {
        if (!hasMore || loading) {
            return;
        }

        setIsLoading(true);
        try {
            const response = await getAllUsersForAdmin(page, debouncedSearch);
            const newUsers = response?.users || [];
            const fetchedCount = response?.count ?? totalUsersCount;

            setUsers((prevUsers) => [...prevUsers, ...newUsers]);
            setTotalUsersCount(fetchedCount);

            const currentTotalLoaded = users.length + newUsers.length;
            setHasMore(currentTotalLoaded < fetchedCount);
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error("Error fetching more users:", error);
            setHasMore(false);
        } finally {
            setIsLoading(false);
        }
    }, [
        page,
        hasMore,
        loading,
        debouncedSearch,
        users.length,
        totalUsersCount,
    ]);

    const refreshUsers = useCallback(() => {
        loadInitialUsers();
    }, [loadInitialUsers]);

    useEffect(() => {
        loadInitialUsers();
        document.title = "Kullanıcı Yönetimi - Admin Panel";
    }, [loadInitialUsers]);

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setSelectedRole(user.role);
        setIsModalOpen(true);
    };

    const handleRoleUpdate = async () => {
        try {
            await updateUserRoleForAdmin(selectedUser.uid, selectedRole);
            refreshUsers();
            ShowToast("success", "Kullanıcı rolü başarıyla güncellendi");
            setIsModalOpen(false);
        } catch (error) {
            ShowToast("error", "Rol güncellenirken bir hata oluştu");
        }
    };

    // Rol renkleri ve metinleri
    const roleStyles = {
        admin: {
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            text: "Admin",
        },
        user: {
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            text: "Kullanıcı",
        },
    };

    const renderUsers = () => {
        if (loading && users.length === 0) {
            return (
                <div className="p-8 text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-neutral-600 border-t-pink-500 rounded-full mx-auto mb-4"></div>
                    <p className="text-neutral-400">
                        Kullanıcılar yükleniyor...
                    </p>
                </div>
            );
        }

        if (!loading && users.length === 0) {
            return (
                <div className="p-8 text-center text-neutral-400">
                    Aranan kriterlere uygun kullanıcı bulunamadı.
                </div>
            );
        }

        return (
            <div className="overflow-x-auto">
                <table className="w-full min-w-full">
                    <thead>
                        <tr className="border-b border-neutral-700 text-left text-neutral-400 text-sm bg-neutral-700/20">
                            <th className="py-3 px-4 font-medium">Kullanıcı</th>
                            <th className="py-3 px-4 font-medium">Rol</th>
                            <th className="py-3 px-4 font-medium">
                                İstatistikler
                            </th>
                            <th className="py-3 px-4 font-medium">Ip Adresi</th>
                            <th className="py-3 px-4 font-medium">Son Giriş</th>
                            <th className="py-3 px-4 font-medium">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user.uid}
                                className="border-b border-neutral-700 hover:bg-neutral-700/20"
                            >
                                <td className="py-3 px-4">
                                    <div className="flex items-center">
                                        <img
                                            className="w-10 h-10 rounded-full mr-2 object-cover"
                                            src={user.profilePicture}
                                            alt="Profil Resmi"
                                        />
                                        <div>
                                            <div className="text-white">
                                                {user.firstName} {user.lastName}
                                            </div>
                                            <div className="text-neutral-400 text-sm">
                                                @{user.username}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-3 px-4">
                                    <span
                                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                                            roleStyles[user.role].bg
                                        } ${roleStyles[user.role].color}`}
                                    >
                                        {roleStyles[user.role].text}
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-neutral-300">
                                    <div className="flex flex-col text-sm">
                                        <span className="mb-1">
                                            <span className="font-medium text-pink-500">
                                                {user.Followers.length}
                                            </span>{" "}
                                            takipçi
                                        </span>
                                        <span className="mb-1">
                                            <span className="font-medium text-blue-500">
                                                {user.Following.length}
                                            </span>{" "}
                                            takip edilen
                                        </span>
                                        <span>
                                            <span className="font-medium text-green-500">
                                                {user.posts.length}
                                            </span>{" "}
                                            gönderi
                                        </span>
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-neutral-300">
                                    {user.ipAdress || "Bilinmiyor"}
                                </td>
                                <td className="py-3 px-4 text-neutral-300">
                                    {dateFormatter(user.lastLoginAt)}
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex gap-2">
                                        <button
                                            className="text-white hover:text-blue-500 p-1"
                                            title="Profili Görüntüle"
                                            onClick={() =>
                                                navigateToPage(
                                                    `profile/${user.username}`
                                                )
                                            }
                                        >
                                            <FiEye />
                                        </button>
                                        <button
                                            className="text-white hover:text-red-500 p-1"
                                            title="Kullanıcıyı Düzenle"
                                            onClick={() =>
                                                handleEditClick(user)
                                            }
                                        >
                                            <FiEdit />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold text-white">
                    Kullanıcı Yönetimi
                </h1>

                <div className="flex gap-2">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Kullanıcı ara..."
                            className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white pr-10 focus:outline-none focus:border-pink-500"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <FiSearch className="absolute right-3 top-2.5 text-neutral-500" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                        <FiUsers className="text-xl text-pink-500" />
                        <div>
                            <h3 className="text-sm text-neutral-400">
                                Toplam Kullanıcı
                            </h3>
                            <p className="text-lg font-medium text-white">
                                {totalUsersCount}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                        <FiShield className="text-xl text-purple-500" />
                        <div>
                            <h3 className="text-sm text-neutral-400">Admin</h3>
                            <p className="text-lg font-medium text-white">
                                {
                                    users.filter(
                                        (user) => user.role === "admin"
                                    ).length
                                }
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                        <FiFileText className="text-xl text-blue-500" />
                        <div>
                            <h3 className="text-sm text-neutral-400">
                                Toplam Gönderi
                            </h3>
                            <p className="text-lg font-medium text-white">
                                {users.reduce(
                                    (acc, user) =>
                                        acc + (user.posts?.length || 0),
                                    0
                                )}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                        <FiUserCheck className="text-xl text-green-500" />
                        <div>
                            <h3 className="text-sm text-neutral-400">
                                Onaylı Kullanıcı
                            </h3>
                            <p className="text-lg font-medium text-white">
                                {users.filter((user) => user.verified).length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-neutral-800 rounded-xl border border-neutral-700/50 overflow-hidden">
                <InfiniteScroll
                    dataLength={users.length}
                    next={fetchMoreUsers}
                    hasMore={hasMore}
                    loader={
                        loading && users.length > 0 ? (
                            <div className="p-4 text-center">
                                <div className="animate-spin w-6 h-6 border-4 border-neutral-600 border-t-pink-500 rounded-full mx-auto"></div>
                            </div>
                        ) : null
                    }
                    endMessage={
                        !hasMore && users.length > 0 ? (
                            <p className="text-center text-neutral-400 py-4">
                                Başka kullanıcı bulunmamaktadır.
                            </p>
                        ) : null
                    }
                >
                    {renderUsers()}
                </InfiniteScroll>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                className="fixed inset-0 flex items-center justify-center z-50"
                overlayClassName="fixed inset-0 backdrop-blur-sm bg-black/30"
            >
                <div className="bg-neutral-800/90 backdrop-blur-md p-6 rounded-xl w-96 border border-neutral-700/50">
                    <h2 className="text-xl font-bold text-white mb-4">
                        Kullanıcı Rolünü Düzenle
                    </h2>
                    <div className="mb-4">
                        <label className="block text-neutral-300 mb-2">
                            Kullanıcı
                        </label>
                        <div className="text-white">
                            {selectedUser?.firstName} {selectedUser?.lastName}{" "}
                            (@{selectedUser?.username})
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-neutral-300 mb-2">
                            Rol
                        </label>
                        <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-pink-500"
                        >
                            <option value="user">Kullanıcı</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 text-neutral-300 hover:text-white"
                        >
                            İptal
                        </button>
                        <button
                            onClick={handleRoleUpdate}
                            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
                        >
                            Kaydet
                        </button>
                    </div>
                </div>
            </Modal>
        </AdminLayout>
    );
};

export default UsersManagementPage;
