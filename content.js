//監視対象の要素を取得
const taegetElement = document.querySelector('#監視する要素のID');

//音声を再生
const playNotificationSound = ( () => {
    const audio = new Audio(chrome.runtime.getURL("notification.mp3"));
    audio.play();
});

//Observerでココフォリア内の要素の監視
const observerCallback = (mutationsList, observer) => {
    for (const mutation of mutationsList) {
        if (mutation.type === "childList" || mutation.type === "attributes") {
            playNotificationSound();
        }
    }
}

//MutationObserverの設定
const observer = new MutationObserver(observerCallback);

//監視のトリガー
if (targetElement) {
    observer.observe(taegetElement, {
        attributes: true, //属性の変化を監視
        childList: true, //小要素の変化を監視
        subtree: true //子孫要素の変化も監視
    });
} else {
    console.error("指定した要素が見つかりません");
}
