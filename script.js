// JS Logic for the THNS style mock Ecommerce.
document.addEventListener('DOMContentLoaded', () => {
    initSharedElements();
    updateCartUI();
    updateHeaderUser();
    startCountdown();
});

function initSharedElements() {
    const overlay = document.getElementById('overlay');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOpenBtn = document.getElementById('cartOpenBtn');
    const cartCloseBtn = document.getElementById('cartCloseBtn');

    if(cartOpenBtn) cartOpenBtn.addEventListener('click', () => { cartSidebar.classList.add('active'); overlay.classList.add('active'); });
    if(cartCloseBtn) cartCloseBtn.addEventListener('click', closeAllModals);
    if(overlay) overlay.addEventListener('click', closeAllModals);
    document.querySelectorAll('.modal-close').forEach(btn => btn.addEventListener('click', closeAllModals));

    const authBtn = document.getElementById('authBtn');
    const authModal = document.getElementById('authModal');
    if(authBtn) {
        authBtn.addEventListener('click', (e) => {
            if(currentUser) window.location.href = 'account.html';
            else { authModal.classList.add('active'); overlay.classList.add('active'); }
        });
    }

    const checkoutBtnMain = document.getElementById('checkoutBtnMain');
    const checkoutModal = document.getElementById('checkoutModal');
    if(checkoutBtnMain) {
        checkoutBtnMain.addEventListener('click', () => {
            if(cart.length === 0) { alert("Giỏ hàng rỗng!"); return; }
            if(!currentUser) {
                alert("Vui lòng đăng nhập trước khi thanh toán!");
                closeAllModals();
                if(authModal) { authModal.classList.add('active'); overlay.classList.add('active'); }
                return;
            }
            if(checkoutModal) {
                 cartSidebar.classList.remove('active');
                 checkoutModal.classList.add('active');
            } else {
                 mockCheckoutProcess();
            }
        });
    }

    const loginForm = document.getElementById('loginForm');
    if(loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('loginUser').value;
            currentUser = { username };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            closeAllModals();
            showToast("Đăng nhập thành công!");
            updateHeaderUser();
        });
    }
}

function mockCheckoutProcess() {
    const date = new Date().toLocaleDateString('vi-VN');
    const code = 'HN' + Math.floor(Math.random() * 1000000);
    let total = 0; cart.forEach(i => total += i.price * i.quantity);
    const order = { id: code, items: [...cart], total, date, status: 'Đang xử lý' };
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("ĐẶT HÀNG THÀNH CÔNG! Mã Bill: " + code);
    window.location.href = 'account.html';
}

function updateHeaderUser() {
    const authSpan = document.querySelector('#authBtn span');
    if(!authSpan) return;
    if(currentUser) authSpan.innerText = currentUser.username;
}

function closeAllModals() {
    document.querySelectorAll('.modal, .cart-sidebar, .overlay').forEach(el => el.classList.remove('active'));
}

function addToCart(productId) {
    const product = productsData.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);
    if (existing) existing.quantity += 1;
    else cart.push({ ...product, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    showToast(`Đã thêm vào giỏ hàng`);
}

function updateQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) cart = cart.filter(i => i.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function removeFromCart(productId) {
    cart = cart.filter(i => i.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const cartCountElem = document.getElementById('cartCount');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartTotalPriceElem = document.getElementById('cartTotalPrice');
    const checkoutBtnMain = document.getElementById('checkoutBtnMain');

    if(!cartCountElem || !cartItemsContainer) return;
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElem.innerText = totalItems;

    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <img src="${item.img}" alt="img">
            <div style="flex:1;">
                <div class="cart-item-info"><h4>${item.name}</h4><div class="text-red font-weight-bold" style="font-weight:700;">${formatCurrency(item.price)}</div></div>
                <div class="qty-control">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <div class="cart-item-remove" onclick="removeFromCart(${item.id})"><i class='bx bx-x'></i></div>
        `;
        cartItemsContainer.appendChild(div);
    });

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-center">Giỏ hàng rỗng.</p>';
        if(checkoutBtnMain) checkoutBtnMain.style.display = 'none';
        cartTotalPriceElem.innerText = '0đ';
    } else {
        if(checkoutBtnMain) checkoutBtnMain.style.display = 'block';
        cartTotalPriceElem.innerText = formatCurrency(totalPrice);
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    Object.assign(toast.style, {
        position: 'fixed', bottom: '20px', left: '20px', background: 'var(--text-main)', color: 'white',
        padding: '10px 20px', borderRadius: '4px', zIndex: '9999', boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
    });
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}

// Generate the high-density THNS card
function generateProductCard(p, isFlashSaleUI = false) {
    const badgeHtml = p.badge ? `<div class="badge-hot">${p.badge}</div>` : '';
    
    let specStr = '';
    if(p.category === 'cpu') specStr = `S-Core: ${p.specs.cores} | Xung: ${p.specs.boostClock}`;
    else if(p.category === 'vga') specStr = `VRAM: ${p.specs.vram}`;
    else if(p.category === 'ram') specStr = `Dung lượng: ${p.specs.capacity}`;
    else specStr = `Socket: ${p.specs.socket}`;

    let flashSaleBar = '';
    if(isFlashSaleUI) {
        const percent = Math.floor((p.sold / p.maxSale) * 100);
        flashSaleBar = `
            <div class="progress-bar-wrap">
                <div class="progress-bar-fill" style="width: ${percent}%;"></div>
                <div class="progress-bar-text">Đã bán ${p.sold}</div>
            </div>
        `;
    }

    return `
        <div class="product-card" onclick="window.location.href='product-detail.html?id=${p.id}'">
            ${badgeHtml}
            <div class="product-img-box">
                <img src="${p.img}" alt="${p.name}">
            </div>
            <div class="product-name">${p.name}</div>
            <div class="product-price">${formatCurrency(p.price)}</div>
            <div class="product-price-old">${formatCurrency(p.price * 1.15)}</div>
            <div class="product-specs">${specStr}</div>
            ${flashSaleBar}
        </div>
    `;
}

// Countdown timer
function startCountdown() {
    const hrsElem = document.getElementById('cd-hrs');
    const minsElem = document.getElementById('cd-mins');
    const secsElem = document.getElementById('cd-secs');
    
    if(!hrsElem) return; // Not on page with timer

    let totalSecs = 5 * 3600 + 30 * 60 + 12; // 05:30:12

    setInterval(() => {
        if(totalSecs <= 0) return;
        totalSecs--;
        const h = Math.floor(totalSecs / 3600);
        const m = Math.floor((totalSecs % 3600) / 60);
        const s = totalSecs % 60;
        hrsElem.innerText = h.toString().padStart(2, '0');
        minsElem.innerText = m.toString().padStart(2, '0');
        secsElem.innerText = s.toString().padStart(2, '0');
    }, 1000);
}
