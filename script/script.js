const printButton = document.querySelector('.print-button');
const container = document.querySelector('.barcode-list-container');
const barcodeList = document.getElementById('barcodeList');
const barcodeInput = document.getElementById('barcodeInput');
const errorMessage = document.querySelector('.error-message');

const createIterator = () => {
    let i = 0;
    return {
        next: () => i++,
        reset: () => i = 0,
    };
};

const iterator = createIterator();

function checkContainer(parent, child) {
    
    
    if (child.children.length === 0) {
        parent.style.display = 'none'; // Скрываем контейнер, если он пуст
        printButton.style.display = 'none'; 
    } else {
        parent.style.display = 'block'; // Показываем контейнер, если он не пуст
        printButton.style.display = 'block'; 
    }
}

function addBarcode() {
    const input = barcodeInput.value;
    const barcodeList = document.getElementById('barcodeList');
    const regex = /^[\x00-\x7F]+$/;
    
    console.log(`Input length = ${input.length}`);
    
    if (regex.test(input) && input.length <= 30) {
        // Создаем контейнер для нового штрих-кода
        const barcodeItem = document.createElement('div');
        const deleteButton = document.createElement('button');
        const imgDelete = document.createElement('img');

        imgDelete.setAttribute('src', 'img/delete.png');
        imgDelete.setAttribute('alt', 'X');
        imgDelete.classList.add('img-delete');
        barcodeItem.classList.add('barcode-item', `barcode-item-${iterator.next()}`);
        deleteButton.classList.add('delete-button');

        // Создаем SVG для штрих-кода
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        JsBarcode(svg, input, {
            format: "CODE128", // Формат штрих-кода
            displayValue: true, // Показывать текст под штрих-кодом
            fontSize: 16,
            lineColor: "#000",
            width: 2,
            // text: `SRA ${input}`,
            height: 100,
        });
        
        // Добавляем SVG в контейнер
        barcodeItem.appendChild(svg);
        barcodeList.appendChild(barcodeItem);
        barcodeItem.appendChild(deleteButton);
        deleteButton.appendChild(imgDelete);

        // Очищаем поле ввода
        barcodeInput.value = '';

        errorMessage.classList.remove('visible');
        errorMessage.innerHTML = '';

        deleteButton.onclick = function () {
            if (this.parentElement) {
                this.parentElement.style.transition = 'opacity 0.3s ease';
                this.parentElement.style.opacity = '0';
                setTimeout(() => { 
                        this.parentElement.remove();
                        checkContainer(container, barcodeList);
                        if (barcodeList.children.length === 0) {
                            errorMessage.classList.remove('visible');
                            errorMessage.innerHTML = '';
                        };
                    }, 300);
            } else {
                console.error('Родительский элемент не найден');
            }
            
        }
        // Проверяем контейнер после добавления
        checkContainer(container, barcodeList);
    } else if (input === '') {
        //alert("Пожалуйста, введите текст для штрих-кода!");
        errorMessage.classList.add('visible');
        errorMessage.innerHTML = 'Пожалуйста, введите текст для штрих-кода!';
    } else if (input.length >= 30) {
        barcodeInput.value = '';
        //alert("Пожалуйста, введите текст до 30 символов!");
        errorMessage.innerHTML = `Пожалуйста, введите текст до 30 символов! Ваш текст содержит ${input.length} символов.`;
        errorMessage.classList.add('visible');
    } else if (!regex.test(input)){
        barcodeInput.value = '';
        //alert("Текст должен содержать буквы латинского алфавита, цифры, специальные символы!");
        errorMessage.innerHTML = 'Текст должен содержать буквы латинского алфавита, цифры, специальные символы!';
        errorMessage.classList.add('visible');
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
    checkContainer(container, barcodeList); // Проверяем контейнер при загрузке страницы
});