import React, { memo, useEffect } from "react";
import { Accordion, AccordionItem } from "@heroui/accordion";

/**
 * Gizlilik politikası sayfası (Geliştirilmiş Akordeon UI)
 */
const PrivacyPolicyPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className="min-h-screen bg-neutral-900 text-white p-6 md:p-12 lg:p-16">
                <div className="container mx-auto px-4 py-12">
                    <h1 className="text-3xl font-bold mb-8 0 text-center">
                        Gizlilik Politikası
                    </h1>

                    {/* Accordion container'ına öğeler arasına boşluk ekleyelim */}
                    <Accordion variant="light" className="space-y-3">
                        {" "}
                        {/* space-y-3 veya space-y-4 */}
                        {/* Her AccordionItem'a belirgin stil sınıfları ekleyelim */}
                        <AccordionItem key="item-1" title="1. Giriş">
                            <p className="text-gray-300 pt-2 pb-4 px-4">
                                {" "}
                                {/* İçeriğe padding ekleyelim */}
                                SosyApp olarak gizliliğinize saygı duyuyoruz. Bu
                                Gizlilik Politikası, hizmetlerimizi kullanırken
                                kişisel verilerinizi nasıl topladığımızı,
                                kullandığımızı ve paylaştığımızı açıklar.
                            </p>
                        </AccordionItem>
                        <AccordionItem
                            key="item-2"
                            title="2. Topladığımız Bilgiler"
                        >
                            <div className="pt-2 pb-4 px-4">
                                {" "}
                                {/* İçeriğe padding ekleyelim */}
                                <p className="text-gray-300">
                                    Aşağıdaki bilgileri toplayabiliriz:
                                </p>
                                <ul className="list-disc pl-6 mt-2 text-gray-300 space-y-2">
                                    <li>
                                        Adınız, e-posta adresiniz, kullanıcı
                                        adınız gibi hesap bilgileri
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
                            </div>
                        </AccordionItem>
                        <AccordionItem
                            key="item-3"
                            title="3. Bilgilerinizi Nasıl Kullanıyoruz"
                        >
                            <div className="pt-2 pb-4 px-4">
                                <p className="text-gray-300">
                                    Topladığımız bilgileri şu amaçlarla
                                    kullanırız:
                                </p>
                                <ul className="list-disc pl-6 mt-2 text-gray-300 space-y-2">
                                    <li>
                                        Hizmetlerimizi sağlamak ve iyileştirmek
                                    </li>
                                    <li>
                                        Hesabınızı yönetmek ve güvenliğini
                                        sağlamak
                                    </li>
                                    <li>Sizinle iletişim kurmak</li>
                                    <li>
                                        Kişiselleştirilmiş içerik ve öneriler
                                        sunmak
                                    </li>
                                    <li>
                                        Yasal yükümlülüklerimizi yerine getirmek
                                    </li>
                                </ul>
                            </div>
                        </AccordionItem>
                        <AccordionItem
                            key="item-4"
                            title="4. Bilgilerinizin Paylaşılması"
                        >
                            <div className="pt-2 pb-4 px-4">
                                <p className="text-gray-300">
                                    Bilgilerinizi şu durumlarda paylaşabiliriz:
                                </p>
                                <ul className="list-disc pl-6 mt-2 text-gray-300 space-y-2">
                                    <li>Yasal zorunluluk durumunda</li>
                                    <li>
                                        Hizmet sağlayıcılarımızla (veri
                                        depolama, analiz gibi)
                                    </li>
                                    <li>
                                        İzniniz olduğunda diğer kullanıcılarla
                                    </li>
                                </ul>
                            </div>
                        </AccordionItem>
                        <AccordionItem
                            key="item-5"
                            title="5. Bilgilerinizin Güvenliği"
                        >
                            <p className="text-gray-300 pt-2 pb-4 px-4">
                                Bilgilerinizi korumak için teknik ve
                                organizasyonel önlemler alıyoruz. Ancak hiçbir
                                güvenlik sistemi %100 güvenli değildir ve bunu
                                garanti edemeyiz.
                            </p>
                        </AccordionItem>
                        <AccordionItem key="item-6" title="6. Haklarınız">
                            <div className="pt-2 pb-4 px-4">
                                <p className="text-gray-300">
                                    Kişisel verilerinizle ilgili şu haklara
                                    sahipsiniz:
                                </p>
                                <ul className="list-disc pl-6 mt-2 text-gray-300 space-y-2">
                                    <li>
                                        Verilerinize erişim ve düzeltme hakkı
                                    </li>
                                    <li>
                                        Verilerinizin silinmesini talep etme
                                        hakkı
                                    </li>
                                    <li>Veri işlemeyi kısıtlama hakkı</li>
                                    <li>Verilerinizin taşınabilirliği hakkı</li>
                                    <li>İtiraz etme hakkı</li>
                                </ul>
                            </div>
                        </AccordionItem>
                        <AccordionItem key="item-7" title="7. Değişiklikler">
                            <p className="text-gray-300 pt-2 pb-4 px-4">
                                Bu Gizlilik Politikasını zaman zaman
                                güncelleyebiliriz. Önemli değişiklikler
                                olduğunda sizi bilgilendireceğiz.
                            </p>
                        </AccordionItem>
                        <AccordionItem key="item-8" title="8. İletişim">
                            <p className="text-gray-300 pt-2 pb-4 px-4">
                                Sorularınız veya endişeleriniz için lütfen{" "}
                                <span className="text-pink-400">
                                    info@sosyapp.com
                                </span>
                                adresinden bizimle iletişime geçin.
                            </p>
                        </AccordionItem>
                    </Accordion>

                    <div className="mt-12 text-center text-gray-400 text-sm">
                        <p>Son güncelleme: 1 Mart 2024</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default memo(PrivacyPolicyPage);
