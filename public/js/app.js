console.log('this is client side javascript');

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    //console.log(1);
    var address = document.querySelector('input').value;

    document.querySelector('.flocation').innerHTML = 'Loading..';
    document.querySelector('.forecast').innerHTML = '';

    fetch('/weather?location='+address).then((respose) => {
        respose.json().then((data) => {
            //console.log(data);
            if(data.Error){
                document.querySelector('.flocation').innerHTML = data.Error;
            }else{
                document.querySelector('.flocation').innerHTML = data.location;
                document.querySelector('.forecast').innerHTML = data.forecast;
            }            
        });
    });
});

