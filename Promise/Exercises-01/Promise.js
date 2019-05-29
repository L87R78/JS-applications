const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        let isFinished = true;
        console.log('I am ready');
        resolve(isFinished);
    }, 2000)
})

myPromise
        .then((isFinished) => {
            if(isFinished){
                console.log('yes')
            }else{
                console.log('no')
            }
            
        })