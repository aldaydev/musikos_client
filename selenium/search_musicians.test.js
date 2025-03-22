import { Builder, By, Key, until } from 'selenium-webdriver';
import assert from 'assert';

(async function testTitle() {
    
    // 1. Crear una nueva instancia de Chrome
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // 2. Navegar a tu web (cambia la URL por la tuya)
        await driver.get('http://localhost:5173/buscar');

        // 3. Esperar hasta que el título de la página esté disponible
        await driver.wait(until.titleIs('MUSIKOS'), 5000);

        // 4. Obtener el título y verificarlo
        let title = await driver.getTitle();
        console.log(`El título de la página es: ${title}`);

        // 5. Localizar el input de búsqueda
        let searchInput = await driver.findElement(By.css('input[name="searchByName"]'));

        // 6. Escribir en el input y presionar ENTER (o esperar que filtre automáticamente)
        await searchInput.sendKeys('Tomas', Key.RETURN);

        // 7. Localizar y pulsar el botón de búsqueda
        let searchButton = await driver.findElement(By.css('.button--pink'));
        await searchButton.click();

        // 8. Localizar el resultado
        let result = await driver.findElement(By.css('.musician__dataContainer #user_name')).getText();
        console.log(`El resultado es: ${result}`);
        assert.strictEqual(result, 'Nombre: Tomas Tomasin', 'El resultado de la búsqueda no es el esperado');

    } finally {
        // 5. Cerrar el navegador
        await driver.quit();
    }
})();