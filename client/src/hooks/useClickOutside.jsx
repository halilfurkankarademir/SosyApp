import { useEffect } from "react";

function useClickOutside(ref, handler, buttonRef = null) {
    useEffect(() => {
        const listener = (event) => {
            // Ref nesnesi yoksa veya tıklanan element ref'in içindeyse hiçbir şey yapma
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }

            // Eğer buttonRef sağlanmışsa ve tıklanan element buttonRef'in içindeyse hiçbir şey yapma
            if (
                buttonRef &&
                buttonRef.current &&
                buttonRef.current.contains(event.target)
            ) {
                return;
            }

            // Yukarıdaki kontrollerden geçilirse, dışarı tıklanmıştır, handler'ı çağır
            handler(event);
        };

        // Olay dinleyicilerini ekle ('mousedown' genellikle 'click'ten daha iyidir,
        // çünkü eleman DOM'dan kaldırılmadan önce tetiklenir)
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener); // Mobil cihazlar için

        // Cleanup fonksiyonu: component unmount olduğunda dinleyicileri kaldır
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler, buttonRef]); // Effect'in bağımlılıkları
}

export default useClickOutside;
