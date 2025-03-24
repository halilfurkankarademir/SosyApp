import React, { memo, useEffect } from "react";
import Navbar from "../../components/common/Navbar";

/**
 * Gizlilik politikası sayfası
 * Kullanıcıların kişisel verilerinin nasıl işlendiğini açıklar
 */
const PrivacyPolicyPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-neutral-900 text-white p-20">
                <div className="container mx-auto px-4 py-12">
                    <h1 className="text-3xl font-bold mb-8 text-pink-500">
                        Gizlilik Politikası
                    </h1>

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">
                                1. Giriş
                            </h2>
                            <p className="text-gray-300">
                                SosyApp olarak gizliliğinize saygı duyuyoruz. Bu
                                Gizlilik Politikası, hizmetlerimizi kullanırken
                                kişisel verilerinizi nasıl topladığımızı,
                                kullandığımızı ve paylaştığımızı açıklar.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">
                                2. Topladığımız Bilgiler
                            </h2>
                            <p className="text-gray-300">
                                Aşağıdaki bilgileri toplayabiliriz:
                            </p>
                            <ul className="list-disc pl-6 mt-2 text-gray-300 space-y-2">
                                <li>
                                    Adınız, e-posta adresiniz, kullanıcı adınız
                                    gibi hesap bilgileri
                                </li>
                                <li>
                                    Profil resminiz ve diğer paylaştığınız
                                    içerikler
                                </li>
                                <li>Cihaz bilgileri ve IP adresi</li>
                                <li>
                                    Uygulama içi etkinlikleriniz ve
                                    tercihleriniz
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">
                                3. Bilgilerinizi Nasıl Kullanıyoruz
                            </h2>
                            <p className="text-gray-300">
                                Topladığımız bilgileri şu amaçlarla kullanırız:
                            </p>
                            <ul className="list-disc pl-6 mt-2 text-gray-300 space-y-2">
                                <li>Hizmetlerimizi sağlamak ve iyileştirmek</li>
                                <li>
                                    Hesabınızı yönetmek ve güvenliğini sağlamak
                                </li>
                                <li>Sizinle iletişim kurmak</li>
                                <li>
                                    Kişiselleştirilmiş içerik ve öneriler sunmak
                                </li>
                                <li>
                                    Yasal yükümlülüklerimizi yerine getirmek
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">
                                4. Bilgilerinizin Paylaşılması
                            </h2>
                            <p className="text-gray-300">
                                Bilgilerinizi şu durumlarda paylaşabiliriz:
                            </p>
                            <ul className="list-disc pl-6 mt-2 text-gray-300 space-y-2">
                                <li>Yasal zorunluluk durumunda</li>
                                <li>
                                    Hizmet sağlayıcılarımızla (veri depolama,
                                    analiz gibi)
                                </li>
                                <li>İzniniz olduğunda diğer kullanıcılarla</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">
                                5. Bilgilerinizin Güvenliği
                            </h2>
                            <p className="text-gray-300">
                                Bilgilerinizi korumak için teknik ve
                                organizasyonel önlemler alıyoruz. Ancak hiçbir
                                güvenlik sistemi %100 güvenli değildir ve bunu
                                garanti edemeyiz.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">
                                6. Haklarınız
                            </h2>
                            <p className="text-gray-300">
                                Kişisel verilerinizle ilgili şu haklara
                                sahipsiniz:
                            </p>
                            <ul className="list-disc pl-6 mt-2 text-gray-300 space-y-2">
                                <li>Verilerinize erişim ve düzeltme hakkı</li>
                                <li>
                                    Verilerinizin silinmesini talep etme hakkı
                                </li>
                                <li>Veri işlemeyi kısıtlama hakkı</li>
                                <li>Verilerinizin taşınabilirliği hakkı</li>
                                <li>İtiraz etme hakkı</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">
                                7. Değişiklikler
                            </h2>
                            <p className="text-gray-300">
                                Bu Gizlilik Politikasını zaman zaman
                                güncelleyebiliriz. Önemli değişiklikler
                                olduğunda sizi bilgilendireceğiz.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">
                                8. İletişim
                            </h2>
                            <p className="text-gray-300">
                                Sorularınız veya endişeleriniz için lütfen{" "}
                                <span className="text-pink-400">
                                    info@sosyapp.com
                                </span>
                                adresinden bizimle iletişime geçin.
                            </p>
                        </section>
                    </div>

                    <div className="mt-12 text-center text-gray-400 text-sm">
                        <p>Son güncelleme: 1 Mart 2024</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default memo(PrivacyPolicyPage);
