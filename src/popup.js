let updateTime = ()=>{
    // set the chrome sync storage time to the 'select-time' value when 'button-update' is clicked
    let time = document.querySelector('#select-time').value;
    chrome.storage.sync.set({time}, ()=>{
        console.log('time is set to ' + time);
        document.querySelector('#button-update').disabled = true;
        document.querySelector('#button-update').innerText = 'Time is set to ' + time + ' seconds';
        setTimeout(()=>{
            document.querySelector('#button-update').disabled = false;
            document.querySelector('#button-update').innerText = 'Save';
        }, 1000);
    });
}
// update the 'seconds' span with the value in chrome storage when the popup is loaded
chrome.storage.sync.get(['time'], function(data) {
    let time = parseInt(data.time,10);
    if(isNaN(time)){
        time = 3;
        chrome.storage.sync.set({time}, ()=>{
            console.log('time is set to ' + time);
        });
    }
    document.querySelector('#seconds').innerText = `${time} seconds`;
    document.querySelector('#select-time').value = `${time}`
});
// add event listener to 'button-update'
document.querySelector('#button-update').addEventListener('click', updateTime);