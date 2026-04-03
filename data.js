const productsData = [
    { id: 1, name: 'Intel Core i9-14900K', brand: 'Intel', price: 16500000, category: 'cpu', img: 'assets/images/cpu.png', badge: 'HOT', specs: { cores: 24, threads: 32, baseClock: '3.2 GHz', boostClock: '6.0 GHz' }, desc: 'Vi xử lý cực mạnh dành cho game thủ hardcore và creators.', sold: 12, maxSale: 50, isFlashSale: true },
    { id: 2, name: 'Intel Core i5-13600K', brand: 'Intel', price: 7900000, category: 'cpu', img: 'assets/images/cpu.png', badge: 'BEST SELLER', specs: { cores: 14, threads: 20, baseClock: '3.5 GHz', boostClock: '5.1 GHz' }, desc: 'CPU quốc dân với p/p tốt nhất hiện nay.', sold: 400, maxSale: 500, isFlashSale: false  },
    { id: 3, name: 'AMD Ryzen 9 7950X3D', brand: 'AMD', price: 18200000, category: 'cpu', img: 'assets/images/cpu.png', badge: '', specs: { cores: 16, threads: 32, baseClock: '4.2 GHz', boostClock: '5.7 GHz' }, desc: 'Cỗ máy chơi game đỉnh cao có tích hợp công nghệ V-Cache 3D.', sold: 5, maxSale: 20, isFlashSale: true  },
    { id: 4, name: 'NVIDIA GeForce RTX 5090 24GB', brand: 'NVIDIA', price: 54000000, category: 'vga', img: 'assets/images/gpu.png', badge: 'NEW', specs: { vram: '24GB GDDR7', cores: 21504, boost: '2.9 GHz' }, desc: 'Vua hiệu năng đồ họa trong năm 2026. Chấp mọi thể loại game 4K/8K.', sold: 2, maxSale: 10, isFlashSale: false  },
    { id: 5, name: 'ASUS ROG Strix RTX 4080 Super', brand: 'ASUS', price: 32000000, category: 'vga', img: 'assets/images/gpu.png', badge: 'SALE -10%', specs: { vram: '16GB GDDR6X', cores: 10240, boost: '2.6 GHz' }, desc: 'Thiết kế đẹp mắt kết hợp khả năng xử lý hoàn hảo cho 1440p và 4K.', sold: 35, maxSale: 40, isFlashSale: true  },
    { id: 6, name: 'Corsair Dominator Titanium 64GB DDR5', brand: 'Corsair', price: 12500000, category: 'ram', img: 'assets/images/ram.png', badge: '', specs: { capacity: '64GB (2x32GB)', speed: '6000MHz', cas: 'CL30' }, desc: 'RAM cao cấp với hệ thống tản nhiệt độc quyền.', sold: 120, maxSale: 200, isFlashSale: false  },
    { id: 7, name: 'G.Skill Trident Z5 RGB 32GB DDR5', brand: 'G.Skill', price: 3800000, category: 'ram', img: 'assets/images/ram.png', badge: 'SALE -15%', specs: { capacity: '32GB (2x16GB)', speed: '6400MHz', cas: 'CL32' }, desc: 'Ánh sáng mượt mà cùng hiệu suất cực ổn định cho hệ thống.', sold: 98, maxSale: 100, isFlashSale: true  },
    { id: 8, name: 'ASUS ROG MAXIMUS Z790 HERO', brand: 'ASUS', price: 15900000, category: 'mb', img: 'assets/images/hero.png', badge: 'HOT', specs: { socket: 'LGA1700', chipset: 'Z790', formFactor: 'ATX' }, desc: 'Mainboard cao cấp hỗ trợ hệ sinh thái lớn của ASUS.', sold: 24, maxSale: 50, isFlashSale: false  },
    { id: 9, name: 'MSI MPG B760I EDGE WIFI', brand: 'MSI', price: 5600000, category: 'mb', img: 'assets/images/hero.png', badge: '', specs: { socket: 'LGA1700', chipset: 'B760', formFactor: 'Mini-ITX' }, desc: 'Giải pháp hoàn hảo cho các bộ máy nhỏ gọn SFF.', sold: 40, maxSale: 50, isFlashSale: false  }
];

const formatCurrency = (number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);

// Data Management
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];
