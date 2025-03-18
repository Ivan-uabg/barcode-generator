function checkContainer() {
    const container = document.querySelector('.barcode-list-container');
    const barcodeList = document.getElementById('barcodeList');
    const button = document.querySelector('.print-button');
    if (barcodeList.children.length === 0) {
        container.style.display = 'none'; // Скрываем контейнер, если он пуст
        button.style.display = 'none'; 
    } else {
        container.style.display = 'block'; // Показываем контейнер, если он не пуст
        button.style.display = 'block'; 
    }
}

function addBarcode() {
    const input = document.getElementById('barcodeInput').value;
    const barcodeList = document.getElementById('barcodeList');

    if (input) {
        // Создаем контейнер для нового штрих-кода
        const barcodeItem = document.createElement('div');
        barcodeItem.classList.add('barcode-item');

        // Создаем SVG для штрих-кода
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        JsBarcode(svg, input, {
            format: "CODE128", // Формат штрих-кода
            displayValue: true, // Показывать текст под штрих-кодом
            fontSize: 16,
            lineColor: "#000",
            width: 2,
            height: 100,
        });

        // Добавляем SVG в контейнер
        barcodeItem.appendChild(svg);
        barcodeList.appendChild(barcodeItem);

        // Очищаем поле ввода
        document.getElementById('barcodeInput').value = '';

        // Проверяем контейнер после добавления
        checkContainer();
    } else {
        alert("Пожалуйста, введите текст для штрих-кода!");
    }
}

function printBarcodes() {
    const barcodeList = document.getElementById('barcodeList');
    if (barcodeList.children.length === 0) {
        alert("Сначала добавьте штрих-коды!");
    } else {
        window.print(); // Открываем диалог печати
    }
}

document.addEventListener('DOMContentLoaded', function () {
    checkContainer(); // Проверяем контейнер при загрузке страницы
});