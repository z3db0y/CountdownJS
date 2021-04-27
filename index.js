function count() {
    let res = new Date().getTime()+7200000;
    let int = setInterval(() => {
        let end = res - new Date().getTime();
        let hours = Math.floor(end / (1000 * 60 * 60));
        let minutes = Math.floor((end % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((end % (1000 * 60)) / 1000); 
        console.clear();
        console.log(hours + "h " + minutes + "m " + seconds + "s");
        if(hours == 0 && minutes == 0 && seconds == 0) {
            clearInterval(int);
        }
    }, 1000);
}

count();