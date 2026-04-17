// hamburgerメニュー　
// **
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


// 下部 固定ダウンロードバーの制御
// **
window.addEventListener('scroll', function() {
    const heroSection = document.getElementById('hero');
    const downloadBar = document.querySelector('.download-container.is-fixed');

    // 1. Heroセクションの底辺が「ページの一番上から何px目にあるか」を取得
    const heroBottom = heroSection.getBoundingClientRect().bottom + window.pageYOffset;

    // 2. タイミングを調整する数字（オフセット）
    // この数字を大きくするほど、早いタイミング（上の方）でバーが出てきます
    const offset = 550; 

    // 3. 判定（Heroの底まであと400pxの地点を過ぎたら表示）
    if (window.pageYOffset > (heroBottom - offset)) {
        downloadBar.classList.add('is-show');
    } else {
        downloadBar.classList.remove('is-show');
    }
});