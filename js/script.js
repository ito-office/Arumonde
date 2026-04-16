const btn = document.getElementById('js-hamburger-btn');
const menu = document.getElementById('hamburger-menu');

btn.addEventListener('click', function() {
    // ボタンとメニューの両方に 'is-active' クラスを付け外しする
    btn.classList.toggle('is-active');
    menu.classList.toggle('is-active');

    // オプション：メニュー開閉時に背景をスクロールさせない
    if (btn.classList.contains('is-active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// オプション：メニュー内のリンクをクリックしたら自動で閉じる
const links = document.querySelectorAll('#hamburger-menu a');
links.forEach(link => {
    link.addEventListener('click', () => {
        btn.classList.remove('is-active');
        menu.classList.remove('is-active');
        document.body.style.overflow = 'auto';
    });
});