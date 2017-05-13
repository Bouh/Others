var n1 = 73;

function reverse_a_number(n)
{
	n = n + "";
	return n.split("").reverse().join("");
}


function calcul(n,b)
{
      z = (Number(n)+Number(b));
      return z;
}


var sd = n1;
var n2 = reverse_a_number(n1);
  console.log(n1 + " et " + n2);

for (var i = 0; i < 500; i++) {
//while(true){
   i++;

	var n2 = reverse_a_number(n1);

	if(n1 == n2){
	  
	 alert(n1 + "  EST le nombre de " + Number(sd));
      break;
	}else{
	   n3 = calcul(n1,n2);
      console.log(n1 + " + " + n2 + " = " + n3);
	   n2 = reverse_a_number(n3);
       console.log(n3 +" - "+n2);
	  n1 = n3;

      
	}

}
