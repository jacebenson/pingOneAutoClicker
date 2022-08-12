try { // read time from chrome storage, then click the button after the time
    chrome.storage.sync.get(['time'], function(data) {
        var time = parseInt(data.time,10) || 5;// default time is 5 seconds
        setTimeout(()=> {
            let button = document.querySelector('.buttons>input');
            button.click();
        }, time * 1000);
    });
} catch (e) {
    console.log(e);
}