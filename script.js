// دالة لتوليد الجدول للأيام الـ31
function generateTable() {
    const table = document.getElementById('work-hours-table');
    for (let i = 1; i <= 31; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>اليوم ${i}</td>
            <td><input type="time" class="check-in"></td>
            <td><input type="time" class="check-out"></td>
            <td class="daily-hours">0</td>
        `;
        table.appendChild(row);
    }
}

// دالة لحساب الساعات اليومية تلقائيا
function calculateDailyHours() {
    const rows = document.querySelectorAll('#work-hours-table tr');
    rows.forEach(row => {
        const checkIn = row.querySelector('.check-in').value;
        const checkOut = row.querySelector('.check-out').value;
        if (checkIn && checkOut) {
            const [inHours, inMinutes] = checkIn.split(':').map(Number);
            const [outHours, outMinutes] = checkOut.split(':').map(Number);
            let totalHours = outHours - inHours;
            let totalMinutes = outMinutes - inMinutes;
            if (totalMinutes < 0) {
                totalMinutes += 60;
                totalHours -= 1;
            }
            row.querySelector('.daily-hours').innerText = (totalHours + totalMinutes / 60).toFixed(2);
        }
    });
}

// دالة لحساب إجمالي الساعات لجميع الأيام
function calculateTotalHours() {
    calculateDailyHours();
    const rows = document.querySelectorAll('#work-hours-table tr');
    let total = 0;
    rows.forEach(row => {
        const dailyHours = parseFloat(row.querySelector('.daily-hours').innerText);
        if (!isNaN(dailyHours)) {
            total += dailyHours;
        }
    });
    document.getElementById('total-hours').innerText = total.toFixed(2);
}

// دالة لإعادة تعيين الجدول
function resetTable() {
    const rows = document.querySelectorAll('#work-hours-table tr');
    rows.forEach(row => {
        row.querySelector('.check-in').value = '';
        row.querySelector('.check-out').value = '';
        row.querySelector('.daily-hours').innerText = '0';
    });
    document.getElementById('total-hours').innerText = '0';
}

// إضافة مستمعات للأحداث للحقول لحساب الساعات تلقائياً عند إدخال الأوقات
document.addEventListener('input', calculateDailyHours);

// توليد الجدول عند تحميل الصفحة
window.onload = generateTable;
