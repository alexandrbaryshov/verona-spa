# Verona
Локальный сайт, без публикации. Запуск: npm install, npm run dev. Проверка: npm run check.
Каталог: src/catalog.js; статический HTML обновляется командой node build-html.mjs после изменения данных.
Прайс — рабочий снимок PRODUCT.md от 07.11.2026. Полный каталог массажа, цена за двоих, контакты и права на материалы требуют проверки перед публикацией. Онлайн-запись ведёт в DIKIDI; карточка не создаёт бронь.

GitHub Pages: push в main запускает .github/workflows/pages.yml. В Settings → Pages выбрать Source: GitHub Actions. Node.js 22, npm ci, npm run check. Локальные архивы проверок и скриншоты: materials/.
