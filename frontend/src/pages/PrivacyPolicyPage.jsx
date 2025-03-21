import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const PrivacyPolicyPage = () => {
    return (
        <>
            <Navbar isInAppPage={false} />
            <div className="flex min-h-screen justify-center bg-neutral-900 pt-28 md:pt-36 pb-16 md:pb-20 px-4 md:px-6">
                <div className="w-full max-w-4xl bg-neutral-800 rounded-xl p-4 md:p-8 text-white shadow-xl border border-neutral-700">
                    <h1
                        className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center"
                        style={{ color: "#f986f3" }}
                    >
                        Gizlilik Politikası
                    </h1>

                    <div className="space-y-4 md:space-y-6 text-neutral-300 text-sm md:text-base">
                        <section>
                            <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-white">
                                1. Topladığımız Bilgiler
                            </h2>
                            <p>
                                SosyApp olarak, aşağıdaki kişisel bilgileri
                                topluyoruz:
                            </p>
                            <ul className="list-disc ml-4 md:ml-6 mt-1 md:mt-2 space-y-0.5 md:space-y-1">
                                <li>
                                    Ad, soyad ve kullanıcı adı gibi hesap
                                    bilgileri
                                </li>
                                <li>E-posta adresi ve iletişim bilgileri</li>
                                <li>Profil fotoğrafı ve biyografi</li>
                                <li>Paylaştığınız içerikler ve etkileşimler</li>
                                <li>Konum verisi (isteğe bağlı)</li>
                                <li>Cihaz ve bağlantı bilgileri</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-white">
                                2. Bilgileri Kullanma Amacımız
                            </h2>
                            <p>
                                Topladığımız bilgileri aşağıdaki amaçlarla
                                kullanıyoruz:
                            </p>
                            <ul className="list-disc ml-4 md:ml-6 mt-1 md:mt-2 space-y-0.5 md:space-y-1">
                                <li>Hizmetlerimizi sunmak ve geliştirmek</li>
                                <li>Hesabınızı ve içeriğinizi yönetmek</li>
                                <li>Size özel içerik ve öneri sunmak</li>
                                <li>
                                    İletişim kurmak ve bildirimler göndermek
                                </li>
                                <li>
                                    Güvenliği sağlamak ve dolandırıcılığı
                                    önlemek
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-white">
                                3. Bilgilerin Paylaşımı
                            </h2>
                            <p>
                                Kişisel bilgilerinizi aşağıdaki durumlar dışında
                                üçüncü taraflarla paylaşmıyoruz:
                            </p>
                            <ul className="list-disc ml-4 md:ml-6 mt-1 md:mt-2 space-y-0.5 md:space-y-1">
                                <li>İzniniz olduğunda</li>
                                <li>Yasal gereklilikler doğrultusunda</li>
                                <li>
                                    Hizmet sağlayıcılarımızla (veri depolama,
                                    analiz gibi)
                                </li>
                                <li>
                                    Şirket satın alımı veya birleşmesi durumunda
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-white">
                                4. Veri Güvenliği
                            </h2>
                            <p>
                                Bilgilerinizi korumak için teknik ve
                                organizasyonel önlemler uyguluyoruz. Ancak
                                hiçbir internet iletimi veya elektronik depolama
                                yöntemi %100 güvenli değildir. Bilgilerinizi
                                korumak için elimizden geleni yapsak da, mutlak
                                güvenliği garanti edemeyiz.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-white">
                                5. Haklarınız
                            </h2>
                            <p>
                                Kişisel verilerinizle ilgili aşağıdaki haklara
                                sahipsiniz:
                            </p>
                            <ul className="list-disc ml-4 md:ml-6 mt-1 md:mt-2 space-y-0.5 md:space-y-1">
                                <li>Verilerinize erişim talep etme</li>
                                <li>Verilerinizin düzeltilmesini talep etme</li>
                                <li>Verilerinizin silinmesini talep etme</li>
                                <li>Veri işlemeye itiraz etme</li>
                                <li>Veri taşınabilirliği talep etme</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-white">
                                6. Politika Değişiklikleri
                            </h2>
                            <p>
                                Bu gizlilik politikasını zaman zaman
                                güncelleyebiliriz. Önemli değişiklikler
                                olduğunda, sizi e-posta veya platformdaki
                                bildirimler aracılığıyla bilgilendireceğiz.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-white">
                                7. İletişim
                            </h2>
                            <p>
                                Bu gizlilik politikası hakkında sorularınız
                                varsa, lütfen
                                <a
                                    href="mailto:info@sosyapp.com"
                                    className="text-pink-500 hover:underline ml-1"
                                >
                                    info@sosyapp.com
                                </a>
                                adresinden bizimle iletişime geçin.
                            </p>
                        </section>
                    </div>

                    <div className="mt-6 md:mt-8 text-center text-xs md:text-sm text-neutral-400">
                        Son güncelleme: 20 Mart 2024
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrivacyPolicyPage;
