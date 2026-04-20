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
    const offset = 770; 

    // 3. 判定（Heroの底まであと400pxの地点を過ぎたら表示）
    if (window.pageYOffset > (heroBottom - offset)) {
        downloadBar.classList.add('is-show');
    } else {
        downloadBar.classList.remove('is-show');
    }
});

// 各セクション（カードなど）をふわっと出す
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, { threshold: 0.1 });

// 対象にしたい要素（カードなど）をすべて指定
document.querySelectorAll('.despair-card, .solution-item, .experience-gallery').forEach(el => {
    el.style.opacity = "0"; // 初期状態は透明
    el.style.transform = "translateY(30px)"; // 少し下に下げておく
    el.style.transition = "all 0.8s ease-out";
    observer.observe(el);
});

// CSS側に追加
// .fade-in { opacity: 1 !important; transform: translateY(0) !important; }

window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    if (window.scrollY > 50) {
        header.classList.add('is-scrolled');
        // JSで直接スタイルを触らず、CSSの .is-scrolled に任せる
    } else {
        header.classList.remove('is-scrolled');
    }
});


// キャラクターとセクションの紐付け設定
window.addEventListener('DOMContentLoaded', () => {
    const characterSettings = {
    'hero': { 
        img: 'images/mini_hero.png', 
        text: '献立丸投げしちゃお！',
        isLarge: false // 通常サイズ
    },
    'despair': { 
        img: 'images/mini_sec01.png', 
        text: 'もう限界',
        isLarge: false 
    },
    'solutions': { 
        img: 'images/mini_sec02_1.png', 
        text: 'これなら作れそう！',
        isLarge: true  // ★大きくしたい！
    },
    'experience': { 
        img: 'images/mini_sec03_1.png', 
        text: '20分のゆとり、嬉しい！',
        isLarge: true  // ★大きくしたい！
    },
    'Letter': { 
        img: 'images/mini_sec04_1.png', 
        text: 'アルモンデありがとう！',
        isLarge: true  // ★大きくしたい！
    },
    'footer': { 
        img: 'images/mini_hero.png', 
        text: '献立丸投げしちゃお！',
        isLarge: false 
    }
};

    const misakiImg = document.getElementById('js-misaki-img');
    const bubble = document.getElementById('js-character-bubble');
    const bubbleText = document.getElementById('js-character-text');
    const scrollWrapper = document.querySelector('.mobile-frame-wrapper');

    // 監視の設定：判定エリアを「画面の真ん中10%」まで絞り込みます
    const observerOptions = {
        root: window.innerWidth >= 1024 ? scrollWrapper : null,
        rootMargin: '-45% 0px -45% 0px', // 上下45%を無視＝中央10%に入った時だけ反応
        threshold: 0
    };

    let currentId = ""; // 現在表示中のIDを保存する変数

    const characterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // セクションが中央エリアに入ってきた時
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                
                // 同じセクションで何度も発火しないようにガード
                if (sectionId === currentId) return;
                currentId = sectionId;

                const setting = characterSettings[sectionId];
                if (setting && misakiImg) {
                    // 切り替え演出
                    misakiImg.style.opacity = 0;
                    bubble.classList.remove('is-show');
                    
                    setTimeout(() => {
                        misakiImg.src = setting.img;
                        bubbleText.textContent = setting.text;

                        // ★ここを追加！isLargeがtrueなら 'is-large' クラスを付与する
                        if (setting.isLarge) {
                            misakiImg.classList.add('is-large');
                        } else {
                            misakiImg.classList.remove('is-large');
                        }
                        
                        misakiImg.style.opacity = 1;
                        bubble.classList.add('is-show');
                    }, 300);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('section[id],footer[id]').forEach(section => {
        characterObserver.observe(section);
    });
});