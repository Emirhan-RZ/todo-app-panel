export const createTodoItem = (id, text, priority, name, email, phone) => {
    return {
        id: id,
        text: text, 
        name: name, 
        email: email,
        phone: phone,
        priority: priority, 
        isCompleted: false,
        createdAt: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })
    };
};


export const DEFAULT_DATA = [
    {
        id: 1,
        text: "React Projesi Teslimi",
        name: "Ahmet Yılmaz",
        email: "ahmet@ornek.com",
        phone: "0555 111 22 33",
        priority: "High",
        isCompleted: false,
        createdAt: "9 Şubat 20:52"
    },
    {
        id: 2,
        text: "Müşteri Toplantısı",
        name: "Ayşe Demir",
        email: "ayse@sirket.com",
        phone: "0532 999 88 77",
        priority: "Medium",
        isCompleted: true, 
        createdAt: "8 Şubat 14:30"
    },
    {
        id: 3,
        text: "Sunucu Bakımı",
        name: "Mehmet Öz",
        email: "mehmet@teknik.com",
        phone: "0505 123 45 67",
        priority: "Low",
        isCompleted: false,
        createdAt: "9 Şubat 09:15"
    }
];