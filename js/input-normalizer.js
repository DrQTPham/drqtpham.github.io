/**
 * Input Normalizer - Hỗ trợ nhập số thập phân với cả dấu phẩy (,) và dấu chấm (.)
 * Tự động chuyển đổi dấu phẩy thành dấu chấm để JavaScript có thể parse
 */

// Normalize decimal input - chuyển dấu phẩy thành dấu chấm
function normalizeDecimalInput(value) {
    if (typeof value === 'string') {
        // Thay thế dấu phẩy bằng dấu chấm
        return value.replace(/,/g, '.');
    }
    return value;
}

// Parse float với hỗ trợ cả dấu phẩy
function parseFloatFlexible(value) {
    const normalized = normalizeDecimalInput(value);
    return parseFloat(normalized);
}

// Parse int với hỗ trợ cả dấu phẩy (loại bỏ phần thập phân)
function parseIntFlexible(value) {
    const normalized = normalizeDecimalInput(value);
    return parseInt(normalized);
}

// Thêm event listener cho tất cả input type="number" để tự động normalize
document.addEventListener('DOMContentLoaded', () => {
    // Tìm tất cả input type="number"
    const numberInputs = document.querySelectorAll('input[type="number"]');
    
    numberInputs.forEach(input => {
        // Khi người dùng nhập xong (blur event)
        input.addEventListener('blur', (e) => {
            const value = e.target.value;
            if (value && value.includes(',')) {
                // Chuyển dấu phẩy thành dấu chấm
                e.target.value = normalizeDecimalInput(value);
                
                // Hiển thị tooltip nhỏ để người dùng biết
                showDecimalHint(e.target);
            }
        });
        
        // Cho phép nhập dấu phẩy khi typing
        input.addEventListener('keypress', (e) => {
            // Cho phép dấu phẩy (keyCode 44)
            if (e.key === ',') {
                // Không block, để người dùng nhập được
                return true;
            }
        });
    });
    
    console.log(`✅ Input normalizer initialized for ${numberInputs.length} number inputs`);
});

// Hiển thị hint nhỏ khi tự động chuyển đổi
function showDecimalHint(inputElement) {
    // Tạo tooltip nhỏ
    const hint = document.createElement('div');
    hint.textContent = '✓ Đã chuyển , → .';
    hint.style.cssText = `
        position: absolute;
        background: #4caf50;
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.75rem;
        z-index: 1000;
        pointer-events: none;
        animation: fadeInOut 2s ease-in-out;
    `;
    
    // Thêm animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(-5px); }
            20% { opacity: 1; transform: translateY(0); }
            80% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-5px); }
        }
    `;
    document.head.appendChild(style);
    
    // Đặt vị trí
    const rect = inputElement.getBoundingClientRect();
    hint.style.left = `${rect.left}px`;
    hint.style.top = `${rect.bottom + 5}px`;
    
    document.body.appendChild(hint);
    
    // Tự động xóa sau 2 giây
    setTimeout(() => {
        hint.remove();
    }, 2000);
}

// Export functions để sử dụng trong các file khác
window.normalizeDecimalInput = normalizeDecimalInput;
window.parseFloatFlexible = parseFloatFlexible;
window.parseIntFlexible = parseIntFlexible;

console.log('✅ Input Normalizer loaded - Hỗ trợ cả dấu phẩy (,) và dấu chấm (.)');
