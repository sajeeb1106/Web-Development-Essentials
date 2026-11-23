console.log("Hello");

var a = 20;
var b = 50;
var c = 30;

if(a>b && a>c)
    {
        console.log("A is greater");
    }
    else if(b>c && b>a)
    {
        console.log("B is greater");
    }
    else
    {
        console.log("C is greater");
    }

    for( let i=0; i<5; i++)
    {
        console.log(i);
    }

    function greet()
    {
        console.log("Welcome to JavaScript");
    }
    greet()

    var i = 11;

    while(i<=15)
    {
       console.log(i + " Hello");
       i++;
    }

    function add(x, y)
    {
        var z = x + y;
        return z;
    }
    var sum = add(10, 20);
    console.log(sum);